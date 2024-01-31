<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="version" label="页面URL">
          <el-input
            v-model="searchData.simpleUrl"
            placeholder="请输入页面链接"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initQuery">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt20">
      <div class="table-wrapper">
        <el-table border :data="data.tableData">
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="uuId" label="用户ID" align="center" />
          <el-table-column prop="simpleUrl" label="页面链接" align="center" />
          <el-table-column prop="error_desc" label="错误类型" align="center" />
          <el-table-column prop="happenTime" label="上报时间" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button type="text"> 查看视频 </el-button>
              <el-button type="text" @click="goUserTrajectory(row)"> 用户行为轨迹 </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper mt20 justify-end">
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
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { usePagination } from "@/hooks/usePagination";
import { recordscreenList } from "@/api/recordscreen/index";



export default {
  setup() {
    const { proxy }: any = getCurrentInstance();
    const searchData = ref({
      simpleUrl: "",
    });

    let data = reactive({
      tableData: <any>[],
    });

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        initQuery();
      });

    const initQuery = async () => {
      let param = {
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
        ...searchData.value,
      };
      let res = await recordscreenList(param);
      if (!res.success) {
        return;
      }
      paginationData.total = res.model.count;
      data.tableData = res.model.list;
    };

    const resetSearch = () => {
      searchData.value = {
        simpleUrl: "",
      };
    };

    const goUserTrajectory = (row: any) => {
        proxy.$router.push({
            path: `/user/behavior`,
            query: {
                uuId: row.uuId
            }
        })
    }

    onMounted(() => {
      initQuery();
    });

    return {
      searchData,
      initQuery,
      resetSearch,
      data,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
      goUserTrajectory
    };
  },
};
</script>
