<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="simpleUrl" label="页面链接">
          <el-input v-model="searchData.simpleUrl" placeholder="请输入" />
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
          <el-button type="primary" @click="handleSearch"
            >查询</el-button
          >
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="table-wrapper">
        <el-table border :data="tableData" v-if="project.projectType == 1">
          <el-table-column prop="simpleUrl" label="url" align="center" />
          <el-table-column label="会话性能指标" align="center">
            <el-table-column label="Navigation 指标" align="center">
              <el-table-column label="DNS 查询"
                ><template #default="{ row }">
                  {{ row['navigation-timing'] && row['navigation-timing'].textValue.dnsLookup ? row['navigation-timing'].textValue.dnsLookup : 0 }}
                </template></el-table-column
              >
              <el-table-column label="TCP 链接"
                ><template #default="{ row }">
                  {{ row['navigation-timing'] && row['navigation-timing'].textValue.initialConnection ? row['navigation-timing'].textValue.initialConnection : 0 }}
                </template></el-table-column
              >
              <el-table-column label="SSL 建连"
                ><template #default="{ row }">
                  {{ row['navigation-timing'] && row['navigation-timing'].textValue.ssl ? row['navigation-timing'].textValue.ssl : 0 }}
                </template></el-table-column
              >
              <el-table-column label="TTFB 请求响应"
                ><template #default="{ row }">
                  {{ row['navigation-timing'] && row['navigation-timing'].textValue.ttfb ? row['navigation-timing'].textValue.ttfb : 0 }}
                </template></el-table-column
              >

              <el-table-column label="TRANS 内容传输"
                ><template #default="{ row }">
                  {{ row['navigation-timing'] && row['navigation-timing'].textValue.contentDownload ? row['navigation-timing'].textValue.contentDownload : 0 }}
                </template></el-table-column
              >

              <el-table-column label="DOM 解析"
                ><template #default="{ row }">
                  {{ row['navigation-timing'] && row['navigation-timing'].textValue.domParse ? row['navigation-timing'].textValue.domParse : 0 }}
                </template></el-table-column
              >
              <el-table-column label="RES 资源加载">
                <template #default="{ row }">
                  {{ row['navigation-timing'] && row['navigation-timing'].textValue.resourceLoad ? row['navigation-timing'].textValue.resourceLoad : 0 }}
                </template></el-table-column
              >
            </el-table-column>
            <el-table-column label="性能关键指标" align="center">
              <el-table-column label="白屏时间">
                <template #default="{ row }">
                  {{ row['first-paint'] && row['first-paint'].value ? row['first-paint'].value : '-' }}
                </template></el-table-column
              >
              <el-table-column label="FCP 灰屏时间"
                ><template #default="{ row }">
                  {{ row['first-contentful-paint'] && row['first-contentful-paint'].value ? row['first-contentful-paint'].value : '-' }}
                </template></el-table-column
              >
              <el-table-column label="DOM完成加载">
                <template #default="{ row }">
                  {{ row['navigation-timing'] && row['navigation-timing'].textValue.domReady ? row['navigation-timing'].textValue.domReady : 0 }}
                </template></el-table-column
              >
              <el-table-column label="页面完全加载">
                <template #default="{ row }">
                  {{ row['navigation-timing'] && row['navigation-timing'].textValue.pageLoad ? row['navigation-timing'].textValue.pageLoad : 0 }}
                </template></el-table-column
              >
            </el-table-column>
          </el-table-column>
          <el-table-column label="性能图表" fixed="right" align="center">
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">
                <el-icon style="vertical-align: middle">
                  <Histogram />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-table border :data="tableData" v-if="project.projectType == 2">
          <el-table-column prop="simpleUrl" label="url" align="center" />
          <el-table-column label="小程序启动耗时" align="center">
            <template #default="{ row }">
              {{ row.textValue.appLaunchduration ? `${row.textValue.appLaunchduration}ms` : "-" }}
            </template>
          </el-table-column>
          <el-table-column prop="textValue.routeduration" label="路由耗时" align="center">
            <template #default="{ row }">
              {{ row.textValue.routeduration ? `${row.textValue.routeduration}ms` : "-" }}
            </template>
          </el-table-column>
          <el-table-column label="页面渲染" align="center">
            <template #default="{ row }">
              {{ row.textValue.firstRenderviewLayerReadyTime ? `${row.textValue.firstRenderviewLayerRenderEndTime -  row.textValue.firstRenderviewLayerReadyTime}ms` : '-' }}
              </template>
          </el-table-column>
          <el-table-column prop="textValue.evaluateScriptduration" label="js注入耗时" align="center">
            <template #default="{ row }">
              {{ row.textValue.evaluateScriptduration ? `${row.textValue.evaluateScriptduration}ms` : "-" }}
            </template>
          </el-table-column>
          <el-table-column prop="textValue.downloadPackageduration" label="代码包下载耗时" align="center">
            <template #default="{ row }">
              {{ row.textValue.downloadPackageduration ? `${row.textValue.downloadPackageduration}ms` : "-" }}
            </template>
          </el-table-column>
          
          <el-table-column label="性能图表" fixed="right" align="center">
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">
                <el-icon style="vertical-align: middle">
                  <Histogram />
                </el-icon>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
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
    </el-card>
  </div>
  <PerfDetail v-if="perfNode.simpleUrl" :project="project" :perfNode="perfNode" />
</template>

<script lang="ts">
import PerfDetail from "./components/perfDetail.vue";
import { nextTick, onMounted, ref } from "vue";
import { timeQuantum } from "@/utils/index";
import { performanceList } from "@/api/performance/index";
import {
  Search,
  Refresh,
  CirclePlus,
  Delete,
  Download,
  RefreshRight,
} from "@element-plus/icons-vue";
import { type PerformanceListData } from "@/api/performance/types/performance";
import { usePagination } from "@/hooks/usePagination";
export default {
  name: "Performance",
  components: {
    PerfDetail,
  },
  setup() {
    const loading = ref<boolean>(false);
    const searchData = ref({
      simpleUrl: "",
      data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
    });
    const perfNode = ref<any>({});
    const tableData = ref<PerformanceListData[]>([]);
    const project = ref<any>({})

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        handleSearch();
      });

    onMounted(() => {
      handleSearch();
    });

    const handleSearch = async () => {
      let param = {
        simpleUrl: searchData.value.simpleUrl,
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      let res = await performanceList(param);
      if (res.success) {
        paginationData.total = res.model.count;
        tableData.value = res.model.list;
        project.value = res.model.project
      }
    };
    const resetSearch = () => {
      searchData.value = {
        simpleUrl: "",
        data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
      };
      paginationData.currentPage = 1
      handleSearch();
    };

    /**
     * @description: 查看性能详情
     * @param {*} row
     * @return {*}
     */
    const handleDetail = (row: any) => {
      perfNode.value = {};
      nextTick(() => (perfNode.value = row));
    };

    return {
      loading,
      searchData,
      resetSearch,
      handleSearch,
      Search,
      Refresh,
      CirclePlus,
      RefreshRight,
      Delete,
      Download,
      tableData,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
      handleDetail,
      perfNode,
      project
    };
  },
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  display: flex;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
