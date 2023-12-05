<template>
  <el-drawer
    v-model="drawerVisible"
    ref="drawerRef"
    title="性能指标查看"
    direction="rtl"
    size="80%"
    :z-index="999"
  >
    <section class="detail-wapper flex-1">
      <div class="detail-top-content">
        <dl class="flex basic-info">
          <dd>
            <el-icon :size="15"> <Edit /> </el-icon>{{ perfNode?.uuId }}
          </dd>
          <dd>
            <el-icon :size="15"> <Clock /> </el-icon>{{ perfNode?.happenTime }}
          </dd>
          <dd>
            <el-icon><Location /></el-icon>{{ perfNode?.country }}
          </dd>
          <dd>
            <el-icon><Document /></el-icon>{{ perfNode?.browserInfo }}
          </dd>
          <dd>
            <el-icon><Postcard /></el-icon>{{ perfNode?.os }}
          </dd>
          <dd>
            <el-icon><FolderRemove /></el-icon>{{ perfNode?.device }}
          </dd>
        </dl>
        <div class="other-basic">{{ perfNode?.pageUrl }}</div>
      </div>
      <div class="detail-bottom-content flex flex-1">
        <el-scroll
          ref="scrollbarRef"
          trigger="hover"
          class="flex-1"
          direction="all"
        >
          <div class="navigation-content">
            <h2 class="title">会话性能指标</h2>
            <dl class="flex navigation-target">
              <dd>
                CLS<el-tooltip content=" --" placement="top">
                  <p></p>
                </el-tooltip>
              </dd>
              <dd>
                FCP<el-tooltip content=" --" placement="top">
                  <p></p>
                </el-tooltip>
              </dd>
              <dd>
                FID<el-tooltip content=" --" placement="top">
                  <p></p>
                </el-tooltip>
              </dd>
              <dd>
                FMP<el-tooltip content=" --" placement="top">
                  <p></p>
                </el-tooltip>
              </dd>
              <dd>
                FP<el-tooltip content=" --" placement="top">
                  <p></p>
                </el-tooltip>
              </dd>
              <dd>
                LCP<el-tooltip content=" --" placement="top">
                  <p></p>
                </el-tooltip>
              </dd>
              <dd>
                MPFID<el-tooltip content=" --" placement="top">
                  <p></p>
                </el-tooltip>
              </dd>
              <dd>
                TTI<el-tooltip content=" --" placement="top">
                  <p></p>
                </el-tooltip>
              </dd>
            </dl>
            <h2 class="title">页面加载瀑布图</h2>
            <div>
              <PerfEchart :options="perfEchartOPtion"></PerfEchart>
            </div>
            <h2 class="title">会话性能指标</h2>
            <div>
							<template v-if="perfNode?.fp">
								<h3 class="title">FP 白屏资源</h3>
								<PerfResTable :data="perfNode?.fp?.RF"></PerfResTable>
							</template>
							<template v-if="perfNode?.fcp">
								<h3 class="title">FCP 灰屏资源</h3>
								<PerfResTable :data="perfNode?.fcp?.RF"></PerfResTable>
							</template>
							<h3 class="title">RF 资源</h3>
							<PerfResTable :data="perfNode?.rf"></PerfResTable>
						</div>
          </div>
        </el-scroll>
      </div>
    </section>
  </el-drawer>
</template>

<script lang="ts">
import PerfEchart from "./perfEchart.vue";
import PerfResTable from "./perfResTable.vue";
import { computed, ref } from "vue";
export default {
  components: {
    PerfEchart,
    PerfResTable
  },
  props: {
    perfNode: {
      type: Object,
      required: true,
    },
  },
  name: "perfDetail",
  setup(props) {
    const { perfNode } = props
    const drawerVisible = ref(true);

    const perfEchartOPtion = computed(() => {
      const NT = perfNode?.nt || {};
      const FP = perfNode?.fp || {};
      const FCP = perfNode?.fcp || {};
      return {
        NT,
        FP,
        FCP,
      };
    });

    return {
      drawerVisible,
      perfEchartOPtion
    };
  },
};
</script>

<style lang="scss" scoped>
.detail-wapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .detail-top-content {
    width: 100%;
    .basic-info {
      dd {
        padding: 0 15px 10px 0;
        .el-icon {
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }
    .other-basic {
      line-height: 30px;
      text-align: left;
      border-bottom: solid 1px #ccc;
    }
  }
  .detail-bottom-content {
    height: 0;
    width: 100%;

    .navigation-content {
      text-align: left;
      h2.title,
      h3.title {
        font-size: 15px;
        font-weight: 500;
        align-items: center;
        padding: 15px 0;
        &::before {
          content: "";
          display: inline-block;
          width: 0;
          height: 10px;
          margin-right: 5px;
        }
      }
      h3.title {
        font-size: 14px;
      }
      .navigation-target {
        dd {
          display: flex;
          padding: 8px;
          p {
            margin-left: 4px;
            padding: 5px 10px;
            border-radius: 4px;
            background-color: #d4f3f3;
          }
        }
      }
    }
  }
}
</style>
