<template>
  <div class="flex">
    <el-statistic :value="data.pvTotal" style="margin-right: 20px;">
      <template #title>总PV</template>
    </el-statistic>
    <el-statistic :value="data.uvTotal">
      <template #title>总uv</template>
    </el-statistic>
  </div>
  <Echarts :options="data.pageErrorChartData"></Echarts>
</template>

<script lang="ts">
import { reactive, nextTick, watch } from "vue";
import moment from "moment";
import Echarts from "@/components/echarts/index.vue";
import { pageHour } from "@/api/page/index";

export default {
  props: {
    params: {
      type: Object,
      defualt: {
        happenDate: [],
        simpleUrl: "",
      },
    },
  },
  components: {
    Echarts,
  },
  setup(props) {
    const data = reactive({
      pageErrorChartData: <any>[],
      pvTotal: 0,
      uvTotal: 0,
    });
    watch(
      () => props.params,
      (n: any) => {
        if (Object.keys(n).length) {
          nextTick(() => handleQueryPageEchart(n));
        }
      },
      {
        deep: true,
        // immediate: true,
      }
    );
    const handleQueryPageEchart = async (params: any) => {
      let res = await pageHour(params);
      const { model } = res;
      if (!res.success) {
        return;
      }
      let { axisData = [], seriesData = [], pvTotal = 0, uvTotal = 0 } = model;
      seriesData = seriesData.map((item: any, index: string | number) => {
        const name: any = {
          0: "pv",
          1: "uv",
        };
        return {
          ...{
            name: name[index],
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            ...item,
          },
        };
      });
      const pageEchart = {
        xAxis: {
          type: "category",
          data: axisData,
          axisLabel: {
            color: "#95979e",
            align: "center",
            // interval: 0,
            formatter: (value: string | any[]) => {
              const date = moment(value).format("MM-DD HH:mm").split(" ");
              return `${date[0]}\n${date[1]}`;
            },
          },
        },
        yAxis: {
          type: "value",
        },
        dataZoom: [
          {
            type: "inside",
          },
          // {
          // 	type: "slider",
          // },
        ],
        seriesColorReset: true,
        series: [...seriesData],
      };
      data.pageErrorChartData = pageEchart;
      data.pvTotal = pvTotal;
      data.uvTotal = uvTotal;
    };
    return {
      data,
    };
  },
};
</script>

<style></style>
