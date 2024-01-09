<template>
  <div class="flex flex-row justify-between" style="width: 100%">
    <!-- <el-statistic title="白屏时间" :value="ntFormat('FP')">
      <template #suffix>ms</template>
    </el-statistic>
    <el-statistic title="首字节" :value="ntFormat('FirseByte')">
      <template #suffix>ms</template>
    </el-statistic>
    <el-statistic title="DOM Ready" :value="ntFormat('DomReady')">
      <template #suffix>ms</template>
    </el-statistic>
    <el-statistic title="首次可交互时间" :value="ntFormat('TTI')">
      <template #suffix>ms</template>
    </el-statistic>
    <el-statistic title="页面完全加载" :value="ntFormat('Load')">
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

      return Number((time || 0).toFixed(2));
    };

    /**
     * @description: 性能指标图
     * @param {*} computed
     * @return {*}
     */
    const navigationEchart = computed(() => {

      const NT: any = props.options?.nt || {};
      if (!NT || !Object.keys(NT).length) return {};
      const axisData = [
        "pageLoad",
        "domReady",
        "resourceLoad",
        "domParse",
        "contentDownload",
        "ttfb",
        "ssl",
        "initialConnection",
        "dnsLookup"
      ];

      const seriesData: any[] = [];
      const yAxisLeftData: any[] = [
        "页面完全加载",
        "DOM完成加载",
        "资源加载耗时",
        "DOM解析耗时",
        "内容传输耗时",
        "请求响应耗时",
        "SSL安全连接耗时",
        "TCP连接耗时",
        "DNS查询耗时"
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
        pageLoad = 0,
        domReady = 0,
        resourceLoad = 0,
        domParse = 0,
        contentDownload = 0,
        ttfb = 0,
        ssl = 0,
        initialConnection = 0,
        dnsLookup = 0
      }: any = NT;
      const defaultSeriesData: any[] = [
        `${pageLoad + domReady + resourceLoad + domParse + contentDownload + ttfb + ssl + initialConnection + dnsLookup}`,
        `${domReady + resourceLoad + domParse + contentDownload + ttfb + ssl + initialConnection + dnsLookup}`,
        `${resourceLoad + domParse + contentDownload + ttfb + ssl + initialConnection + dnsLookup}`,
        `${domParse + contentDownload + ttfb + ssl + initialConnection + dnsLookup}`,
        `${contentDownload + ttfb + ssl + initialConnection + dnsLookup}`,
        `${ttfb + ssl + initialConnection + dnsLookup}`,
        `${ssl + initialConnection + dnsLookup}`,
        `${initialConnection + dnsLookup}`,
        `${dnsLookup}`,
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
