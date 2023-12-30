<template>
  <div class="app-container center">
    <dl class="home-title flex">
      <dt class="flex-1">核心数据</dt>
      <dd>
        <el-date-picker v-model="data.analyseTime" type="date" value-format="YYYY-MM-DD" placeholder="请选择查询日期"
          :clearable="false" :disabled-date="disabledDate" @change="initQuery" />
      </dd>
    </dl>
    <el-card class="box-card">
      <div class="top-title">
        流量数据
        <span>(H-1数据)</span>
        <el-tooltip effect="dark" content="定时数据，每小时59分钟59秒统计" placement="right">
          <el-icon size="20">
            <WarningFilled />
          </el-icon>
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
    <el-card class="box-card mt20">
      <div class="top-title">实时数据</div>
      <pageHoursEchart :params="hourPvUvParam" />
    </el-card>
    <dl class="home-title flex">
      <dt>综合数据</dt>
      <dd class="flex-1">
        <el-radio-group v-model="chart.showNum" @change="handleTopNumChange" size="small">
          <el-radio-button :label="10">10</el-radio-button>
          <el-radio-button :label="20">20</el-radio-button>
          <el-radio-button :label="30">30</el-radio-button>
        </el-radio-group>
      </dd>
    </dl>
    <section class="synthetic-data flex">
      <div class="synthetic-data flex">
        <div class="e-col">
          <el-card>
            <colItem :chart="chart" :optionData="data" :chartKey="'simpleUrl'" :title="'页面访问量TOP'" :tip="'统计网站的访问数量'" />
          </el-card>
        </div>
        <div class="e-col">
          <el-card>
            <colItem :chart="chart" :optionData="data" :chartKey="'cregion'" :title="'城市名称访问用户量TOP'"
              :tip="'在不同城市访问网站的用户量分布情况。ps: 城市是根据ip地址查询出来的，并不是每个ip都能查询出来，查询出来的结果也未必准确，只作为趋势参考'" />
          </el-card>

        </div>
        <div class="e-col">
          <el-card>
            <colItem :chart="chart" :optionData="data" :chartKey="'device'" :title="'浏览设备访问用户量TOP'"
              :tip="'数值代表使用的浏览设备的数量'" />
          </el-card>

        </div>
        <div class="e-col">
          <el-card>
            <colItem :chart="chart" :optionData="data" :chartKey="'os'" :title="'系统版本访问用户量TOP'" :tip="'不同设备星号的用户量分布情况'" />
          </el-card>

        </div>
        <div class="e-col">
          <el-card>
            <colItem :chart="chart" :optionData="data" :chartKey="'browser'" :title="'浏览器版本访问用户量TOP'"
              :tip="'数值代表使用的浏览器版本的数量'" />
          </el-card>

        </div>
        <div class="e-col">
          <el-card>
            <colItem :chart="chart" :optionData="data" :chartKey="'screen'" :title="'设备分辨率访问用户量TOP'"
              :tip="'数值代表设备的物理分辨率'" />
          </el-card>

        </div>
      </div>
    </section>
    <el-card class="box-card mt20">
      <div class="top-title">
        地理分布
        <el-tooltip effect="dark" content="城市是根据ip地址查询出来的，并不是每个ip都能查询出结果，查询出来的结果也未必准确，只作为趋势参考。" placement="right">
          <el-icon size="20">
            <WarningFilled />
          </el-icon>
        </el-tooltip>
      </div>
      <MapEcharts :ipCregion="chart.ipcregion" />
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, computed } from "vue";
import { currentDate } from "@/utils/index";
import { AnalyseCoreResponse } from "@/api/index/types/modules";
import { indexAnalyseCore } from "@/api/index/index";
import { pageEchartByUuId, pageGeoDistribution } from "@/api/page/index";
import dataCardItem from "./components/dataCardItem.vue";
import pageHoursEchart from "@/components/page/pageHoursEchart.vue";
import colItem from "./components/colItem.vue";
import MapEcharts from '@/components/mapEcharts/index.vue'

interface TopData {
  analyseTime: string;
  analyseData: AnalyseCoreResponse;
}

export default {
  components: {
    dataCardItem,
    pageHoursEchart,
    colItem,
    MapEcharts
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
      getPageEchartByUuId();
      getPageGeoDistribution()
    };
    /**
     * @description: 重置 happenDate
     * @param {*} computed
     * @return {*}
     */
    const happenDateFormat = computed(() => {
      return {
        startTime: `${data.analyseTime} 00:00:00`,
        endTime: `${data.analyseTime} 23:59:59`,
      };
    });

    const hourPvUvParam = computed(() => {
      return {
        ...happenDateFormat.value,
      };
    });

    // 综合数据
    let chart = reactive({
      topEchartModel: <any>{},
      ipcregion: <any>[],
      showNum: 10,
      echartHeight: 200,
    });
    /**
     * @description: TOP 数量
     *
     * */
    const handleTopNumChange = (val: any) => {
      const height: any = {
        10: 300,
        20: 400,
        30: 500,
      };
      chart.echartHeight = height[val];
    };

    // 获取综合数据
    const getPageEchartByUuId = async () => {
      const params = {
        ...happenDateFormat.value,
        limit: 30,
      };
      const res = await pageEchartByUuId(params);
      if (!res.success) {
        return false;
      }
      chart.topEchartModel = res.model;
    };

    // 地图数据
    const getPageGeoDistribution = async () => {
      const params = {
        ...happenDateFormat.value,
      };
      let res = await pageGeoDistribution(params)
      if (!res.success) {
        return false;
      }
      chart.ipcregion = res.model
    }

    onMounted(() => {
      data.analyseTime = currentDate();
      initQuery();
    });

    return {
      data,
      disabledDate,
      initQuery,
      hourPvUvParam,
      chart,
      handleTopNumChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.home-title {
  padding: 10px 0;
  color: var(--el-text-color-primary);

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

.synthetic-data {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;

  .e-col {
    flex-direction: column;
    width: 32.5%;

    &:nth-child(4),
    &:nth-child(5),
    &:nth-child(6) {
      margin-top: 10px;
    }
  }
}
</style>
