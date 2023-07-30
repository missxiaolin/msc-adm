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
        <el-form-item
          prop="password"
          label="密码"
        >
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
  ElMessage,
  ElMessageBox,
} from "element-plus";
import {
  Search,
  Refresh,
  CirclePlus,
  Delete,
  Download,
  RefreshRight,
} from "@element-plus/icons-vue";
export default {
  name: "ElementPlus",
  setup() {
    const loading = ref<boolean>(false);
    const searchData = reactive({
      username: "",
      phone: "",
    });
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
        console.log('handleCreate')
        dialogVisible.value = false
    }

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
      formData
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
