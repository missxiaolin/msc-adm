<template>
  <div class="ladm-chart" ref="Echarts" :style="{ height: `${size}px` }"></div>
</template>

<script lang="ts">
import { useECharts } from "@/hooks/useECharts";
import { computed, nextTick, onMounted, ref, Ref, watch } from "vue";
import { cloneDeep, has, assign } from "lodash";
import china from "./china/china";
export default {
  props: {
    options: {
      type: Object,
      defualt: {},
    },
    size: {
      type: Number,
      default: 300,
    },
    map: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const Echarts = ref<HTMLDivElement | null>(null);
    const { setOptions, resize, echarts } = useECharts(
      Echarts as Ref<HTMLDivElement>
    );

    // const emits = defineEmits(["close", "update:modelValue", "input", "change"]);

    // const props = defineProps({
    //   options: {
    //     type: Object,
    //     defualt: {},
    //   },
    //   size: {
    //     type: Number,
    //     default: 300,
    //   },
    //   map: {
    //     type: Boolean,
    //     default: false,
    //   },
    // });

    const formatEchartData = (n: any) => {
      nextTick(() => {
        let nVal = cloneDeep(n);
        const defaultOption: any = {
          grid: {
            left: "10px",
            right: "20px",
            bottom: "10px",
            top: "10px",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            confine: true, // 将tooltip限制在图表区域内
            // renderMode: 'richText', // 默认为html
            // formatter: function (params) {
            // 	// console.log("params----", params);
            // 	return params[0].name;
            // },
          },
          xAxis: {
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
            // axisLabel: {
            // 	color: "#95979e",
            // },
          },
          yAxis: {
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
            // axisLabel: {
            // 	color: "#95979e",
            // },
          },
        };
        // 合并默认 配置
        Object.keys(defaultOption).forEach((item: any) => {
          let nItem = nVal[item];
          const dVla = defaultOption[item] || "";
          if (dVla) {
            if (nItem) {
              // nItem = { ...dVla, ...nItem };
              assign(nItem, dVla);
            } else {
              nVal[item] = dVla;
            }
          }
        });
        // 主题颜色
        let colorList = [
          "#29c1c2",
          "#21B455",
          "#FF6860",
          "#FF9C00",
          "#F56C6C",
          "#749f83",
          "#ca8622",
          "#c23531",
          "#2f4554",
          "#61a0a8",
          "#d48265",
          "#91c7ae",
          "#bda29a",
          "#6e7074",
          "#546570",
          "#c4ccd3",
        ];
        // console.log("nVal.seriesColorReset---", nVal.seriesColorReset, has(nVal, "seriesColorReset"));
        // 单数据图标 颜色处理
        if (nVal.series) {
          if (nVal.series.length == 1) {
            nVal.series.forEach((item: any) => {
              item.itemStyle = {
                normal: {
                  //这里是重点
                  color: function (params: any) {
                    //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色

                    let index = 0;
                    //给大于颜色数量的柱体添加循环颜色的判断
                    const getColor = (dataIndex: number): any => {
                      const colorLen = colorList.length;
                      if (dataIndex >= colorLen) {
                        index = dataIndex - colorLen;
                        if (index >= colorLen) {
                          return getColor(index);
                        }
                        return colorList[index];
                      }
                      return colorList[dataIndex];
                    };
                    return getColor(params.dataIndex);
                  },
                },
              };
            });
          } else if (
            has(nVal, "seriesColorReset") &&
            nVal.seriesColorReset === true
          ) {
            //
            // 多数据图表
            nVal.series.forEach((item: any, index) => {
              item.itemStyle = {
                //加上  只会出现一种颜色
                normal: { color: colorList[index] },
                ...item.itemStyle,
              };
            });
          }
        }
        if (isMap.value) {
          nVal.geo = nVal.geo || {};
          nVal.geo.map = "china";
          echarts.registerMap("china", china);
        }
        // console.log("nVal----", nVal);
        nextTick(() => {
          setOptions(nVal);
        });
      });
    };

    const isMap = computed(() => props.map);
    //设置图表

    watch(
      () => props.options,
      (n) => {
        // const { options, size } = n.value;
        // console.log("options---", n);
        nextTick(() => {
          if (Object.keys(n)) {
            formatEchartData(n);
          }
        });
      },
      {
        deep: true,
        immediate: true,
      }
    );

    watch(
      () => props.size,
      () => {
        nextTick(() => resize());
      }
    );

    //渲染完成
    onMounted(() => {});

    return {
      Echarts,
    };
  },
};
</script>

<style lang="scss" scoped>
.ladm-chart {
  width: 100% !important;
  :deep(canvas) {
    height: 100% !important;
  }
}
</style>
