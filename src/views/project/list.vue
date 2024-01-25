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
          <el-table-column prop="desc" label="应用说明" align="center" />
          <el-table-column
            prop="monitorAppId"
            label="项目Id"
            align="monitorAppId"
          />
          <el-table-column prop="delay" label="上报间隔" align="center" />
          <el-table-column label="是否加密" align="center">
            <template #default="{ row }">
              {{ row.encryption == 0 ? "不加密" : "加密" }}
            </template>
          </el-table-column>
          <el-table-column label="是否开启" align="center">
            <template #default="{ row }">
              {{ row.status == 0 ? "禁用" : "开启" }}
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" label="修改时间" align="center" />
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
    <!-- 应用添加修改 -->
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
            <el-input
              v-model="ruleForm.monitorAppId"
              :disabled="ruleForm.id ? true : false"
            />
          </el-form-item>
          <el-form-item label="应用类型" prop="projectType">
            <el-select
              v-model="ruleForm.projectType"
              @change="projectTypeChange"
            >
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
          <el-form-item label="Cookie字段" prop="cookieUserKey">
            <el-input v-model="ruleForm.cookieUserKey"></el-input>
          </el-form-item>
          <el-form-item label="是否加密" prop="encryption">
            <el-radio-group v-model="ruleForm.encryption" :disabled="true">
              <el-radio :label="1">加密</el-radio>
              <el-radio :label="0">不加密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否使用" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio :label="1">使用</el-radio>
              <el-radio :label="0">禁用</el-radio>
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
          <h4 v-if="ruleForm.projectType == 1">
            复制探针
            <a href="http://www.missxiaolin.com/sdk/web.min.js" target="_blank"
              >sdk 链接下载</a
            >
            <a href="https://github.com/missxiaolin/msc-sdk" target="_blank" class="ml5">详细接入文档</a>
          </h4>
          <h4 v-if="ruleForm.projectType == 2">
            复制探针<el-tooltip
            class="box-item"
            effect="dark"
            content="将sdk下载到app.js 同步目录下，import * as MITO from './wx-mini'"
            placement="bottom-start"
          >
            <el-icon style="margin: 0 10px 0 10px"><QuestionFilled /></el-icon>
          </el-tooltip>
            <a href="http://www.missxiaolin.com/sdk/wx-mini.js" target="_blank"
              >sdk 链接下载</a
            >
            <a href="https://github.com/missxiaolin/msc-sdk" target="_blank" class="ml5">详细接入文档</a>
          </h4>
          <h4 v-if="ruleForm.projectType == 3">
            复制探针<el-tooltip
            class="box-item"
            effect="dark"
            content="将sdk下载到app.js 同步目录下，import * as MITO from './wx-mini'"
            placement="bottom-start"
          >
            <el-icon style="margin: 0 10px 0 10px"><QuestionFilled /></el-icon>
          </el-tooltip>
            <a href="http://www.missxiaolin.com/sdk/alipay-mini.js" target="_blank"
              >sdk 链接下载</a
            >
            <a href="https://github.com/missxiaolin/msc-sdk" target="_blank" class="ml5">详细接入文档</a>
          </h4>
          <div class="code">
            <el-icon class="copy-btn" size="22" @click="probeCodeCopy">
              <CopyDocument />
            </el-icon>
            {{ probeCode }}
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, ref, computed, onMounted } from "vue";
import { projectSave, projectList } from "@/api/project/index";
import { usePagination } from "@/hooks/usePagination";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";
import useClipboard from "vue-clipboard3";
import { useGeneralStore } from "@/store/modules/general";
const { toClipboard } = useClipboard();
const generalStore = useGeneralStore();

interface RuleForm {
  id?: number;
  name: string; // 应用名称
  desc: string; // 应用说明
  monitorAppId: string; // 项目ID
  projectType: number; // 项目类型
  delay: number; // 应用间隔
  encryption: number; // 是否加密
  watch?: string[];
  maxQueues: number; // 上报条数
  status: number;
  cookieUserKey: string; // 获取cookie 用户
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
          disabled: false,
        },
        {
          label: "Vue错误",
          value: "vueError",
          disabled: false,
        },
        {
          label: "异步错误",
          value: "promise",
          disabled: false,
        },
        {
          label: "资源错误",
          value: "resource",
          disabled: false,
        },
        {
          label: "网络请求",
          value: "request",
          disabled: false,
        },
        {
          label: "性能监控",
          value: "performance",
          disabled: false,
        },
        {
          label: "点击行为监控",
          value: "click",
          disabled: false,
        },
        {
          label: "白屏监控",
          value: "whiteScreen",
          disabled: false,
        },
        {
          label: "错误录屏上报",
          value: "recordScreen",
          disabled: true,
        },
      ],
      projectTypeOptions: [
        {
          value: 1,
          label: "web",
        },
        {
          value: 2,
          label: "微信小程序",
        },
        {
          value: 3,
          label: "支付宝小程序",
        },
      ],
    });
    const ruleFormRef = ref<FormInstance>();
    const ruleForm: any = reactive<RuleForm>({
      id: 0,
      name: "",
      desc: "",
      monitorAppId: "",
      projectType: 1,
      delay: 30,
      encryption: 0,
      watch: <any>["pageChange"],
      maxQueues: 1,
      status: 1,
      cookieUserKey: "",
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
      await formEl.validate(async (valid, fields) => {
        if (valid) {
          let param: any = ruleForm;
          let res = await projectSave(param);
          if (res.success) {
            ElMessage({
              message: "保存成功",
              type: "success",
            });
            handleClose();
            handleSearch();
            // 顶部列表更新
            generalStore.getValidProject();
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

    // 探针代码
    const probeCode = computed(() => {
      const {
        monitorAppId = "",
        encryption,
        maxQueues,
        delay,
        watch = [],
        cookieUserKey = "",
      } = ruleForm;
      let watchItem: any = {};
      watch.forEach((item: any) => {
        watchItem[item] = true;
        if (!watch.includes(item)) {
          watchItem[item] = false;
        }
      });
      watchItem = JSON.stringify(watchItem);
      let code =
        '<script>;(function(w,d,s){n=()=>{const r=`https://msc-serve.missxiaolin.com`;MITO.init({monitorAppId:`{monitorAppId}`,uuId:()=>MITO.getCookie("{cookieUserField}"),watch:{monitorWatch},report:{url:`${r}/api/update`,trackUrl:`${r}/api/tracker/update`,encryption:{monitorEncryption},maxQueues:{monitorMaxQueues},reportType:{monitorReportType},delay: {monitorDelay}}})};(()=>{const e=d.createElement("script");e.readyState?e.onreadystatechange=function(){"loaded"!==e.readyState&&"complete"!==e.readyState||(e.onreadystatechange=null,n())}:e.onload=function(){n()},e.src=s,d.head.append(e)})()})(window,document,"http://www.missxiaolin.com/sdk/web.min.js");<\/script>';

      if (ruleForm.projectType == 2 || ruleForm.projectType == 3) {
        code =
          'const r=`https://msc-serve.missxiaolin.com`;MITO.init({monitorAppId:`{monitorAppId}`,uuId:()=>MITO.getUser("{cookieUserField}"),watch:{monitorWatch},report:{url:`${r}/api/update`,trackUrl:`${r}/api/tracker/update`,encryption:{monitorEncryption},maxQueues:{monitorMaxQueues},reportType:{monitorReportType},delay: {monitorDelay}}})';
      }
      code = code.replace(/\{monitorAppId\}/g, `${monitorAppId}`);
      code = code.replace(/\{cookieUserField\}/g, `${cookieUserKey}`);
      code = code.replace(/\{monitorWatch\}/g, `${watchItem}`);
      code = code.replace(/\{monitorEncryption\}/g, `${encryption}`);
      code = code.replace(/\{monitorMaxQueues\}/g, `${maxQueues}`);
      code = code.replace(/\{monitorReportType\}/g, `${1}`);
      code = code.replace(/\{monitorDelay\}/g, `${1000 * delay}`);
      return code;
    });

    const probeCodeCopy = async () => {
      try {
        await toClipboard(probeCode.value);
      } catch (e) {
        console.error(e);
      }
    };
    // 关闭弹窗
    const handleClose = () => {
      data.isShowPorjectPop = false;
      ruleForm.id = 0;
      ruleForm.name = "";
      ruleForm.desc = "";
      ruleForm.monitorAppId = "";
      ruleForm.projectType = 1;
      ruleForm.delay = 30;
      ruleForm.encryption = 0;
      ruleForm.watch = ["pageChange"];
      ruleForm.maxQueues = 1;
      ruleForm.cookieUserKey = "";
      ruleForm.status = 1;
    };

    // 分页
    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        handleSearch();
      });

    // 查询分页
    const handleSearch = async () => {
      let params = {
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      let res = await projectList(params);
      if (!res.success) {
        return;
      }
      paginationData.total = res.model.count;
      data.tableData = res.model.list;
    };

    const showHandleDetail = (item: any) => {
      ruleForm.id = item.id;
      ruleForm.name = item.name;
      ruleForm.desc = item.desc;
      ruleForm.monitorAppId = item.monitorAppId;
      ruleForm.projectType = Number(item.projectType);
      ruleForm.delay = item.delay;
      ruleForm.encryption = Number(item.encryption);
      ruleForm.watch = JSON.parse(item.watch);
      ruleForm.maxQueues = item.maxQueues;
      ruleForm.cookieUserKey = item.cookieUserKey;
      ruleForm.status = Number(item.status);
      if (ruleForm.projectType == 2 || ruleForm.projectType == 3) {
        data.watchList[2].disabled = true;
        data.watchList[3].disabled = true;
        data.watchList[4].disabled = true;
        data.watchList[8].disabled = true;
      }
      data.isShowPorjectPop = true;
    };
    onMounted(() => {
      handleSearch();
    });

    const projectTypeChange = (v: any) => {
      // 微信小程序
      ruleForm.watch = ["pageChange"];
      if (v == 2 || v == 3) {
        data.watchList[2].disabled = true;
        data.watchList[3].disabled = true;
        data.watchList[4].disabled = true;
        data.watchList[8].disabled = true;
      } else {
        ruleForm.watch = ["pageChange"];
        data.watchList[2].disabled = false;
        data.watchList[3].disabled = false;
        data.watchList[4].disabled = false;
        data.watchList[8].disabled = false;
      }
    };

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
      probeCode,
      probeCodeCopy,
      showHandleDetail,
      projectTypeChange,
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
