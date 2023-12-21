<template>
  <div class="flex js-error-tip">
    <el-statistic title="错误数" :value="data.jseErrorCount"></el-statistic>
    <el-statistic :value="data.errorTypeList.length" value-style="color: #29c1c2;">
      <template #title>
        <el-popover placement="bottom-start" :width="200" trigger="hover">
          <template #reference>
            <div>错误类型</div>
          </template>
          <div class="popover-content">
            <p v-for="(item, index) in data.errorTypeList" :key="index">{{ item.type }}</p>
          </div>
        </el-popover>
      </template>
    </el-statistic>
    <el-statistic :value="data.effectUserList.length" value-style="color: #29c1c2;">
      <template #title>
        <el-popover placement="bottom-start" :width="200" trigger="hover">
          <template #reference>
            <div>影响人数</div>
          </template>
          <div class="popover-content">
            <p v-for="(item, index) in data.effectUserList" :key="index">{{ item.uuId }}</p>
          </div>
        </el-popover>
      </template>
    </el-statistic>
    <el-statistic :value="data.cregionList.length" value-style="color: #29c1c2;">
      <template #title>
        <el-popover placement="bottom-start" :width="200" trigger="hover">
          <template #reference>
            <div>影响城市</div>
          </template>
          <div class="popover-content">
            <p v-for="(item, index) in data.cregionList" :key="index">{{ item.province }}</p>
          </div>
        </el-popover>
      </template>
    </el-statistic>
    <el-statistic :value="data.pageList.length" value-style="color: #29c1c2;">
      <template #title>
        <el-popover placement="bottom-start" :width="200" trigger="hover">
          <template #reference>
            <div>影响页面</div>
          </template>
          <div class="popover-content">
            <p v-for="(item, index) in data.pageList" :key="index">{{ item.pageUrl }}</p>
          </div>
        </el-popover>
      </template>
    </el-statistic>
  </div>
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
      effectUserList: <any>[],
      cregionList: <any>[],
      pageList: <any>[],
      errorTypeList: <any>[],
      jseErrorCount: 0,
    });
    // js 图表
    const handleQueryJsError = async (dataParam: any) => {
      const param = {
        pageUrl: dataParam.pageUrl,
        errorMsg: dataParam.errorMsg,
        startTime: dataParam.data[0],
        endTime: dataParam.data[1],
      };
      let res = await jsHourEchats(param);
      if (!res.success) {
        return;
      }
      const { model } = res;
      const {
        axisData = [],
        seriesData = [],
        userList = [],
        cregionList = [],
        pageList = [],
        errorTypeList = [],
        errorCount = 0,
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
      data.jseErrorCount = errorCount;
      data.effectUserList = userList;
      data.cregionList = cregionList;
      data.pageList = pageList;
      data.errorTypeList = errorTypeList;
      data.jseErrorCount = errorCount;
    };

    watch(
      () => props.params,
      (n) => {
        if (Object.keys(n).length) {
          nextTick(() => handleQueryJsError(n));
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

<style lang="scss" scoped>
.js-error-tip {
  margin-bottom: 20px;
  :deep(.el-statistic) {
    margin-right: 20px;
  }
}
.popover-content {
  max-height: 200px;
  overflow-y: auto;
  p {
    padding: 5px 0;
    border-bottom: 1px dotted #d9dadd;
    white-space: nowrap;
    &:last-child {
      border-bottom-width: 0;
    }
  }
}
</style>
