<template>
  <div class="app-container">
    <el-card class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="data.searchData">
        <el-form-item prop="uuId" label="用户Id">
          <el-input v-model="data.searchData.uuId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item prop="categorys" label="事件类型">
          <el-select
            v-model="data.searchData.categorys"
            multiple
            placeholder="请选择事件类型"
            style="width: 400px"
          >
            <el-option
              v-for="item in data.categoryOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="phone" label="日期">
          <el-date-picker
            v-model="data.searchData.data"
            type="datetimerange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="init">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <section class="custom-main-contents visit-left-contents">
      <el-card> </el-card>
    </section>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { timeQuantum } from "@/utils/index";

export default {
  setup() {
    let data = reactive({
      searchData: {
        uuId: "",
        categorys: ['PAGE_CHANGE', 'USER_CLICK', 'HTTP_LOG', 'JS_ERROR'],
        data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
      },
      categoryOptions: [
        {
          value: "PAGE_CHANGE",
          label: "用户浏览",
        },
        {
          value: "USER_CLICK",
          label: "用户点击",
        },
        {
          value: "HTTP_LOG",
          label: "用户请求",
        },
        {
          value: "JS_ERROR",
          label: "JS错误",
        },
      ],
    });

    const init = () => {};
    const resetSearch = () => {};
    return {
      data,
      init,
      resetSearch,
    };
  },
};
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .custom-main-contents {
    flex: 1;
    :deep(.el-card) {
      height: 100%;
    }
  }
}
</style>
