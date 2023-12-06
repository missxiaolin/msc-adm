<template>
  <div class="flex"></div>
  <Echarts :options="options"></Echarts>
</template>

<script lang="ts">
import Echarts from "@/components/echarts/index.vue";
import { ref, watch } from "vue";
import moment from "moment";
export default {
  components: {
    Echarts,
  },
  props: {
    echartsOptions: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const options = ref({});

    const init = () => {
      let {
        seriesData = [],
        axisData = [],
        seriesName = {},
      } = props.echartsOptions;
      seriesData = seriesData.map((item: any, index: string | number) => {
        return {
          ...{
            name: seriesName[index],
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            ...item,
          },
        };
      });

      options.value = {
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
        seriesColorReset: true,
        series: [...seriesData],
      };
    };

    init();

    watch(() => props.echartsOptions,n => {
      init()
    })

    return {
      options,
    };
  },
};
</script>

<style scoped></style>
