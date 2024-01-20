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
          <el-table-column prop="errorType" label="错误类型" align="center" />
          <el-table-column prop="errorName" label="错误名称" align="center" />
          <el-table-column
            prop="timeRangeS"
            label="报警时间范围"
            align="center"
          />
          <el-table-column
            prop="maxErrorCount"
            label="报警错误阈值"
            align="center"
          />
          <el-table-column
            prop="alarmIntervalS"
            label="报警时间间隔"
            align="center"
          />
          <el-table-column label="是否开启" align="center">
            <template #default="{ row }">
              {{ row.isEnable == 0 ? "禁用" : "开启" }}
            </template>
          </el-table-column>
          <el-table-column label="告警时间段" align="center">
            <template #default="{ row }">
              {{ `${row.startHour}-${row.endHour}` }}
            </template>
          </el-table-column>
          <el-table-column
            prop="updateTime"
            label="修改时间"
            align="center"
          />
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button type="text" @click="showHandleDetail(row)">
                修改
              </el-button>
              <el-button type="text" @click="clickHistory(row)">
                查看历史告警记录
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
          <el-form-item label="错误类型" prop="errorType">
            <el-select v-model="ruleForm.errorType" @change="errorTypeChange">
              <el-option
                v-for="(item, index) in data.errorTypeOption"
                :key="index"
                :label="item.name"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="错误名称" prop="errorName">
            <el-input v-model="ruleForm.errorName" />
          </el-form-item>
          <el-form-item label="规则" required>
            <span>最近N秒内：</span>
            <el-form-item prop="timeRangeS">
              <el-input style="width: 120px" v-model="ruleForm.timeRangeS">
              </el-input>
            </el-form-item>
            <el-form-item prop="whereType" style="margin: 0 0 0 5px">
              <el-select
                v-model="ruleForm.whereType"
                style="margin-right: 5px; width: 140px"
              >
                <el-option
                  v-for="(item, index) in data.whereTypeOption"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <!-- <span >持续</span> -->
            <el-form-item prop="serviceType">
              <el-select
                v-model="ruleForm.serviceType"
                style="margin-right: 5px; width: 140px"
              >
                <el-option
                  v-for="(item, index) in data.serviceType"
                  :key="index"
                  :label="item.name"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="maxErrorCount">
              <el-input style="width: 120px" v-model="ruleForm.maxErrorCount">
              </el-input>
            </el-form-item>
            <span style="margin: 0 5px 0 5px">次</span>
          </el-form-item>
          <el-form-item label="报警时间间隔" prop="alarmIntervalS">
            <el-input-number
              v-model="ruleForm.alarmIntervalS"
              :min="1"
              :max="3600"
            />
            <el-tooltip
              class="box-item"
              effect="dark"
              content="报警后如果未恢复正常，间隔多久重新触发一次告警（最低3600s）"
              placement="bottom-start"
            >
              <el-icon style="margin-left: 20px"><QuestionFilled /></el-icon>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="是否使用" prop="isEnable">
            <el-radio-group v-model="ruleForm.isEnable">
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
          <el-form-item label="钉钉配置URL" prop="dingConfig" v-if="ruleForm.alertType.indexOf(1) > -1">
            <el-input v-model="ruleForm.dingConfig"></el-input>
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
    <AlertHistoryTabel v-if="data.alarmId" :alarmId="data.alarmId" @handleClose="historyHandleClose" />
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from "vue";
import { projectAllList } from "@/api/project/index";
import { alertSave, alertList } from "@/api/alert/index";
import { usePagination } from "@/hooks/usePagination";
import AlertHistoryTabel from './components/historyTabel.vue'
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

interface RuleForm {
  id: number;
  errorType: string; // 错误类型
  errorName: string; // 错误名称
  whereType: string; // sum avg
  serviceType: string; // = > <
  timeRangeS: number | string; // 报警时间范围
  maxErrorCount: number | string; // 报警错误阈值
  alarmIntervalS: number | string; // 报警时间间隔
  isEnable: number; // 是否开启本条报警配置1：是0：否
  note: string; // 配置说明
  startHour: string; // 告警时间点
  endHour: string; // 告警时间点
  alertType: number[]; // 告警方式
  dingConfig: string;
}

export default {
  components: {
    AlertHistoryTabel
  },
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
          name: "网络请求错误告警",
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
      serviceType: [
        {
          name: "等于",
          value: "=",
        },
        {
          name: "小于",
          value: "<",
        },
        {
          name: "大于",
          value: ">",
        },
      ],
      whereTypeOption: <any>[
        // {
        //   name: "求和",
        //   value: "sum",
        // },
        // {
        //   name: "平均",
        //   value: "avg",
        // }
      ],
      alarmId: <number | string>''
    });

    const ruleFormRef = ref<FormInstance>();
    const ruleForm: any = reactive<RuleForm>({
      id: 0,
      errorType: "",
      errorName: "",
      serviceType: "",
      whereType: "",
      timeRangeS: "",
      maxErrorCount: "",
      alarmIntervalS: "",
      isEnable: 1,
      note: "",
      startHour: "",
      endHour: "",
      alertType: [],
      dingConfig: ''
    });
    const rules = reactive<FormRules<RuleForm>>({
      errorType: [
        {
          required: true,
          message: "请选择错误类型",
          trigger: "blur",
        },
      ],
      errorName: [
        {
          required: true,
          message: "请输入错误名称",
          trigger: "blur",
        },
      ],
      serviceType: [
        {
          required: true,
          message: "请选择参数",
          trigger: "blur",
        },
      ],
      whereType: [
        {
          required: true,
          message: "请选择参数",
          trigger: "blur",
        },
      ],
      timeRangeS: [
        {
          required: true,
          message: "请输入报警时间",
          trigger: "blur",
        },
      ],
      maxErrorCount: [
        {
          required: true,
          message: "请输入报警阈值",
          trigger: "blur",
        },
      ],
      alarmIntervalS: [
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
      ruleForm.errorType = "";
      ruleForm.errorName = "";
      ruleForm.timeRangeS = "";
      ruleForm.maxErrorCount = "";
      ruleForm.alarmIntervalS = "";
      ruleForm.isEnable = 1;
      ruleForm.note = "";
      ruleForm.startHour = "";
      ruleForm.endHour = "";
      ruleForm.serviceType = "";
      ruleForm.whereType = "";
      ruleForm.alertType = [];
      data.whereTypeOption = []
      ruleForm.dingConfig = ''
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
      const res = await alertList(params);
      if (!res.success) {
        return;
      }
      data.tableData = res.model.list;
      paginationData.total = res.model.count;
    };

    // 修改
    const showHandleDetail = (item: any) => {
      ruleForm.id = item.id;
      ruleForm.errorType = item.errorType;
      ruleForm.errorName = item.errorName;
      ruleForm.timeRangeS = item.timeRangeS;
      ruleForm.maxErrorCount = item.maxErrorCount;
      ruleForm.alarmIntervalS = item.alarmIntervalS;
      ruleForm.isEnable = item.isEnable;
      ruleForm.note = item.note;
      ruleForm.startHour = item.startHour;
      ruleForm.endHour = item.endHour;
      ruleForm.alertType = item.alertType;
      ruleForm.serviceType = item.serviceType;
      ruleForm.whereType = item.whereType;
      ruleForm.dingConfig = item.dingConfig || '';
      errorTypeChange(item.errorType)
      data.isShowPorjectPop = true;
    };

    const errorTypeChange = (v: any) => {
      if (v == "PAGE_PV" || v == "PAGE_UV") {
        data.whereTypeOption = [
          {
            name: "求和",
            value: "sum",
          },
        ];
      } else {
        data.whereTypeOption = [
          {
            name: "求和",
            value: "sum",
          },
          {
            name: "单个",
            value: "single",
          },
        ];
      }
    };

    const clickHistory = (item: any) => {
      data.alarmId = item.id
    }

    const historyHandleClose = () => {
      data.alarmId = ''
    }

    onMounted(() => {
      getProject();
      handleSearch();
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
      errorTypeChange,
      clickHistory,
      historyHandleClose
    };
  },
};
</script>
