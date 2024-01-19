<template>
  <div class="flex flex-row justify-between" style="width: 100%">
    <!-- <el-statistic title="白屏时间" :value="ntFormat('FP')">
      <template #suffix>ms</template>
    </el-statistic>
    <el-statistic title="DOM Ready" :value="ntFormat('FCP')">
      <template #suffix>ms</template>
    </el-statistic>
    <el-statistic title="首次可交互时间" :value="ntFormat('LCP')">
      <template #suffix>ms</template>
    </el-statistic> -->
  </div>
  <Echarts :options="navigationEchart"></Echarts>
</template>

<script lang="ts">
import Echarts from "@/components/echarts/index.vue";
import { computed } from "vue";
export default {
  components: {
    Echarts,
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  name: "wxPerfEchart",
  setup(props) {
    /**
     * @description: 性能指标图
     * @param {*} computed
     * @return {*}
     */
    const navigationEchart = computed(() => {
      console.log(props)
      const NT: any = props.options?.nt || {};
      console.log(NT)
      if (!NT || !Object.keys(NT).length) return {};
      const axisData = [
        "firstRenderduration",
        "scriptduration",
        "routeduration",
        "appLaunchduration",
        "loadPackageduration",
      ];

      const seriesData: any[] = [];
      const yAxisLeftData: any[] = [
        "页面渲染",
        "JS注入",
        "路由",
        "小程序启动",
        "代码包下载",
      ];
      const yAxisRightData: any[] = [];
      axisData.forEach((item, index) => {
        const value = (NT[item] || 0).toFixed(2);
        yAxisRightData.push(`${value}ms`);
        const data: any = {
          name: item,
          type: "bar",
          stack: "Total",
          label: {
            show: true,
            position: "right",
          },
          data: [],
        };
        // 重置 性能节点数据
        for (let i = 0, len = axisData.length; i < len; i++) {
          if (index == i) {
            data.data.push(value);
          } else {
            data.data.push("-");
          }
        }
        seriesData.push(data);
      });
      const {
        // firstRender = 0,
        scriptduration = 0,
        routeduration = 0,
        loadPackageduration = 0,
        appLaunchduration = 0
      }: any = NT;
      // TODO 待优化
      const defaultSeriesData: any[] = [
        // `${appLaunch + loadPackage + route + script + firstRender}`,
        `${appLaunchduration + loadPackageduration + routeduration + scriptduration}`,
        `${appLaunchduration + loadPackageduration + routeduration}`,
        `${appLaunchduration + loadPackageduration}`,
        `${loadPackageduration}`,
      ];

      const option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          formatter: function (params: any) {
            for (let i = 1, len = params.length; i < len; i++) {
              let { name, value, seriesName, color } = params[i];
              if (value !== "-") {
                return `${name}</br><span style="display:flex; align-items: center;">
					<i style="display:block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:${color}"></i>${seriesName}:
					<i style="padding-left: 30px;">${value}</i>
				</span>`;
              }
            }
          },
        },
        xAxis: {
          type: "value",
          show: false,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: "dotted",
            },
          },
        },
        yAxis: [
          {
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: "dotted",
              },
            },
            type: "category",
            data: yAxisLeftData,
          },
          {
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              lineStyle: {
                type: "dotted",
              },
            },
            type: "category",
            data: yAxisRightData,
          },
        ],
        seriesColorReset: false,
        series: [
          {
            name: "Placeholder",
            type: "bar",
            stack: "Total",
            silent: true,
            itemStyle: {
              borderColor: "transparent",
              color: "transparent",
            },
            emphasis: {
              itemStyle: {
                borderColor: "transparent",
                color: "transparent",
              },
            },
            data: defaultSeriesData,
          },
          ...seriesData,
        ],
      };
      // console.log("option---", option);
      return option;
    });

    return {
      navigationEchart,
    };
  },
};
</script>
