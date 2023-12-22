<template>
  <div class="flex flex-row justify-between" style="width: 100%">
    <el-statistic title="白屏时间" :value="ntFormat('FP')"></el-statistic>
    <el-statistic title="首字节" :value="ntFormat('FirseByte')"></el-statistic>
    <el-statistic
      title="DOM Ready"
      :value="ntFormat('DomReady')"
    ></el-statistic>
    <el-statistic
      title="首次可交互时间"
      :value="ntFormat('TTI')"
    ></el-statistic>
    <el-statistic title="页面完全加载" :value="ntFormat('Load')"></el-statistic>
  </div>
  <Echarts :options="navigationEchart"></Echarts>
</template>

<script lang="ts">
import Echarts from "@/components/echarts/index.vue"
import { computed } from 'vue';
export default {
  components: {
    Echarts
  },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  name: "perfEchart",
  setup(props) {
    const ntFormat = (label: string) => {
      // 默认去NT里时间
      let row: any = props?.options;
      if (!row || !Object.keys(row).length) return 0;
      let time = row.NT[label] || 0;
      if (!time && time === 0) return 0;
      const FP = row.FP || {}; // 白屏时间
      const FPC = row.FCP || {}; //灰屏时间
      if (label == "FP" && Object.keys(FP).length) {
        time = FP.startTime;
      }
      if (label == "FPC" && Object.keys(FPC).length) {
        time = FPC.startTime;
      }

      return (time || 0).toFixed(2) + "ms";
    };

    /**
     * @description: 性能指标图
     * @param {*} computed
     * @return {*}
     */
    const navigationEchart = computed(() => {
      const NT: any = props.options?.NT || {};
      if (!NT || !Object.keys(NT).length) return {};
      const axisData = [
        "DomReady",
        "Res",
        "DomParse",
        "Trans",
        "TTFB",
        "SSL",
        "TCP",
        "DNS",
      ];

      const seriesData: any[] = [];
      const yAxisLeftData: any[] = [
        "DOM准备",
        "资源加载",
        "DOM解析",
        "内容传输",
        "请求响应",
        "SSL建连",
        "TCP链接",
        "DNS查询",
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
        Load = 0,
        DomParse = 0,
        Res = 0,
        FirseByte = 0,
        Trans = 0,
        TTFB = 0,
        TCP = 0,
        SSL = 0,
        DNS = 0,
      } = NT;
      // TODO 待优化
      const defaultSeriesData: any[] = [
        `${Res + DomParse + TTFB + TCP + SSL + DNS}`,
        `${DomParse + TTFB + TCP + SSL + DNS}`,
        // `${FirseByte + TTFB + TCP + SSL + DNS}`,
        `${Trans + TTFB + TCP + SSL + DNS}`,
        `${TTFB + TCP + SSL + DNS}`,
        `${TCP + SSL + DNS}`,
        `${TCP + DNS}`,
        `${DNS}`,
        `${DNS}`,
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
      navigationEchart
    };
  },
};
</script>
