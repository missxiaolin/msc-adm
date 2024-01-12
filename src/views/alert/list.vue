<template>
  <div class="app-container">
    <div class="flex">
      <el-button type="primary" @click="data.isShowPorjectPop = true">新增应用</el-button>
    </div>

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

        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from "vue";
import { projectAllList } from '@/api/project/index'
import type { FormInstance, FormRules } from "element-plus";

interface RuleForm {
  id: number,
  project_id: number | string, // 项目ID
  error_type: string, // 错误类型
  error_name: string, // 错误名称
  time_range_s: number | string, // 报警时间范围
  max_error_count: number | string, // 报警错误阈值
  alarm_interval_s: number | string, // 报警时间间隔
  is_enable: number, // 是否开启本条报警配置1：是0：否
  note: string, // 配置说明
  startHour: string, // 告警时间点
  endHour: string, // 告警时间点
}

export default {
  setup() {
    let data = reactive({
      isShowPorjectPop: true,
      projects: []
    });

    const ruleFormRef = ref<FormInstance>();
    const ruleForm: any = reactive<RuleForm>({
      id: 0,
      project_id: '',
      error_type: '',
      error_name: '',
      time_range_s: '',
      max_error_count: '',
      alarm_interval_s: '',
      is_enable: 1,
      note: '',
      startHour: '',
      endHour: ''
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
          trigger: "blur",
        }
      ],
      endHour: [
        {
          required: true,
          message: "请选择结束时间",
          trigger: "blur",
        }
      ]
    })

    const handleClose = () => {
      data.isShowPorjectPop = false;
      ruleForm.id = 0
      ruleForm.project_id = ''
      ruleForm.error_type = ''
      ruleForm.error_name = ''
      ruleForm.time_range_s = 0
      ruleForm.max_error_count = 0
      ruleForm.alarm_interval_s = 0
      ruleForm.is_enable = 1
      ruleForm.note = ''
      ruleForm.startHour = ''
      ruleForm.endHour = ''
    };

    // 获取项目
    const getProject = async () => {
      let res = await projectAllList()
      if (res.success) {
        data.projects = res.model
      }
    }

    onMounted(() => {
      getProject()
    })

    return {
      data,
      handleClose,
      ruleForm,
      rules,
      ruleFormRef
    };
  },
};
</script>
