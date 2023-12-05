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
        <el-table :data="tableData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="username" label="用户名" align="center" />
          <el-table-column prop="roles" label="角色" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.roles === 'admin'" effect="plain"
                >admin</el-tag
              >
              <el-tag v-else type="warning" effect="plain">{{
                scope.row.roles
              }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="phone" label="手机号" align="center" />
          <el-table-column prop="email" label="邮箱" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.status" type="success" effect="plain"
                >启用</el-tag
              >
              <el-tag v-else type="danger" effect="plain">禁用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column
            fixed="right"
            label="操作"
            width="150"
            align="center"
          >
            <template #default="scope">
              <el-button type="primary" text bg size="small">修改</el-button>
              <el-button type="danger" text bg size="small">删除</el-button>
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
import { onMounted, ref } from "vue";
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
  name: "ElementPlus",
  setup() {
    const loading = ref<boolean>(false);
    const searchData = ref({
      pageUrl: "",
      data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
    });
    const tableData = ref<PerformanceListData[]>([]);
    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination();

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
        tableData.value = res.model.list
      }
    };
    const resetSearch = () => {
      searchData.value = {
        pageUrl: "",
        data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
      };
      handleSearch();
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
