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
  <Echarts
    :options="chartData(chartKey, chart.topEchartModel)"
    :size="chart.echartHeight"
  ></Echarts>
</template>

<script lang="ts">
import { computed, watch } from "vue";
import Echarts from "@/components/echarts/index.vue";
import { cloneDeep } from "lodash";

const defaultEchart = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
    confine: true,
    formatter: (params: any) => {
      let { name, value, seriesName, color } = params[0];
      let nameStr = name;
      if (name.includes(".com")) {
        name = name.split(".com")[1];
        name = name.split("?");
        nameStr = `${name[0]}</br>${
          name[1] ? name[1].slice(0, 20) + "..." : ""
        }`;
      }
      return `${nameStr}</br><span style="display:flex; align-items: center;">
				<i style="display:block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:${color}"></i>${seriesName}:
				 <i style="padding-left: 30px;">${value}</i>
			</span>`;
    },
  },
  xAxis: {
    // max: "dataMax",
    type: "value",
    splitNumber: 5,
    position: "top",
  },
  yAxis: {
    type: "category",
    data: [],
    axisLabel: {
      color: "#95979e",
      interval: 0,
      formatter: (value: string | any[]) => {
        return `${value.slice(0, 20)}${value.length > 20 ? "..." : ""}`;
      },
    },
  },
  series: [
    {
      name: "数量",
      type: "bar",
      label: {
        show: true,
        position: "right",
        valueAnimation: true,
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
  ],
};
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
    chartKey: {
      type: String,
      default: "",
    },
  },
  components: {
    Echarts,
  },
  setup(props) {
    const { chart } = props;
    const chartData = computed(() => {
      return (topType: string | number, EchartModel = chart.topEchartModel) => {
        const topEchart = cloneDeep(defaultEchart);
        const node = EchartModel[topType];
        const axisData = node?.axisData || []; //.reverse();
        const seriesData = node?.seriesData || []; //.reverse();
        const end = seriesData.length;
        const start = end - chart.showNum;
        topEchart.yAxis.data = axisData.slice(start, end);
        topEchart.series[0].data = seriesData.slice(start, end);
        return topEchart;
      };
    });

    watch(chart, () => {});
    return {
      chartData,
    };
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
