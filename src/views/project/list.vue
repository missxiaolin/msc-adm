<template>
  <div class="app-container">
    <el-card class="mt20">
      <div class="table-wrapper">
        <el-table border :data="data.tableData">
          <el-table-column prop="name" label="应用名称" align="center" />
          <el-table-column prop="desc" label="应用说明" align="desc" />
          <el-table-column
            prop="monitorAppId"
            label="项目Id"
            align="monitorAppId"
          />
          <el-table-column
            prop="logPeriod"
            label="上报间隔"
            align="logPeriod"
          />
          <el-table-column
            prop="startTime"
            label="上报创建时间"
            align="logPeriod"
          />
        </el-table>
      </div>
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
    </el-card>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { usePagination } from '@/hooks/usePagination';
export default {
  setup() {
    let data = reactive({
      tableData: <any>[],
    });

    const handleSearch = () => {

    }

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        handleSearch();
      });

    return {
      data,
      paginationData,
      handleCurrentChange,
      handleSizeChange
    };
  },
};
</script>

<style lang="scss" scoped></style>
