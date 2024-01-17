<template>
  <el-drawer
    v-model="drawerVisible"
    ref="drawerRef"
    title="详情"
    direction="rtl"
    size="80%"
    :append-to-body="true"
    :z-index="2000"
  >
    <div class="js-error-detail-content flex flex-1">
      <el-scroll
        ref="scrollbarRef"
        trigger="hover"
        class="flex-1"
        direction="all"
      >
        <div class="flex-1 left-content">
          <h2 class="title flex">
            基本信息 (项目ID: {{ perfNode.monitorAppId }})
          </h2>
        </div>
        <div class="line1 flex">
          <p class="flex flex-1 align-items-center" data-user="上报人">
            <el-icon :size="20"><UserFilled /></el-icon>
            {{ perfNode.uuId }}
          </p>
          <p class="flex flex-1 align-items-center" data-user="浏览器">
            <el-icon size="20"><ChromeFilled /></el-icon>
            {{ perfNode.browserInfo }}
          </p>
          <p class="flex flex-1 align-items-center" data-user="系统">
            <el-icon size="20"><Iphone /></el-icon>
            {{ perfNode.os }}
          </p>
        </div>
        <div>
          <dl class="line2">
            <dd class="flex flex-wrap">
              <p>
                <label>ip:</label><label>{{ perfNode.ip || "" }}</label>
              </p>
              <p>
                <label>区域:</label><label>{{ perfNode.country || "" }}</label>
              </p>
              <p>
                <label>设备:</label><label>{{ perfNode.device || "" }}</label>
              </p>
              <p>
                <label>设备尺寸:</label
                ><label>{{ perfNode.deviceType || "" }}</label>
              </p>
              <p>
                <label>浏览器:</label><label>{{ perfNode.device || "" }}</label>
              </p>
              <p>
                <label>地址页面:</label
                ><label class="single-ellipsis">{{ perfNode.pageUrl }}</label>
              </p>
            </dd>
          </dl>
          <h2 class="title">UserAgent</h2>
          <dl class="line3">
            <dd>{{ perfNode.userAgent }}</dd>
          </dl>
          <template v-if="perfNode.category === 'RESOURCE_ERROR'">
            <h2 class="title">错误信息 ({{ perfNode.happenTime }})</h2>
            <dl class="line4">
              <dt>{{ perfNode.category }}： {{ perfNode.errorMsg }}</dt>
              <dd>{{ perfNode.html || "" }}</dd>
              <dd v-if="perfNode.paths && perfNode.paths.length">
                DOM Paths：{{ JSON.stringify(perfNode.paths) }}
              </dd>
            </dl>
          </template>
          <template v-if="perfNode.category === 'JS_ERROR'">
            <h2 class="title">
              {{ perfNode.subType == "vueError" ? "Vue" : "Js" }}错误堆栈 ({{
                perfNode.happenTime
              }})
            </h2>
            <dl class="line4">
              <dt>{{ perfNode.type }}： {{ perfNode.errorMsg }}</dt>
              <dd v-for="(item, index) in stackTraces" :key="index">
                <div>
                  <span
                    >at functionName: {{ item.filename }}（<cite
                      >:<b>{{ item.lineno || item.line }}</b
                      >:<b>{{ item.colno || item.col }}</b></cite
                    >）</span
                  >
                  <span v-if="item.versions" class="ml5">
                    <el-select
                      v-model="stackTraces[index].version"
                      placeholder="请选选择版本库"
                      size="small"
                      style="width: 130px"
                    >
                      <el-option
                        v-for="(v, i) in item.versions"
                        :key="i"
                        :label="v.version"
                        :value="v.version"
                      />
                    </el-select>
                  </span>
                  <span v-if="item.versions" class="ml5">
                    <el-button
                      size="small"
                      type="primary"
                      @click="mapAnalysis(item, index)"
                      >解析</el-button
                    >
                  </span>
                </div>
                <div codetype="JavaScript" class="mt20" v-if="item.code">
                  <p>{{item.code.originalPosition.source}}: (line：{{item.code.originalPosition.line}} column：{{item.code.originalPosition.column}})</p>
                  <highlight :htmlCode="item.code.sourcesContent" :error-line="item.code.originalPosition.line" />
                  <!-- <highlightjs
                    language="JavaScript"
                    :autodetect="false"
                    :code="item.code.sourcesContent"
                  ></highlightjs> -->
                </div>
              </dd>
            </dl>
            <div
              class="vue-replenish-info"
              v-if="perfNode?.subType == 'vueError'"
            >
              <h3>其他补充信息：</h3>
              <p>
                hook: <b>{{ perfNode?.hook }}</b>
              </p>
              <p>
                componentName: <b>{{ perfNode?.componentName }}</b>
              </p>
              <p>
                componentNameTrace: <b>{{ perfNode?.componentNameTrace }}</b>
              </p>
            </div>
          </template>
        </div>
      </el-scroll>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { ref, toRef, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { sourcemapVersionList, sourcemapAnalysis } from "@/api/map/index";
import highlight from '@/components/highlight/index.vue'

export default {
  components: {
    highlight
  },
  props: {
    perfNode: {
      type: Object,
      required: true,
    },
  },
  name: "",
  setup(props) {
    const { perfNode } = props;
    const drawerVisible = ref(true);
    let stackTraces = toRef(
      perfNode.stackTraces ? JSON.parse(perfNode.stackTraces) : []
    );
    const resetFile = (filename: string) => {
      if (!filename) return "";
      const reg = /\http(.+?)\.js/g;
      let result: any = filename.match(reg);
      return result && result.length ? result[0] : "";
    };

    const mapAnalysis = async (item: any, index: number) => {
      if (!item.version) {
        ElMessage({
          message: "请先选择版本",
          type: "warning",
        });
        return false;
      }
      const param = {
        filename: item.filename + ".map",
        version: item.version,
        line: item.lineno,
        column: item.colno,
      };
      let res = await sourcemapAnalysis(param);
      if (!res.success) {
        ElMessage({
          message: res.errorMessage,
          type: "error",
        });
        return;
      }
      console.log(res.model)
      stackTraces.value[index].code = res.model;
    };

    const getSourcemapVersionList = async (filename: string) => {
      let param = {
        filename,
      };
      let res = await sourcemapVersionList(param);
      if (res.success) {
        return res.model;
      } else {
        return [];
      }
    };

    const initVersions = async () => {
      // js 独有的
      if (perfNode.category == "JS_ERROR" && stackTraces.value.length > 0) {
        for (let i = 0; i < stackTraces.value.length; i++) {
          let url = stackTraces.value[i].url;
          stackTraces.value[i].version = "";
          const filename = url
            .substring(url.lastIndexOf("/") + 1)
            .split("?")[0];
          stackTraces.value[i].filename = filename;
          try {
            stackTraces.value[i].versions = await getSourcemapVersionList(
              filename + ".map"
            );
          } catch (e) {
            stackTraces.value[i].versions = [];
          }
        }
      }
    };

    onMounted(() => {
      initVersions();
    });

    return {
      drawerVisible,
      resetFile,
      stackTraces,
      mapAnalysis,
    };
  },
};
</script>

<style lang="scss" scoped>
.js-error-wapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.issue-type {
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
}
.status-desc {
  border-radius: 4px;
  display: inline-block;
  padding: 2px 5px;
  font-size: 12px;
  line-height: 14px;
}

.js-error-detail-header {
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 5px solid #ccc;
  dl {
    font-weight: 600;

    dt {
      b {
        font-size: 16px;
      }
    }
    dd {
      padding: 10px 0;
      &.timer {
        font-size: 14px;
      }
    }
  }
}
.swicth-btn {
  .el-button {
    margin-left: 0;
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  p {
    padding: 0 10px;
  }
}

.js-error-detail-content {
  height: 0;
  width: 100%;
  padding: 5px 0 20px;
  h2.title,
  h3.title {
    font-size: 15px;
    font-weight: 500;
    align-items: center;
    padding: 15px 0;
    color: var(--el-text-color-regular);
    &::before {
      content: "";
      display: inline-block;
      width: 0;
      height: 10px;
      margin-right: 5px;
    }
  }
  .line1 {
    padding-top: 10px;
    color: var(--el-text-color-regular);
    p {
      color: var(--el-text-color-regular);
      i,
      svg {
        margin-right: 10px;
      }
    }
  }
  dl {
    // padding-top: 30px;
    dt {
      font-weight: bold;
      font-size: 15px;
    }
    dd {
      padding: 10px 0;
    }

    &.line2 {
      dd {
        p {
          margin-right: 10px;
          margin-bottom: 10px;
          display: flex;
          background: var(--el-bg-color-overlay);
          border: 1px solid #ebebeb;
          line-height: 24px;
          label {
            color: var(--el-text-color-regular);
          }
          label:first-child {
            padding: 0 10px;
            display: inline-block;
            background-color: var(--el-bg-color-overlay);
            border-right: 1px solid #ebebeb;
          }
          label:last-child {
            padding: 0 10px;
          }
        }
      }
    }

    &.line4 {
      color: red;
      text-align: left;
      dd {
        padding: 5px;
        cite {
          color: #ccc;
        }
      }
    }
  }
  .line3 {
    color: var(--el-text-color-regular);
    text-align: left;
  }
  h3.title {
    font-size: 14px;
    text-align: left;

    &::before {
    }
  }
  .title {
    text-align: left;
  }
  .left-content {
    .vue-replenish-info {
      h3 {
        font-size: 15px;
        line-height: 34px;
      }
      p {
        padding: 5px;
        b {
          color: red;
        }
      }
    }

    .http-status {
      padding-right: 10px;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
