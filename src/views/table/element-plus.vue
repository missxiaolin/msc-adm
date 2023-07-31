<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="username" label="用户名">
          <el-input v-model="searchData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="searchData.phone" placeholder="请输入" />
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
      <div class="toolbar-wrapper">
        <div>
          <el-button
            type="primary"
            :icon="CirclePlus"
            @click="dialogVisible = true"
            >新增用户</el-button
          >
          <el-button type="danger" :icon="Delete">批量删除</el-button>
        </div>
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button
              type="primary"
              :icon="RefreshRight"
              circle
              @click="getTableData"
            />
          </el-tooltip>
        </div>
      </div>
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
              <el-button
                type="primary"
                text
                bg
                size="small"
                @click="handleUpdate(scope.row)"
                >修改</el-button
              >
              <el-button
                type="danger"
                text
                bg
                size="small"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
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
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      title="用户"
      @close="resetForm"
      width="30%"
    >
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
        label-position="left"
      >
        <el-form-item prop="username" label="用户名">
          <el-input v-model="formData.username" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="formData.password" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import {
  type FormInstance,
  type FormRules,
  // ElMessage,
  // ElMessageBox,
} from "element-plus";
import {
  Search,
  Refresh,
  CirclePlus,
  Delete,
  Download,
  RefreshRight,
} from "@element-plus/icons-vue";
import { type GetTableData } from "@/api/table/types/table";
import { usePagination } from "@/hooks/usePagination"
export default {
  name: "ElementPlus",
  setup() {
    const loading = ref<boolean>(false);
    const searchData = reactive({
      username: "",
      phone: "",
    });
    const tableData = ref<GetTableData[]>([]);
    const searchFormRef = ref<FormInstance | null>(null);
    //#region 增
    const dialogVisible = ref<boolean>(false);
    const formData = reactive({
      username: "",
      password: "",
    });
    const formRules: FormRules = reactive({
      username: [{ required: true, trigger: "blur", message: "请输入用户名" }],
      password: [{ required: true, trigger: "blur", message: "请输入密码" }],
    });
    const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

    const handleSearch = () => {
      console.log("handleSearch");
    };
    const resetSearch = () => {
      searchFormRef.value?.resetFields();
      handleSearch();
    };

    const getTableData = () => {
      console.log(getTableData);
    };

    const resetForm = () => {
      formData.username = "";
      formData.password = "";
    };

    const handleCreate = () => {
      console.log("handleCreate");
      dialogVisible.value = false;
    };

    tableData.value = [
      {
        createTime: "2021-01-01",
        email: "462441355@qq.com",
        id: "1",
        phone: "171***1105",
        roles: "admin",
        status: true,
        username: "xiaolin",
      },
    ];

    const handleUpdate = (row: GetTableData) => {
      formData.username = row.username;
      dialogVisible.value = true;
    };
    const handleDelete = (row: GetTableData) => {
      console.log(row);
    };

    return {
      loading,
      searchData,
      resetSearch,
      handleSearch,
      Search,
      Refresh,
      CirclePlus,
      dialogVisible,
      RefreshRight,
      getTableData,
      Delete,
      Download,
      resetForm,
      formRules,
      handleCreate,
      formData,
      tableData,
      handleUpdate,
      handleDelete,
      paginationData,
      handleCurrentChange,
      handleSizeChange
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
