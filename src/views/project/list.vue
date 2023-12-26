<template>
  <div class="app-container">
    <div class="flex">
      <el-button type="primary" @click="data.isShowPorjectPop = true"
        >新增应用</el-button
      >
    </div>
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
    <el-dialog
      v-model="data.isShowPorjectPop"
      title="应用"
      width="60%"
      :before-close="handleClose"
    >
      <div class="flex">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          :size="'default'"
          status-icon
          class="pop-form"
        >
          <el-form-item label="应用ID" prop="monitorAppId">
            <el-input v-model="ruleForm.monitorAppId" />
          </el-form-item>
          <el-form-item label="应用类型" prop="projectType">
            <el-select v-model="ruleForm.projectType">
              <el-option
                v-for="item in data.projectTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="应用名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="应用说明" prop="desc">
            <el-input v-model="ruleForm.desc" />
          </el-form-item>
          <el-form-item label="上报条数" prop="maxQueues">
            <el-input-number v-model="ruleForm.maxQueues" :min="1" :max="20" />
          </el-form-item>
          <el-form-item label="应用间隔" prop="delay">
            <el-input v-model="ruleForm.delay">
              <template #append>ms</template>
            </el-input>
          </el-form-item>
          <el-form-item label="是否加密" prop="encryption">
            <el-radio-group v-model="ruleForm.encryption" :disabled="true">
              <el-radio :label="1">加密</el-radio>
              <el-radio :label="0">不加密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="监听配置" prop="watch">
            <el-checkbox-group v-model="ruleForm.watch">
              <el-checkbox
                :label="item.value"
                v-for="(item, index) in data.watchList"
                :key="index"
                :disabled="item.disabled || false"
              >
                {{ item.label }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              {{ ruleForm.id && ruleForm.id != 0 ? "修改" : "添加" }}
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
        <div class="copy-code-area">
          <h4>复制探针</h4>
          <div class="code">
            <el-icon class="copy-btn" size="22"><CopyDocument /></el-icon>
            {{ probeCode }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { usePagination } from "@/hooks/usePagination";
import type { FormInstance, FormRules } from "element-plus";

interface RuleForm {
  id?: number;
  name: string;
  desc: string;
  monitorAppId: string;
  projectType: number;
  delay: number;
  encryption: number;
  watch?: string[];
  maxQueues: number;
}

export default {
  setup() {
    let data = reactive({
      isShowPorjectPop: false, // 弹窗
      tableData: <any>[],
      watchList: [
        {
          label: "PV",
          value: "pageChange",
          disabled: true,
        },
        {
          label: "JS错误",
          value: "jsError",
        },
        {
          label: "Vue错误",
          value: "vueError",
        },
        {
          label: "异步错误",
          value: "promise",
        },
        {
          label: "资源错误",
          value: "resource",
        },
        {
          label: "Fetch请求",
          value: "fetch",
        },
        {
          label: "Xhr请求",
          value: "xhr",
        },
        {
          label: "性能监控",
          value: "performance",
        },
        {
          label: "点击行为监控",
          value: "click",
        },
        {
          label: "白屏监控",
          value: "whiteScreen",
        },
        {
          label: "错误录屏上报",
          value: "recordScreen",
        },
      ],

      projectTypeOptions: [
        {
          value: 1,
          label: "web",
        },
      ],
    });
    const ruleFormRef = ref<FormInstance>();
    const ruleForm = reactive<RuleForm>({
      id: 0,
      name: "",
      desc: "",
      monitorAppId: "",
      projectType: 1,
      delay: 30,
      encryption: 0,
      watch: <any>["pageChange"],
      maxQueues: 1,
    });
    const rules = reactive<FormRules<RuleForm>>({
      monitorAppId: [
        {
          required: true,
          message: "请输入应用ID",
          trigger: "blur",
        },
      ],
      name: [
        {
          required: true,
          message: "请输入应用名称",
          trigger: "blur",
        },
      ],
      desc: [
        {
          required: true,
          message: "请输入应用说明",
          trigger: "blur",
        },
      ],
    });
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log("submit!", ruleForm);
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const handleSearch = () => {};

    // 关闭弹窗
    const handleClose = () => {
      data.isShowPorjectPop = false;
    };

    // 分页
    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        handleSearch();
      });

    return {
      data,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
      handleClose,
      ruleFormRef,
      ruleForm,
      rules,
      submitForm,
      resetForm,
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
.pop-form {
  :deep(.el-checkbox-group) {
    display: flex;
    flex-wrap: wrap;
  }
}
.copy-code-area {
  width: 90%;
  margin-left: 20px;
  position: relative;
  h4 {
    line-height: 34px;
    font-weight: bold;
  }
  .code {
    position: relative;
    .copy-btn {
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
    }
    width: 100%;
    max-height: calc(100vh - 420px);
    background: rgb(246, 247, 251);
    color: rgb(29, 33, 41);
    padding: 23px;
    border-radius: 4px;
    white-space: pre-wrap;
    word-wrap: break-word;
    word-break: break-all;
    font-family: monospace, monospace;
    font-size: 1em;
  }
}
</style>
