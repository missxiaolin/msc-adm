<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="pageUrl" label="页面链接">
          <el-input v-model="searchData.pageUrl" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="resourceType" label="资源类型">
          <el-select v-model="searchData.resourceType" placeholder="请选择">
            <el-option
              v-for="item in resourceTypes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="url" label="资源链接">
          <el-input v-model="searchData.url" placeholder="请输入" />
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
          <el-button type="primary" :icon="Search" @click="init"
            >查询</el-button
          >
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-if="echartsOptions.seriesName" shadow="always" class="mt20 mb20">
        <ResHoursEchart :echartsOptions="echartsOptions"></ResHoursEchart>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column
            prop="resourceType"
            label="错误类型"
            align="center"
          />
          <el-table-column prop="errorMsg" label="错误信息" align="center" />
          <el-table-column prop="html" label="HTML内容" align="center" />
          <el-table-column prop="pageUrl" label="上报页面" align="center" />
          <el-table-column prop="happenTime" label="上报时间" align="center" />
          <el-table-column label="操作" fixed="right" align="center">
            <template #default="{ row }">
              <el-button type="text" @click="handleDetail(row)">
                查看详情
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
</template>

<script lang="ts">
import ResHoursEchart from './components/resHoursEchart.vue'
import { nextTick, onMounted, ref } from "vue";
import { timeQuantum } from "@/utils/index";
import { resourceList, resourceHour } from "@/api/resource/index";
import {
  Search,
  Refresh,
  CirclePlus,
  Delete,
  Download,
  RefreshRight,
} from "@element-plus/icons-vue";
import { type ResourceResponseData } from "@/api/resource/types/resource";
import { usePagination } from "@/hooks/usePagination";
export default {
  name: "Resource",
  components: {
    ResHoursEchart
  },
  setup() {
    const loading = ref<boolean>(false);
    const echartsOptions = ref({})
    const resourceTypes = ref([
      {
        value: "IMG",
        label: "IMG",
      },
      {
        value: "LINK",
        label: "LINK",
      },
      {
        value: "SCRIPT",
        label: "SCRIPT",
      },
    ]);
    const searchData = ref({
      pageUrl: "",
      url: "",
      resourceType: "",
      data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
    });
    const perfNode = ref({});
    const tableData = ref<ResourceResponseData[]>([]);

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        handleSearch();
      });

    onMounted(() => {
      handleSearch();
      handleTb();
    });

    const init = async () => {
      handleSearch();
      handleTb();
    };

    const handleSearch = async () => {
      let param = {
        url: searchData.value.url,
        pageUrl: searchData.value.pageUrl,
        resourceType: searchData.value.resourceType,
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      let res = await resourceList(param);
      if (res.success) {
        paginationData.total = res.model.count;
        tableData.value = res.model.list;
      }
    };

    const handleTb = async () => {
      let param = {
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
      };
      let res = await resourceHour(param);
      if (res.success) {
        echartsOptions.value = res.model
      }
    };
    const resetSearch = () => {
      searchData.value = {
        pageUrl: "",
        url: "",
        resourceType: "",
        data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
      };
      handleSearch();
      handleTb();
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
      resourceTypes,
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
      init,
      echartsOptions
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
