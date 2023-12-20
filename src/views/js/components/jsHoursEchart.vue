<template>
  <div></div>
  <Echarts :options="data.jsErrorChartData"></Echarts>
</template>

<script lang="ts">
import { onMounted, reactive, nextTick, watch } from "vue";
import Echarts from "@/components/echarts/index.vue";
import { jsHourEchats } from "@/api/js/index";
import moment from "moment";
export default {
  props: {
    params: {
      type: Object,
      default: {},
    },
  },
  components: {
    Echarts,
  },
  setup(props) {
    const data = reactive({
      jsErrorChartData: <any>[],
      effectUserList: [],
      cregionList: [],
      pageList: [],
      errorTypeList: [],
      jseErrorCount: 0,
    });
    // js 图表
    const handleQueryJsError = async (data: any) => {
      const param = {
        pageUrl: data.pageUrl,
        errorMsg: data.errorMsg,
        startTime: data.data[0],
        endTime: data.data[1],
      };
      let res = await jsHourEchats(param);
      if (!res.success) {
        return;
      }
      const { model } = res;
      const {
        axisData = [],
        seriesData = [],
        // userList = [],
        // cregionList = [],
        // pageList = [],
        // errorTypeList = [],
        // errorCount = 0,
      } = model;
      const jsErrorOption = {
        xAxis: {
          type: "category",
          data: axisData,
          axisLabel: {
            color: "#95979e",
            align: "center",
            // interval: 0,
            formatter: (value: string | any[], index: any) => {
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
        series: [
          {
            name: "数量",
            data: seriesData,
            type: "line",
          },
        ],
      };

      data.jsErrorChartData = jsErrorOption;
      console.log('ceshi', data)
      // data.effectUserList = userList;
      // data.cregionList = cregionList;
      // data.pageList = pageList;
      // data.errorTypeList = errorTypeList;
      // data.jseErrorCount = errorCount;
    };

    watch(
      () => props.params,
      (n) => {
        if (Object.keys(n).length) {
          //   nextTick(() => handleQueryJsError(n));
        }
      },
      {
        deep: true,
        // immediate: true,
      }
    );

    onMounted(() => {
      handleQueryJsError(props.params);
    });

    return {
      data,
    };
  },
};
</script>

<style lang="scss" scoped></style>
