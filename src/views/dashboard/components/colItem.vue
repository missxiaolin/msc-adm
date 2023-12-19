<template>
  <dl>
    <dt>
      {{ title }} {{ chart.showNum }}
      <el-tooltip effect="dark" :content="tip" placement="right">
        <el-icon size="20"><WarningFilled /></el-icon>
      </el-tooltip>
    </dt>
    <dd>{{ optionData.analyseTime }}</dd>
  </dl>
  <!-- <Echarts
    :options="chartData('simpleUrl', chart.simpleUrlEchartModel)"
    :size="chart.echartHeight"
  ></Echarts> -->
</template>

<script lang="ts">
import Echarts from "@/components/echarts/index.vue";
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    tip: {
      type: String,
      default: "",
    },
    chart: {
      type: Object,
      default: {},
    },
    optionData: {
      type: Object,
      default: {},
    },
  },
  components: {
    Echarts,
  },
};
</script>

<style lang="scss" scoped>
dl {
  padding: 10px 10px 0 10px;
  text-align: left;
  dt {
    font-size: 15px;
    font-weight: 700;
    :deep(.el-icon) {
      margin-left: 5px;
    }
  }
  dd {
    color: #b3b5bb;
  }
}
</style>
