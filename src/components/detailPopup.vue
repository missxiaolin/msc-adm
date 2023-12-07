<template>
  <el-drawer
    v-model="drawerVisible"
    ref="drawerRef"
    title="详情"
    direction="rtl"
    size="80%"
    :append-to-body="true"
    :z-index="9999"
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
                <label>设备尺寸:</label><label>{{ perfNode.deviceType || "" }}</label>
              </p>
              <p>
                <label>浏览器:</label><label>{{ perfNode.device || "" }}</label>
              </p>
              <p>
                <label>地址页面:</label><label class="single-ellipsis">{{ perfNode.pageUrl }}</label>
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
              <dd v-if="perfNode.paths && perfNode.paths.length">DOM Paths：{{ JSON.stringify(perfNode.paths) }}</dd>
            </dl>
          </template>
        </div>
      </el-scroll>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  props: {
    perfNode: {
      type: Object,
      required: true,
    },
  },
  name: "",
  setup() {
    const drawerVisible = ref(true);

    return {
      drawerVisible,
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
    color: #000;
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
    color: #000;
    p {
      color: #000;
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
          background: #fafafa;
          border: 1px solid #ebebeb;
          line-height: 24px;
          label {
            color: #000;
          }
          label:first-child {
            padding: 0 10px;
            display: inline-block;
            background-color: #fff;
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
    color: #000;
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
