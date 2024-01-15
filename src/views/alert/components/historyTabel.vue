<template>
  <el-dialog
    v-model="data.isShowPorjectPop"
    title="告警历史"
    width="60%"
    :before-close="handleClose"
  >
    <div class="table-wrapper">
      <el-table border :data="data.tableData">
        <el-table-column prop="id" label="ID" align="center" />
        <el-table-column prop="sendContent" label="发送内容" align="center" />
        <el-table-column prop="isSuccess" label="发送结果" align="center">
          <template #default="{ row }">
            {{ row.isSuccess == 0 ? "失败" : "成功" }}
          </template>
        </el-table-column>
        <el-table-column prop="errorMsg" label="错误" align="center" />
        <el-table-column prop="updateTime" label="发送时间" align="center" />
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
  </el-dialog>  
</template>

<script lang="ts">
import { reactive, onMounted } from "vue";
import { usePagination } from "@/hooks/usePagination";
import { aleryHistory } from "@/api/alert/index";

export default {
  props: {
    alarmId: {
      type: [String, Number],
      default: () => {
        return "";
      },
    },
  },
  setup(props, { emit }) {
    let data = reactive({
      isShowPorjectPop: true,
      tableData: <any>[],
    });
    // 分页
    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        handleSearch();
      });
    const { alarmId } = props;

    const handleSearch = async () => {
      let params = {
        alarmId,
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      let res = await aleryHistory(params);
      if (res.success) {
        data.tableData = res.model.list;
        paginationData.total = res.model.count;
      }
    };

    onMounted(() => {
      handleSearch()
    })

    const handleClose = () => {
      emit("handleClose");
    };
    return {
      data,
      handleClose,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
    };
  },
};
</script>
