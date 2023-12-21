<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="simpleUrl" label="页面链接">
          <el-input v-model="searchData.simpleUrl" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="phone" label="日期">
          <el-date-picker
            v-model="searchData.data"
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
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { timeQuantum } from "@/utils/index";
import { pageList } from '@/api/page';

export default {
  setup() {
    const searchData = ref({
      simpleUrl: "",
      data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
    });

    // 分页
    const getPageList = async () => {
        let param = {
            simpleUrl: searchData.value.simpleUrl,
            startTime: searchData.value.data[0],
            endTime: searchData.value.data[1]
        }
        let res = await pageList(param)
        if (!res.success) {
            return
        }
        console.log(res)
    }

    const init = async () => {
        getPageList()
    };

    const resetSearch = async () => {};

    onMounted(() => {
      init();
    });

    return {
      searchData,
      resetSearch,
      init,
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
