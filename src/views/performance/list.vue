<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="pageUrl" label="页面链接">
          <el-input v-model="searchData.pageUrl" placeholder="请输入" />
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
          <el-button type="primary" :icon="Search" @click="handleSearch"
            >查询</el-button
          >
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="table-wrapper">
        <el-table border :data="tableData">
          <el-table-column prop="monitorAppId" label="项目ID" align="center" />
          <el-table-column prop="pageUrl" label="url" align="center" />
          <el-table-column label="会话性能指标" align="center">
            <el-table-column label="Navigation 指标" align="center">
              <el-table-column label="DNS 查询"
                ><template #default="{ row }">
                  {{ ntFormat(row, "DNS") }}
                </template></el-table-column
              >
              <el-table-column label="TCP 链接"
                ><template #default="{ row }">
                  {{ ntFormat(row, "TCP") }}
                </template></el-table-column
              >
              <el-table-column label="SSL 建连"
                ><template #default="{ row }">
                  {{ ntFormat(row, "SSL") }}
                </template></el-table-column
              >
              <el-table-column label="TTFB 请求响应"
                ><template #default="{ row }">
                  {{ ntFormat(row, "TTFB") }}
                </template></el-table-column
              >

              <el-table-column label="TRANS 内容传输"
                ><template #default="{ row }">
                  {{ ntFormat(row, "Trans") }}
                </template></el-table-column
              >

              <el-table-column label="DOM 解析"
                ><template #default="{ row }">
                  {{ ntFormat(row, "DomParse") }}
                </template></el-table-column
              >
              <el-table-column label="RES 资源加载">
                <template #default="{ row }">
                  {{ ntFormat(row, "Res") }}
                </template></el-table-column
              >
            </el-table-column>
            <el-table-column label="性能关键指标" align="center">
              <el-table-column label="白屏时间">
                <template #default="{ row }">
                  {{ ntFormat(row, "FP") }}
                </template></el-table-column
              >
              <el-table-column label="FCP 灰屏时间"
                ><template #default="{ row }">
                  {{ ntFormat(row, "FPC") }}
                </template></el-table-column
              >
              <el-table-column label="FirseByte 首字节">
                <template #default="{ row }">
                  {{ ntFormat(row, "FirseByte") }}
                </template></el-table-column
              >
              <!-- <el-table-column label=" TTI 可交互时间"
                ><template #default="{ row }">
                  {{ ntFormat(row, "TTI") }}
                </template></el-table-column
              > -->
              <el-table-column label="DOMReady"
                ><template #default="{ row }">
                  {{ ntFormat(row, "DomReady") }}
                </template></el-table-column
              >

              <el-table-column label="LOAD 加载完成"
                ><template #default="{ row }">
                  {{ ntFormat(row, "Load") }}
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
  <PerfDetail v-if="perfNode.simpleUrl" :perfNode="perfNode" />
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
      pageUrl: "",
      data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
    });
    const perfNode = ref({});
    const tableData = ref<PerformanceListData[]>([]);

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        handleSearch();
      });

    onMounted(() => {
      handleSearch();
    });

    const handleSearch = async () => {
      let param = {
        pageUrl: searchData.value.pageUrl,
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      let res = await performanceList(param);
      if (res.success) {
        paginationData.total = res.model.count;
        tableData.value = res.model.list;
      }
    };
    const resetSearch = () => {
      searchData.value = {
        pageUrl: "",
        data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
      };
      paginationData.currentPage = 1
      handleSearch();
    };

    const ntFormat = (row: any, label: string) => {
      // 默认去NT里时间
      let time = (row.nt && row.nt[label]) || 0;
      const fp = row.fp; // 白屏时间
      const fpc = row.fpc; //灰屏时间
      if (label == "fp" && fp) {
        time = fp.startTime;
      }
      if (label == "fpc" && fpc) {
        time = fpc.startTime;
      }
      return !row.nt && !time ? "-" : time.toFixed(2) + "ms";
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
      ntFormat,
      handleDetail,
      perfNode,
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
