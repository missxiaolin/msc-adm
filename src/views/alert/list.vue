<template>
  <div class="app-container">
    <div class="flex">
      <el-button type="primary" @click="data.isShowPorjectPop = true"
        >新增告警</el-button
      >
    </div>
    <!-- 表格 -->
    <el-card class="mt20">
      <div class="table-wrapper">
        <el-table border :data="data.tableData">
          <el-table-column prop="name" label="项目名称" align="center" />
          <el-table-column prop="error_type" label="错误类型" align="center" />
          <el-table-column prop="error_name" label="错误名称" align="center" />
          <el-table-column
            prop="time_range_s"
            label="报警时间范围"
            align="center"
          />
          <el-table-column
            prop="max_error_count"
            label="报警错误阈值"
            align="center"
          />
          <el-table-column
            prop="alarm_interval_s"
            label="报警时间间隔"
            align="center"
          />
          <el-table-column label="是否开启" align="center">
            <template #default="{ row }">
              {{ row.is_enable == 0 ? "禁用" : "开启" }}
            </template>
          </el-table-column>
          <el-table-column label="告警时间段" align="center">
            <template #default="{ row }">
              {{ `${row.startHour}-${row.endHour}` }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button type="text" @click="showHandleDetail(row)">
                修改
              </el-button>
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
    <!-- 告警新增修改 -->
    <el-dialog
      v-model="data.isShowPorjectPop"
      title="告警设置"
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
          <el-form-item label="项目" prop="project_id">
            <el-select v-model="ruleForm.project_id">
              <el-option
                v-for="item in data.projects"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="错误类型" prop="error_type">
            <el-select v-model="ruleForm.error_type">
              <el-option
                v-for="(item, index) in data.errorTypeOption"
                :key="index"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="错误名称" prop="error_name">
            <el-input v-model="ruleForm.error_name" />
          </el-form-item>
          <el-form-item label="报警时间范围" prop="time_range_s">
            <el-input-number
              v-model="ruleForm.time_range_s"
              :min="1"
              :max="86400"
            />
            <el-tooltip
              class="box-item"
              effect="dark"
              content="时间单位m"
              placement="bottom-start"
            >
              <el-icon style="margin-left: 20px"><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="报警错误阈值" prop="max_error_count">
            <el-input-number
              v-model="ruleForm.max_error_count"
              :min="1"
              :max="100"
            />
            <el-tooltip
              class="box-item"
              effect="dark"
              content="表示在多少m内出现相同的错误多少次触发"
              placement="bottom-start"
            >
              <el-icon style="margin-left: 20px"><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="报警时间间隔" prop="alarm_interval_s">
            <el-input-number
              v-model="ruleForm.alarm_interval_s"
              :min="1"
              :max="60"
            />
            <el-tooltip
              class="box-item"
              effect="dark"
              content="报警后如果未恢复正常，间隔多久重新触发一次告警（最低60s）"
              placement="bottom-start"
            >
              <el-icon style="margin-left: 20px"><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="是否使用" prop="is_enable">
            <el-radio-group v-model="ruleForm.is_enable">
              <el-radio :label="1">使用</el-radio>
              <el-radio :label="0">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="配置说明" prop="note">
            <el-input v-model="ruleForm.note" />
          </el-form-item>
          <el-form-item label="发送时间段" required>
            <el-form-item prop="startHour">
              <el-time-picker
                value-format="HH:mm:ss"
                v-model="ruleForm.startHour"
                placeholder="发送开始时间"
                style="width: 100%"
              />
            </el-form-item>
            <span style="padding: 0 10px 0 10px">-</span>
            <el-form-item prop="endHour">
              <el-time-picker
                value-format="HH:mm:ss"
                v-model="ruleForm.endHour"
                placeholder="发送结束时间"
                style="width: 100%"
              />
            </el-form-item>
          </el-form-item>
          <el-form-item label="告警方式" prop="alertType">
            <el-checkbox-group v-model="ruleForm.alertType">
              <el-checkbox :label="1">钉钉</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              {{ ruleForm.id && ruleForm.id != 0 ? "修改" : "添加" }}
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from "vue";
import { projectAllList } from "@/api/project/index";
import { alertSave, alertList } from "@/api/alert/index";
import { usePagination } from "@/hooks/usePagination";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

interface RuleForm {
  id: number;
  project_id: number | string; // 项目ID
  error_type: string; // 错误类型
  error_name: string; // 错误名称
  time_range_s: number | string; // 报警时间范围
  max_error_count: number | string; // 报警错误阈值
  alarm_interval_s: number | string; // 报警时间间隔
  is_enable: number; // 是否开启本条报警配置1：是0：否
  note: string; // 配置说明
  startHour: string; // 告警时间点
  endHour: string; // 告警时间点
  alertType: number[] // 告警方式
}

export default {
  setup() {
    let data = reactive({
      isShowPorjectPop: false,
      projects: <any>[],
      errorTypeOption: [
        {
          name: "JS告警",
          value: "JS_ERROR",
        },
        {
          name: "网络请求告警",
          value: "HTTP_LOG",
        },
        {
          name: "页面PV告警",
          value: "PAGE_PV",
        },
        {
          name: "页面UV告警",
          value: "PAGE_UV",
        },
        {
          name: "资源告警",
          value: "RESOURCE_ERROR",
        },
        {
          name: "PROMISE告警",
          value: "PROMISE_ERROR",
        },
      ],
      tableData: <any>[],
    });

    const ruleFormRef = ref<FormInstance>();
    const ruleForm: any = reactive<RuleForm>({
      id: 0,
      project_id: "",
      error_type: "",
      error_name: "",
      time_range_s: "",
      max_error_count: "",
      alarm_interval_s: "",
      is_enable: 1,
      note: "",
      startHour: "",
      endHour: "",
      alertType: []
    });
    const rules = reactive<FormRules<RuleForm>>({
      project_id: [
        {
          required: true,
          message: "请选择项目ID",
          trigger: "blur",
        },
      ],
      error_type: [
        {
          required: true,
          message: "请选择错误类型",
          trigger: "blur",
        },
      ],
      error_name: [
        {
          required: true,
          message: "请输入错误名称",
          trigger: "blur",
        },
      ],
      time_range_s: [
        {
          required: true,
          message: "请输入报警时间范围",
          trigger: "blur",
        },
      ],
      max_error_count: [
        {
          required: true,
          message: "请输入报警阈值",
          trigger: "blur",
        },
      ],
      alarm_interval_s: [
        {
          required: true,
          message: "请输入报警时间间隔",
          trigger: "blur",
        },
      ],
      startHour: [
        {
          required: true,
          message: "请选择起始时间",
          trigger: "change",
        },
      ],
      endHour: [
        {
          required: true,
          message: "请选择结束时间",
          trigger: "change",
        },
      ],
    });

    const handleClose = () => {
      data.isShowPorjectPop = false;
      ruleForm.id = 0;
      ruleForm.project_id = "";
      ruleForm.error_type = "";
      ruleForm.error_name = "";
      ruleForm.time_range_s = 0;
      ruleForm.max_error_count = 0;
      ruleForm.alarm_interval_s = 0;
      ruleForm.is_enable = 1;
      ruleForm.note = "";
      ruleForm.startHour = "";
      ruleForm.endHour = "";
      ruleForm.alertType = []
    };

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          let param: any = ruleForm;
          let res = await alertSave(param);
          if (res.success) {
            ElMessage({
              message: "保存成功",
              type: "success",
            });
            handleClose();
            handleSearch();
            // 顶部列表更新
          } else {
            ElMessage({
              message: res.errorMessage,
              type: "error",
            });
          }
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    // 获取项目
    const getProject = async () => {
      let res = await projectAllList();
      if (res.success) {
        data.projects = res.model;
      }
    };

    // 分页
    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        handleSearch();
      });

    const handleSearch = async () => {
      const params = {
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      const res = await alertList(params)
      if (!res.success) {
        return;
      }
      data.tableData = res.model.list
      paginationData.total = res.model.count;
    };

    // 修改
    const showHandleDetail = (item: any) => {
      ruleForm.id = item.id;
      ruleForm.project_id = item.project_id;
      ruleForm.error_type = item.error_type;
      ruleForm.error_name = item.error_name;
      ruleForm.time_range_s = item.time_range_s;
      ruleForm.max_error_count = item.max_error_count;
      ruleForm.alarm_interval_s = item.alarm_interval_s;
      ruleForm.is_enable = item.is_enable;
      ruleForm.note = item.note;
      ruleForm.startHour = item.startHour;
      ruleForm.endHour = item.endHour;
      ruleForm.alertType = item.alertType;
      data.isShowPorjectPop = true
    };

    onMounted(() => {
      getProject();
      handleSearch()
    });

    return {
      data,
      handleClose,
      ruleForm,
      rules,
      ruleFormRef,
      submitForm,
      resetForm,
      showHandleDetail,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
    };
  },
};
</script>
