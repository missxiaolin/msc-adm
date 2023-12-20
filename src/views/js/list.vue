<template>
  <div class="app-container">
    <el-car shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="pageUrl" label="页面链接">
          <el-input v-model="searchData.pageUrl" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="url" label="错误信息">
          <el-input v-model="searchData.errorMsg" placeholder="请输入" />
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
          <el-button type="primary" :icon="Search" @click="initQuery"
            >查询</el-button
          >
          <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-car>

    <!-- 表格 -->
    <el-card shadow="never">
      <div class="table-wrapper">
        <el-table border :data="tableData">
          <el-table-column prop="type" label="错误类型" align="center" />
          <el-table-column prop="errorMsg" label="错误内容" align="center" />
          <el-table-column prop="simpleUrl" label="上报页面" align="center" />
          <el-table-column prop="happenTime" label="上报时间" align="center" />
          <el-table-column prop="uuId" label="上报人" align="center" />
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
import { reactive, onMounted, ref } from "vue";
import { timeQuantum } from "@/utils/index";
import { jsList } from "@/api/js/index";
import { usePagination } from "@/hooks/usePagination";
import { JsListItem } from "@/api/js/types";
export default {
  setup() {
    // 表格
    const tableData = ref<JsListItem[]>([]);
    const searchData = ref({
      pageUrl: "",
      errorMsg: "",
      data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
    });

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        handleSearch();
      });
    const handleSearch = async () => {
      let param = {
        pageUrl: searchData.value.pageUrl,
        errorMsg: searchData.value.errorMsg,
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      let res = await jsList(param);
      if (!res.success) {
        return;
      }
      paginationData.total = res.model.count;
      tableData.value = res.model.list;
    };

    const initQuery = () => {
      handleSearch();
    };

    const resetSearch = () => {
      searchData.value = {
        pageUrl: "",
        errorMsg: "",
        data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
      };
      paginationData.currentPage = 1;
    };

    onMounted(() => {
      initQuery();
    });

    return {
      searchData,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
      tableData,
      resetSearch,
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
