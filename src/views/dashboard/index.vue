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
        <!-- <span style="color: var(--e-color-success-light-3)">(H-1数据)</span>
        <el-tooltip
          effect="dark"
          content="定时数据，每小时0分钟统计"
          placement="right"
        >
          <el-icon size="20"><WarningFilled /></el-icon>
        </el-tooltip> -->
      </div>
      <el-row :gutter="24">
        <el-col :span="4">
          <el-statistic :value="data.analyseData.todayData.pvCount">
            <template #title> 浏览量(PV) </template>
          </el-statistic>
          <div class="footer-item">
            <span>较昨日</span>
            <span class="green">
              {{
                riseTrendCompout(
                  data.analyseData.todayData.pvCount,
                  data.analyseData.yesterdayData.pvCount,
                  data.analyseData.todayData.pvCount >
                    data.analyseData.yesterdayData.pvCount
                )
              }}
              <el-icon size="14">
                <CaretTop
                  v-if="
                    data.analyseData.todayData.pvCount >
                    data.analyseData.yesterdayData.pvCount
                  "
                />
                <CaretBottom
                  v-if="
                    data.analyseData.todayData.pvCount <
                    data.analyseData.yesterdayData.pvCount
                  "
                />
              </el-icon>
            </span>
          </div>
        </el-col>
        <el-col :span="4">
          <el-statistic :value="data.analyseData.todayData.uvCount">
            <template #title> 访客数(UV) </template>
          </el-statistic>
          <div class="footer-item">
            <span>较昨日</span>
            <span class="green">
              {{
                riseTrendCompout(
                  data.analyseData.todayData.uvCount,
                  data.analyseData.yesterdayData.uvCount,
                  data.analyseData.todayData.uvCount >
                    data.analyseData.yesterdayData.uvCount
                )
              }}
              <el-icon size="14">
                <CaretTop
                  v-if="
                    data.analyseData.todayData.uvCount >
                    data.analyseData.yesterdayData.uvCount
                  "
                />
                <CaretBottom
                  v-if="
                    data.analyseData.todayData.uvCount <
                    data.analyseData.yesterdayData.uvCount
                  "
                />
              </el-icon>
            </span>
          </div>
        </el-col>
        <el-col :span="4">
          <el-statistic :value="data.analyseData.todayData.newUvCount">
            <template #title> 新访客 </template>
          </el-statistic>
          <div class="footer-item">
            <span>较昨日</span>
            <span class="green">
              {{
                riseTrendCompout(
                  data.analyseData.todayData.newUvCount,
                  data.analyseData.yesterdayData.newUvCount,
                  data.analyseData.todayData.newUvCount >
                    data.analyseData.yesterdayData.newUvCount
                )
              }}
              <el-icon size="14">
                <CaretTop
                  v-if="
                    data.analyseData.todayData.newUvCount >
                    data.analyseData.yesterdayData.newUvCount
                  "
                />
                <CaretBottom
                  v-if="
                    data.analyseData.todayData.newUvCount <
                    data.analyseData.yesterdayData.newUvCount
                  "
                />
              </el-icon>
            </span>
          </div>
        </el-col>
        <el-col :span="4">
          <el-statistic :value="data.analyseData.todayData.ipCounct">
            <template #title> IP数 </template>
          </el-statistic>
          <div class="footer-item">
            <span>较昨日</span>
            <span class="green">
              {{
                riseTrendCompout(
                  data.analyseData.todayData.ipCounct,
                  data.analyseData.yesterdayData.ipCounct,
                  data.analyseData.todayData.ipCounct >
                    data.analyseData.yesterdayData.ipCounct
                )
              }}
              <el-icon size="14">
                <CaretTop
                  v-if="
                    data.analyseData.todayData.ipCounct >
                    data.analyseData.yesterdayData.ipCounct
                  "
                />
                <CaretBottom
                  v-if="
                    data.analyseData.todayData.ipCounct <
                    data.analyseData.yesterdayData.ipCounct
                  "
                />
              </el-icon>
            </span>
          </div>
        </el-col>
        <el-col :span="4">
          <el-statistic :value="data.analyseData.todayData.visitFrequency">
            <template #title> 频次(人均) </template>
          </el-statistic>
          <div class="footer-item">
            <span>较昨日</span>
            <span class="green">
              {{
                riseTrendCompout(
                  data.analyseData.todayData.visitFrequency,
                  data.analyseData.yesterdayData.visitFrequency,
                  data.analyseData.todayData.visitFrequency >
                    data.analyseData.yesterdayData.visitFrequency
                )
              }}
              <el-icon size="14">
                <CaretTop
                  v-if="
                    data.analyseData.todayData.visitFrequency <
                    data.analyseData.yesterdayData.visitFrequency
                  "
                />
                <CaretBottom
                  v-if="
                    data.analyseData.todayData.visitFrequency >
                    data.analyseData.yesterdayData.visitFrequency
                  "
                />
              </el-icon>
            </span>
          </div>
        </el-col>
        <el-col :span="4">
          <el-statistic :value="data.analyseData.todayData.jumpCount">
            <template #title> 跳出率 </template>
          </el-statistic>
          <div class="footer-item">
            <span>较昨日</span>
            <span class="green">
              {{
                riseTrendCompout(
                  data.analyseData.todayData.jumpCount,
                  data.analyseData.yesterdayData.jumpCount,
                  data.analyseData.todayData.jumpCount >
                    data.analyseData.yesterdayData.jumpCount
                )
              }}
              <el-icon size="14">
                <CaretTop
                  v-if="
                    data.analyseData.todayData.jumpCount >
                    data.analyseData.yesterdayData.jumpCount
                  "
                />
                <CaretBottom
                  v-if="
                    data.analyseData.todayData.jumpCount <
                    data.analyseData.yesterdayData.jumpCount
                  "
                />
              </el-icon>
            </span>
          </div>
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

interface TopData {
  analyseTime: string;
  analyseData: AnalyseCoreResponse;
}

export default {
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
.green {
  justify-content: center;
  color: var(--el-color-success);
}
.red {
  color: var(--el-color-error);
}
</style>
