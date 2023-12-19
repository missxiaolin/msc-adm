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
          <dataCardItem
            :optionData="data"
            :title="'浏览量(PV)'"
            :objKey="'pvCount'"
          />
        </el-col>
        <el-col :span="4">
          <dataCardItem
            :optionData="data"
            :title="'访客数(UV)'"
            :objKey="'uvCount'"
          />
        </el-col>
        <el-col :span="4">
          <dataCardItem
            :optionData="data"
            :title="'新访客'"
            :objKey="'newUvCount'"
          />
        </el-col>
        <el-col :span="4">
          <dataCardItem
            :optionData="data"
            :title="'IP数'"
            :objKey="'ipCounct'"
          />
        </el-col>
        <el-col :span="4">
          <dataCardItem
            :optionData="data"
            :title="'频次(人均)'"
            :objKey="'visitFrequency'"
          />
        </el-col>
        <el-col :span="4">
          <dataCardItem
            :optionData="data"
            :title="'跳出率'"
            :objKey="'jumpCount'"
          />
        </el-col>
      </el-row>
    </el-card>
    <el-card class="box-card mt20">
      <div class="top-title">实时数据</div>
      <pageHoursEchart :params="hourPvUvParam" />
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, computed } from "vue";
import { currentDate } from "@/utils/index";
import { AnalyseCoreResponse } from "@/api/index/types/modules";
import { indexAnalyseCore } from "@/api/index/index";
import dataCardItem from "./components/dataCardItem.vue";
import pageHoursEchart from "@/components/page/pageHoursEchart.vue";

interface TopData {
  analyseTime: string;
  analyseData: AnalyseCoreResponse;
}

export default {
  components: {
    dataCardItem,
    pageHoursEchart,
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
    const initQuery = () => {
      queryCoreAnalyseData();
    };
    /**
     * @description: 重置 happenDate
     * @param {*} computed
     * @return {*}
     */
    const happenDateFormat = computed(() => {
      return {
        startTime:  `${data.analyseTime} 00:00:00`,
        endTime: `${data.analyseTime} 23:59:59`,
      };
    });

    const hourPvUvParam = computed(() => {
      return {
        ...happenDateFormat.value
      };
    });

    onMounted(() => {
      data.analyseTime = currentDate();
      initQuery();
    });

    return {
      data,
      disabledDate,
      initQuery,
      hourPvUvParam,
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
</style>
