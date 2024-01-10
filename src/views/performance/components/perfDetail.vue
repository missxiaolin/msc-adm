<template>
  <el-drawer
    v-model="drawerVisible"
    ref="drawerRef"
    title="性能指标查看"
    direction="rtl"
    size="95%"
    :z-index="9999"
    :append-to-body="true"
  >
    <section class="detail-wapper flex-1">
      <div class="detail-top-content">
        <dl class="flex basic-info">
          <dd v-if="perfNode?.uuId">
            <el-icon :size="15"> <Edit /> </el-icon>{{ perfNode?.uuId }}
          </dd>
          <dd>
            <el-icon :size="15"> <Clock /> </el-icon>{{ perfNode?.happenTime }}
          </dd>
        </dl>
        <div class="other-basic">{{ perfNode?.simpleUrl }}</div>
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
                CLS：{{ perfNode['cumulative-layout-shift'] && perfNode['cumulative-layout-shift'].numValue || 0 }} ms
              </dd>
              <dd>
                FCP：{{ perfNode['first-contentful-paint'] && perfNode['first-contentful-paint'].numValue || 0 }} ms
              </dd>
              <dd>
                FID：{{ perfNode['first-input-delay'] && perfNode['first-input-delay'].textValue.delay || 0 }} ms
              </dd>
              <!-- <dd>
                FMP： ms
              </dd> -->
              <dd>
                FP：{{ perfNode['first-paint'] && perfNode['first-paint'].numValue || 0 }} ms
              </dd>
              <dd>
                LCP：{{ perfNode['largest-contentful-paint'] && perfNode['largest-contentful-paint'].numValue || 0 }} ms
              </dd>
              <!-- <dd>
                MPFID：ms
              </dd> -->
              <!-- <dd>
                TTI：ms
              </dd> -->
            </dl>
            <h2 class="title">页面加载瀑布图</h2>
            <div>
              <PerfEchart v-if="project.projectType == 1" :options="perfEchartOPtion"></PerfEchart>
              <!-- <WxPerfEchart v-if="project.projectType == 2" :options="perfEchartOPtion"></WxPerfEchart> -->
            </div>
            <h2 class="title">会话性能指标</h2>
            <div>
							<!-- <template v-if="perfNode?.fp && project.projectType == 1">
								<h3 class="title">FP 白屏资源</h3>
								<PerfResTable :data="perfNode?.fp?.RF"></PerfResTable>
							</template>
							<template v-if="perfNode?.fcp && project.projectType == 1">
								<h3 class="title">FCP 灰屏资源</h3>
								<PerfResTable :data="perfNode?.fcp?.RF"></PerfResTable>
							</template> -->
							<h3 class="title">RF 资源</h3>
							<PerfResTable v-if="project.projectType == 1" :data="perfNode['resource-flow']"></PerfResTable>
              <WxPerfResTable  v-if="project.projectType == 2" :data="perfNode?.rf"></WxPerfResTable>
						</div>
          </div>
        </el-scroll>
      </div>
    </section>
  </el-drawer>
</template>

<script lang="ts">
import PerfEchart from "@/components/performanceComponents/perfEchart.vue";
// import WxPerfEchart from "@/components/performanceComponents/wxPerfEchart.vue";
import PerfResTable from "./perfResTable.vue";
import WxPerfResTable from './wxPerfResTable.vue'
import { computed, ref } from "vue";
export default {
  components: {
    PerfEchart,
    // WxPerfEchart,
    WxPerfResTable,
    PerfResTable
  },
  props: {
    perfNode: {
      type: Object,
      required: true,
    },
    project: {
      type: Object,
      required: true,
    }
  },
  name: "perfDetail",
  setup(props) {
    const { perfNode } = props
    const drawerVisible = ref(true);

    const perfEchartOPtion = computed(() => {
      const navigation = perfNode['navigation-timing'] || {};
      return {
        nt: navigation.textValue,
        fp:  perfNode['first-paint'] || {}
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
        color: var(--el-text-color-primary);
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
        color: var(--el-text-color-primary);
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
          color: var(--el-text-color-primary);
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
