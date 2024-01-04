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
    const ntFormat = (label: string) => {
      // 默认去NT里时间
      let row: any = props?.options;
      if (!row || !Object.keys(row).length) return 0;
      let time = row.NT[label] || 0;
      const FP = row.FP || {}; // 白屏时间
      const FCP = row.FCP || {}; //灰屏时间
      const LCP = row.LCP || {}; 
      const NT = row.NT || {}; 
      if (label == "FCP" && FCP.startTime) {
        time = FCP.startTime - NT.appLaunchStartTime;
      }
      if (label == "FP" && Object.keys(FP).length) {
        time = FP.startTime - NT.appLaunchStartTime;
      }
      if (label == "LCP" && LCP.startTime) {
        time = LCP.startTime - NT.appLaunchStartTime;
      }
      return Number((time || 0).toFixed(2));
    };

    /**
     *  appLaunch: 0, // 小程序启动耗时。
	 *	appLaunchStartTime: '',
	 *	route: 0, // 路由耗时
 	 *	routeStartTime: '',
	 *	firstRender: 0, // 页面首次渲染耗时
	 *	firstRenderStartTime: '',
	 *	script: 0, // 逻辑层 JS 代码注入耗时
	 *	scriptStartTime: '',
	 *	loadPackage: 0, // 代码包下载耗时。(entryType: loadPackage)
	 *	loadPackageStartTime: '',
     * @description: 性能指标图
     * @param {*} computed
     * @return {*}
     */
    const navigationEchart = computed(() => {
      const NT: any = props.options?.NT || {};
      if (!NT || !Object.keys(NT).length) return {};
      const axisData = [
        "firstRender",
        "script",
        "route",
        "appLaunch",
        "loadPackage",
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
        script = 0,
        route = 0,
        loadPackage = 0,
        appLaunch = 0
      }: any = NT;
      // TODO 待优化
      const defaultSeriesData: any[] = [
        // `${appLaunch + loadPackage + route + script + firstRender}`,
        `${appLaunch + loadPackage + route + script}`,
        `${appLaunch + loadPackage + route}`,
        `${appLaunch + loadPackage}`,
        `${loadPackage}`,
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
      ntFormat,
      navigationEchart,
    };
  },
};
</script>
