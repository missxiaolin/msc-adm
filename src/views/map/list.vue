<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="version" label="版本号">
          <el-input v-model="searchData.version" placeholder="请输入版本号" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initQuery">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="flex">
      <el-button type="primary" @click="data.isShowMapPop = true"
        >上传Sourcemap</el-button
      >
    </div>
    <el-card class="mt20">
      <div class="table-wrapper">
        <el-table border :data="data.tableData">
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="fileName" label="文件名" align="center" />
          <el-table-column prop="version" label="版本号" align="center" />
          <el-table-column prop="updateTime" label="上传时间" align="center" />
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
    <el-dialog
      v-model="data.isShowMapPop"
      title="上传Sourcemap"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="120px"
        :size="'default'"
        status-icon
        class="pop-form"
      >
        <el-form-item label="版本号" prop="version">
          <el-input v-model="ruleForm.version" />
        </el-form-item>
        <el-form-item label="文件">
          <el-upload
            ref="uploadRef"
            class="upload-demo"
            :file-list="data.attFilesList"
            :headers="data.headers"
            :data="ruleForm"
            :action="data.actionUrl"
            :auto-upload="false"
            :on-success="successFile"
            accept=".map"
          >
            <template #trigger>
              <el-button type="primary">选择map文件</el-button>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            保存
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue";
import { usePagination } from "@/hooks/usePagination";
import type { FormInstance, FormRules, UploadInstance } from "element-plus";
import { getCookie, getToken } from "@/utils/cache/cookies";
import { baseURL } from "@/utils/service";

interface RuleForm {
  version: "";
}

export default {
  setup() {
    const searchData = ref({
      version: "",
    });
    let data = reactive({
      isShowMapPop: false, // 弹窗
      attFilesList: <any>[],
      tableData: <any>[],
      actionUrl: `${baseURL}/adm/sourcemap/save`,
      headers: {
        Authorization: getToken() ? `${getToken()}` : undefined,
        MonitorAppId: getCookie("PROJECT_ID")
      },
    });

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        initQuery();
      });
    const initQuery = () => {};
    const resetSearch = () => {
      searchData.value = {
        version: "",
      };
      paginationData.currentPage = 1;
    };

    const handleClose = () => {
      data.isShowMapPop = false;
    };

    const uploadRef = ref<UploadInstance>();
    const ruleFormRef = ref<FormInstance>();
    const ruleForm: any = reactive<RuleForm>({
      version: "",
    });
    const rules = reactive<FormRules<RuleForm>>({
      version: [
        {
          required: true,
          message: "请输入版本号",
          trigger: "blur",
        },
      ],
    });

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate(async (valid, fields) => {
        if (valid) {
            uploadRef.value!.submit()
        } else {
          console.log("error submit!", fields);
        }
      });
    };
    // 上传成功回调
    const successFile = async (res: any) => {
        console.log(res)
        if (!res.success) {
            return
        }
        data.attFilesList = []
        ruleForm.version = ""
        data.isShowMapPop = false;
    }
    return {
      searchData,
      data,
      initQuery,
      resetSearch,
      handleCurrentChange,
      handleSizeChange,
      paginationData,
      handleClose,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      uploadRef,
      successFile
    };
  },
};
</script>

<style lang="scss" scoped>
.search-wrapper {
  :deep(.el-form-item) {
    margin-bottom: 0;
  }
}
</style>
