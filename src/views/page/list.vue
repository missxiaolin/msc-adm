<template>
  <div class="app-container">
    <el-card class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="simpleUrl" label="页面链接">
          <el-input
            v-model="searchData.simpleUrl"
            placeholder="请输入带*的页面链接"
          />
        </el-form-item>
        <el-form-item prop="phone" label="日期">
          <el-date-picker
            v-model="searchData.data"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="init">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <section class="custom-main-contents visit-left-contents">
      <el-card class="flex flex-1 flex-column visit-left-list">
        <template #header>
          <div class="card-header">
            <span>访问页面</span>
            <span>总PV: {{ data.pvCount }}次</span>
          </div>
        </template>
        <div class="flex-1 flex flex-column">
          <el-scrollbar>
            <dl
              class="arco-list-item"
              :class="{ active: data.activePage == item.simpleUrl }"
              v-for="(item, index) in data.visitList"
              :key="index"
              @click="handleVisitItem(item)"
            >
              <dt>
                {{ item.simpleUrl }}
              </dt>
              <dd class="flex align-items-center">
                {{ numberFormat(item.pageCount) }}次({{
                  visitPercent(item.pageCount)
                }})
                <el-icon><ArrowRightBold /></el-icon>
              </dd>
            </dl>
          </el-scrollbar>
          <div class="pager-wrapper mt20">
            <el-pagination
              background
              :layout="paginationData.layout"
              :page-sizes="paginationData.pageSizes"
              :total="paginationData.total"
              :page-size="paginationData.pageSize"
              :currentPage="paginationData.currentPage"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-card>
      <div class="visit-right-contents flex-1 flex flex-column">
        <el-scrollbar>
          <!-- 健康数据 -->
          <el-card>
            <template #header>
              <div class="card-header">
                <span>健康概览</span>
              </div>
            </template>
            <el-tabs class="demo-tabs">
              <el-tab-pane label="pv/uv">
                <pageHoursEchart :params="hourPvUvParam" />
              </el-tab-pane>
              <el-tab-pane label="JS报错">
                <JsHoursEchart :params="hourJsParam" />
              </el-tab-pane>
              <el-tab-pane label="平均性能" v-if="data.project.projectType == 1">
                <PerfEchart :options="data.perfEchartOPtion"></PerfEchart>
              </el-tab-pane>
              <!-- <el-tab-pane label="平均性能" v-if="data.project.projectType == 2">
                <WxPerfEchart :options="data.perfEchartOPtion"></WxPerfEchart>
              </el-tab-pane> -->
            </el-tabs>
          </el-card>
          <!-- 页面js 错误详情 -->
          <el-card class="mt20">
            <template #header>
              <div class="card-header">
                <span>JS错误聚类</span>
              </div>
            </template>
            <el-table :data="data.jsErrorTableData" border style="width: 100%">
              <el-table-column prop="errorMsg" label="错误内容" />
              <el-table-column prop="count" label="错误数" />
              <el-table-column prop="userCount" label="影响用户数" />
            </el-table>
          </el-card>
          <!-- api 详情 -->
          <el-card class="mt20">
            <template #header>
              <div class="card-header">
                <span>API详情</span>
              </div>
            </template>
            <div class="flex-1 flex flex-column">
              <el-table border :data="data.tableData">
                <el-table-column prop="pathName" label="API名称" align="left" />
                <el-table-column prop="method" label="请求方式" align="center" />
                <el-table-column prop="count" label="请求次数" align="center" />
                <el-table-column prop="avgDuration" label="平均耗时（ms）" align="center" />
                <el-table-column prop="avgDuration" label="请求成功率" align="center">
                  <template #default="{ row }">
                    {{ (row.successCount / row.count).toFixed(2) * 100 }}%
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
          <!-- 地理分布 -->
          <el-card class="mt20">
            <template #header>
              <div class="card-header">
                <span>地理分布</span>
              </div>
            </template>
            <!-- mapOption -->
            <MapEcharts :ipCregion="data.ipcregion"></MapEcharts>
          </el-card>
          <!-- 终端数据 -->
          <el-card class="mt20">
            <template #header>
              <div class="card-header">
                <span>终端分布</span>
              </div>
            </template>
            <el-tabs class="demo-tabs">
              <el-tab-pane label="系统版本" v-if="data.EchartDatas.os">
                <Echarts :options="echartData('os')"></Echarts>
              </el-tab-pane>
              <el-tab-pane label="浏览设备" v-if="data.EchartDatas.device">
                <Echarts :options="echartData('device')"></Echarts>
              </el-tab-pane>
              <el-tab-pane label="浏览器版本" v-if="data.EchartDatas.browser">
                <Echarts :options="echartData('browser')"></Echarts>
              </el-tab-pane>
              <el-tab-pane label="设备分辨率" v-if="data.EchartDatas.screen">
                <Echarts :options="echartData('screen')"></Echarts>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-scrollbar>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref, computed } from "vue";
import { timeQuantum, numberFormat } from "@/utils/index";
import { pageGeoDistribution, pageList, pageEchartByUuId } from "@/api/page";
import { usePagination } from "@/hooks/usePagination";
import MapEcharts from "@/components/mapEcharts/index.vue";
import { aggregateErrorByErrorMsg } from "@/api/js";
import { apiAgregateList } from "@/api/request/index"
import pageHoursEchart from "@/components/page/pageHoursEchart.vue";
import JsHoursEchart from "@/components/jsComponents/jsHoursEchart.vue";
import PerfEchart from "@/components/performanceComponents/perfEchart.vue";
import WxPerfEchart from "@/components/performanceComponents/wxPerfEchart.vue";
import { performanceEchartByUrl } from "@/api/performance";
import Echarts from "@/components/echarts/index.vue";
import { cloneDeep } from "lodash";

export default {
  components: {
    MapEcharts,
    pageHoursEchart,
    JsHoursEchart,
    PerfEchart,
    WxPerfEchart,
    Echarts,
  },
  setup() {
    let data = reactive({
      activePage: "", // 访问页面选中
      pvCount: 0,
      visitList: <any>[],
      ipcregion: <any>[], // 地图
      jsErrorTableData: <any>[], // js错误
      perfEchartOPtion: <any>[], // 性能
      project: <any>{},
      EchartDatas: <any>[], // 分布
      tableData: <any>[], // pai 数据
    });
    const searchData = ref({
      simpleUrl: "",
      data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
    });

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(
        () => {
          getPageList();
        },
        {
          layout: "total, prev, pager, next, jumper",
        }
      );

    // 分页
    const getPageList = async () => {
      let param = {
        simpleUrl: searchData.value.simpleUrl,
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      let res = await pageList(param);
      if (!res.success) {
        return;
      }
      data.pvCount = res.model.pvCount;
      paginationData.total = res.model.count;
      data.visitList = res.model.list;
      // 默认查询第一条数据详情
      handleVisitItem(data.visitList[0] || {});
    };

    // 地图数据
    const getPageGeoDistribution = async () => {
      const params = {
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        simpleUrl: data.activePage,
      };
      let res = await pageGeoDistribution(params);
      if (!res.success) {
        return false;
      }
      data.ipcregion = res.model;
    };

    // js 错误 errorMsg 分组
    const getAggregateErrorByErrorMsg = async () => {
      let param = {
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        simpleUrl: data.activePage,
      };
      let res = await aggregateErrorByErrorMsg(param);
      if (!res.success) {
        return;
      }
      data.jsErrorTableData = res.model;
    };

    /**
     * @description: 左侧列表 点击http 点击
     * @param {*} node
     * @return {*}
     */
    const handleVisitItem = (node: any) => {
      const { simpleUrl = "" } = node;
      data.activePage = simpleUrl;

      getPageGeoDistribution();
      getAggregateErrorByErrorMsg();
      getPerformanceEchartByUrl();
      getPageEchartByUuId();
      getAgregateList()
    };

    // pv/uv 图表
    const hourPvUvParam = computed(() => {
      return {
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        simpleUrl: data.activePage,
      };
    });

    // js 图表
    const hourJsParam = computed(() => {
      return {
        data: searchData.value.data,
        simpleUrl: data.activePage,
      };
    });

    // 性能图表
    const getPerformanceEchartByUrl = async () => {
      let param = {
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        simpleUrl: data.activePage,
      };
      let res = await performanceEchartByUrl(param);
      if (!res.success) {
        return;
      }
      data.perfEchartOPtion = res.model;
      data.project = res.model.project;
    };

    // 分布图表
    const getPageEchartByUuId = async () => {
      let param = {
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        simpleUrl: data.activePage,
      };
      let res = await pageEchartByUuId(param);
      if (!res.success) {
        return;
      }
      data.EchartDatas = res.model;
    };

    // 获取api 数据
    const getAgregateList = async () => {
      let param = {
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        simpleUrl: data.activePage,
      }
      let res = await apiAgregateList(param)
      if (!res.success) {
        return;
      }
      data.tableData = res.model
    }

    // 渲染数据
    const defaultEchart = {
      // legend: {
      //   top: 'bottom'
      // },
      toolbox: {
        show: true,
        feature: {
          mark: { show: true },
          dataView: { show: true, readOnly: false },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      series: [
        {
          name: "Nightingale Chart",
          type: "pie",
          radius: [20, 100],
          center: ["50%", "50%"],
          roseType: "area",
          itemStyle: {
            borderRadius: 8,
          },
          data: [],
        },
      ],
    };

    /**
     * @description: echart 渲染数据提取
     * @param {*} computed
     * @return {*}
     */
    const echartData = computed(() => {
      return (type: string, EchartModel = data.EchartDatas) => {
        let Echart: any = cloneDeep(defaultEchart);
        const nodeData = EchartModel[type];
        let arr: any = [];
        nodeData.axisData?.forEach((name: any, index: any) => {
          arr.push({
            name,
            value: nodeData.seriesData[index],
          });
        });
        Echart.series[0].data = arr;
        return Echart;
      };
    });

    /**
     * @description: 访问占比
     * @param {*} count
     * @return {*}
     */
    const visitPercent = (count: number) => {
      return ((count / data.pvCount) * 100).toFixed(2) + "%";
    };

    // 初始化
    const init = async () => {
      getPageList();
    };

    // 重置
    const resetSearch = async () => {
      searchData.value = {
        simpleUrl: "",
        data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
      };
    };

    onMounted(() => {
      init();
    });

    return {
      data,
      searchData,
      resetSearch,
      init,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
      visitPercent,
      numberFormat,
      handleVisitItem,
      hourPvUvParam,
      hourJsParam,
      echartData,
    };
  },
};
</script>

<style lang="scss" scoped>
@use "./style/style.scss";
</style>
