<template>
  <div>
    <el-statistic :value="optionData.analyseData.todayData[objKey]">
      <template #title>{{ title }}</template>
    </el-statistic>
    <div class="footer-item">
      <span>较昨日</span>
      <span class="green">
        {{
          riseTrendCompout(
            optionData.analyseData.todayData[objKey],
            optionData.analyseData.yesterdayData[objKey],
            optionData.analyseData.todayData[objKey] >
              optionData.analyseData.yesterdayData[objKey]
          )
        }}
        <el-icon size="14">
          <CaretTop
            v-if="
              optionData.analyseData.todayData[objKey] >
              optionData.analyseData.yesterdayData[objKey]
            "
          />
          <CaretBottom
            v-if="
              optionData.analyseData.todayData[objKey] <
              optionData.analyseData.yesterdayData[objKey]
            "
          />
        </el-icon>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      default: () => {
        return "";
      },
    },
    optionData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    objKey: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  setup() {
    // 计算百分比
    const riseTrendCompout = (
      todayData: number,
      yesterdayData: number,
      riseTren: boolean
    ) => {
      let data = 0;
      if (riseTren) {
        data = (todayData - yesterdayData) / todayData;
      } else {
        data = (yesterdayData - todayData) / yesterdayData;
      }
      return `${((data || 0) * 100).toFixed(0)} %`;
    };

    return {
      riseTrendCompout,
    };
  },
};
</script>

<style lang="scss" scoped>
.green {
  justify-content: center;
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
