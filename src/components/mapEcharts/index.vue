<template>
  <div class="flex map-custom-content">
    <Echarts :options="mapEchartsOption" :map="true" :size="600"></Echarts>
    <div class="map-custom-operate">
      <el-icon
        size="24"
        color="rgba(41, 193, 194, 1)"
        @click.stop="popuSwitch = true"
        ><Histogram
      /></el-icon>
    </div>
    <div
      class="map-custom-data-popu flex flex-column"
      :class="{ 'open-switch': popuSwitch }"
    >
      <el-icon class="close-popu" size="24" @click.stop="popuSwitch = false"
        ><CircleClose
      /></el-icon>
      <dl class="flex title">
        <dd>排名</dd>
        <dd>城市</dd>
        <dd>用户数</dd>
      </dl>
      <el-scrollbar>
        <dl class="flex" v-for="(item, index) in collectProvinces" :key="index">
          <dd>{{ index + 1 }}</dd>
          <dd>{{ item.name }}</dd>
          <dd>{{ item.cvalue }}</dd>
        </dl>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch, nextTick } from "vue";
import provinces from "@/components/echarts/china/china";
import Echarts from "@/components/echarts/index.vue";
import { cloneDeep } from "lodash";

export default {
  props: {
    ipCregion: {
      type: Array,
      default: [],
    },
    zoom: {
      type: [Number, String],
      default: 1.7,
    },
    top: {
      type: String,
      default: "30%",
    },
  },
  components: {
    Echarts,
  },
  setup(props) {
    let mapEchartsOption: any = ref([]);
    let collectProvinces: any = ref([]);
    let popuSwitch = ref(false);
    const mapOption = {
      // 背景颜色
      // 地图配置
      geo: {
        map: "china",
        zoom: props.zoom,
        // 解决缩放 海南省诸岛问题
        top: props.top,
        label: {
          rotate: 60,
          // 通常状态下的样式
          normal: {
            show: true,
            textStyle: {
              color: "#000",
            },
          },
        },
        tooltip: {
          // show: false,
          formatter(params: any) {
            const node: any =
              collectProvinces.value.find((s: any) => s.name == params.name) ||
              {};
            return `地区：${params.name}</br>数值：${node.cvalue || "0"}`;
          },
        },
        // 地图区域的样式设置
        itemStyle: {
          normal: {
            borderColor: "rgba(41, 193, 194, 1)",
            borderWidth: 1,
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(41, 193, 194, 0)", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(41, 193, 194, .2)", // 100% 处的颜色
                },
              ],
              globalCoord: false, // 缺省为 false
            },
            shadowColor: "rgba(128, 217, 248, 1)",
            shadowOffsetX: -2,
            shadowOffsetY: 2,
            shadowBlur: 10,
          },
          // 鼠标放上去高亮的样式
          emphasis: {
            areaColor: "rgba(41, 193, 194, .5)",
            borderWidth: 0,
          },
        },
      },
      series: [
        // {
        // 	type: "map",
        // 	data: [],
        // },
        {
          type: "scatter",
          coordinateSystem: "geo",
          symbol: "pin",
          legendHoverLink: true,
          symbolSize: [40, 40],
          // 这里渲染标志里的内容以及样式
          label: {
            show: true,
            formatter(value: any) {
              return value.data.cvalue;
            },
            color: "#fff",
          },
          // 标志的样式
          itemStyle: {
            normal: {
              color: "rgba(255,0,0,.9)",
              shadowBlur: 2,
              shadowColor: "D8BC37",
            },
          },
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke",
          },
          hoverAnimation: true,
          zlevel: 2,
          data: [],
        },
        //涟漪特效
        {
          name: "地理涟漪",
          type: "effectScatter",
          coordinateSystem: "geo",
          data: [], //传入的地图点数据
          symbolSize: 3, //涟漪大小
          showEffectOn: "render",
          //涟漪效应
          rippleEffect: {
            brushType: "stroke",
            color: "#f13434",
            period: 10, //周期
            scale: 10, //规模
          },
          hoverAnimation: true, //悬停动画
          //地图点样式
          // label: {
          // 	formatter: "{b}",
          // 	position: "top",
          // 	show: true,
          // 	fontSize: "10",
          // },
          itemStyle: {
            color: "#f13434",
            shadowBlur: 2,
            shadowColor: "#333",
          },
          zlevel: 1,
        },
      ],
      // visualMap: {
      // 	// 是否展示左下角，即是是false，也仅是不显示，不影响数据的映射
      // 	show: true,
      // 	// 上下端文字
      // 	text: ["高", "低"],
      // 	// 最小值和最大值，必须指定
      // 	min: 0,
      // 	max: 600,
      // 	// 位置
      // 	left: "2%",
      // 	bottom: "2%",
      // 	// 是否展示滑块
      // 	calculable: true,
      // 	// 指定映射的数据，对应的是option.series，这里根据自己的实际需要进行配置
      // 	seriesIndex: [0],
      // 	// 从下到上的颜色
      // 	inRange: {
      // 		color: ["#00467F", "#A5CC82"],
      // 	},
      // 	//字体颜色
      // 	textStyle: {
      // 		color: "#000",
      // 		map: "china",
      // 	},
      // },
    };

    const handleCollectData = () => {
      const nMapOption = cloneDeep(mapOption);
      // 汇总 省 数据
      props.ipCregion.forEach((item: any) => {
        let { name = "", value = "" } = item;
        const sname = name.split(" ");
        name = sname[1] || "";
        const cIndex = collectProvinces.value.findIndex(
          (s: any) => s.name === name
        );
        if (cIndex > -1) {
          collectProvinces.value[cIndex].cvalue =
            collectProvinces.value[cIndex].cvalue + value;
        } else {
          collectProvinces.value.push({
            name,
            oName: `${sname[0]} ${sname[1]}`,
            cvalue: value,
          });
        }
      });
      const features = provinces.features || [];
      // 获取 省 中心坐标
      collectProvinces.value.forEach((item: any, i: any) => {
        const coordNode: any = features.find(
          (s: any) => (s.properties.name || "").indexOf(item.name) > -1
        );
        if (coordNode) {
          const { center, name } = coordNode.properties;
          collectProvinces.value[i].value = center;
          collectProvinces.value[i].name = name;
        }
      });

      // 重组地图数据
      nMapOption.series = nMapOption.series.map((item: any) => {
        item.data = collectProvinces.value;
        return item;
      });
      nextTick(() => {
        nMapOption.geo.zoom = props.zoom;
        nMapOption.geo.top = props.top;

        mapEchartsOption.value = nMapOption;
      });
    };

    watch(
      () => props.ipCregion,
      () => {
        handleCollectData();
      },
      {
        deep: true,
      }
    );

    return {
      mapEchartsOption,
      popuSwitch,
      collectProvinces,
    };
  },
};
</script>

<style lang="scss" scoped>
.map-custom-content {
  position: relative;
  .map-custom-operate {
    position: absolute;
    right: 10px;
    top: 5px;
    z-index: 2;

    .e-icon {
      cursor: pointer;
    }
  }
  .popu-overly {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 4;
  }
  .map-custom-data-popu {
    position: absolute;
    width: 50%;
    height: 100%;
    right: 110%;
    background-color: rgba(255, 255, 255, 0.9);
    top: 0;
    z-index: 5;
    padding: 0 15px 15px 15px;

    &.open-switch {
      right: 0;
    }
    .close-popu {
      position: absolute;
      right: 5px;
      right: 10px;
      cursor: pointer;
    }

    dl {
      width: 100%;
      line-height: 30px;
      margin: 3px 0;
      dd {
        width: 33.33%;
        padding: 0 5px;
      }
      &:nth-of-type(odd) {
        background-color: #eaf9f9;
      }
      &.title {
        background: none;
        dd {
          font-weight: bolder;
        }
      }
    }
  }
}
</style>
