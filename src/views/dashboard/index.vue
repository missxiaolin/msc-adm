<template>
  <div class="app-container center">
    <dl class="home-title flex">
      <dt class="flex-1">核心数据</dt>
      <dd>
        <el-date-picker
          v-model="data.analyseTime"
          type="date"
          value-format="YYYY-MM-DD"
          placeholder="请选择查询日期"
          :clearable="false"
          :disabled-date="disabledDate"
          @change="initQuery"
        />
      </dd>
    </dl>
    <el-card class="box-card">
      <div class="top-title">
        流量数据
        <span style="color: var(--e-color-success-light-3)">(H-1数据)</span>
        <el-tooltip
          effect="dark"
          content="定时数据，每小时59分钟59秒统计"
          placement="right"
        >
          <el-icon size="20"><WarningFilled /></el-icon>
        </el-tooltip>
      </div>
      <el-row :gutter="24">
        <el-col :span="4">
          <dataCardItem :optionData="data" :title="'浏览量(PV)'" :objKey="'pvCount'" />
        </el-col>
        <el-col :span="4">
          <dataCardItem :optionData="data" :title="'访客数(UV)'" :objKey="'uvCount'" />
        </el-col>
        <el-col :span="4">
          <dataCardItem :optionData="data" :title="'新访客'" :objKey="'newUvCount'" />
        </el-col>
        <el-col :span="4">
          <dataCardItem :optionData="data" :title="'IP数'" :objKey="'ipCounct'" />
        </el-col>
        <el-col :span="4">
          <dataCardItem :optionData="data" :title="'频次(人均)'" :objKey="'visitFrequency'" />
        </el-col>
        <el-col :span="4">
          <dataCardItem :optionData="data" :title="'跳出率'" :objKey="'jumpCount'" />
        </el-col>
      </el-row>
    </el-card>
    
  </div>
</template>

<script lang="ts">
import { reactive, onMounted } from "vue";
import { currentDate } from "@/utils/index";
import { AnalyseCoreResponse } from "@/api/index/types/modules";
import { indexAnalyseCore } from "@/api/index/index";
import dataCardItem from './components/dataCardItem.vue'

interface TopData {
  analyseTime: string;
  analyseData: AnalyseCoreResponse;
}

export default {
  components: {
    dataCardItem
  },
  setup() {
    let data = reactive<TopData>({
      analyseTime: "",
      analyseData: {
        todayData: {
          pvCount: 0,
          uvCount: 0,
          newUvCount: 0,
          ipCounct: 0,
          jumpCount: 0,
          visitFrequency: 0,
        },
        yesterdayData: {
          pvCount: 0,
          uvCount: 0,
          newUvCount: 0,
          ipCounct: 0,
          jumpCount: 0,
          visitFrequency: 0,
        },
      },
    });
    /**
     * 日期选择置灰
     * */
    const disabledDate = (time: Date) => {
      return time.getTime() > Date.now();
    };
    // 首页顶部数据
    const queryCoreAnalyseData = async () => {
      let params = {
        analyseTime: data.analyseTime,
      };
      let res = await indexAnalyseCore(params);
      if (!res.success) {
        return false;
      }
      data.analyseData = res.model;
    };
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
    const initQuery = () => {
      queryCoreAnalyseData();
    };

    onMounted(() => {
      data.analyseTime = currentDate();
      initQuery();
    });

    return {
      data,
      disabledDate,
      initQuery,
      riseTrendCompout,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-title {
  padding: 10px 0;
  dt {
    line-height: 32px;
    font-weight: 700;
    font-size: 18px;
    padding-right: 20px;
  }
  dt,
  dd {
    display: flex;
    align-items: center;
  }
}
.box-card {
  width: 100%;
  display: flex;
  :deep(.el-card__body) {
    width: 100%;
  }
  .top-title {
    margin-bottom: 20px;
    :deep(.el-icon) {
      vertical-align: middle;
      margin-left: 5px;
    }
  }
}
.statistic-overall {
  dd {
    h4 {
      font-size: 40px;
      font-weight: 600;
      padding: 10px 0;
    }
    .go-up,
    .go-down {
      display: flex;
      align-items: center;
      span {
        display: flex;
        align-items: center;
      }
    }
  }
}

</style>
