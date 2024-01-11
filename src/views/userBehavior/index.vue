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
    <section
      class="custom-main-contents visit-left-contents visit-right-contents" ref="mainRef"
    >
      <el-card class="flex flex-1 flex-column visit-left-list">
        <div class="flex-1 flex flex-column">
          <el-scrollbar :max-height="`${data.height}px`" style="flex: 1">
            <el-timeline>
              <el-timeline-item
                v-for="(item, index) in data.userList"
                :icon="
                  item.category == 'USER_CLICK'
                    ? 'Pointer'
                    : item.category == 'HTTP_LOG'
                    ? 'Position'
                    : item.category == 'PAGE_CHANGE'
                    ? 'Files'
                    : item.category == 'JS_ERROR'
                    ? 'CircleClose'
                    : ''
                "
                center
                :timestamp="item.happenTime"
                placement="top"
                :key="index"
              >
                <el-card style="width: 95%;">
                  <template v-if="item.category == 'USER_CLICK'">
                    <p>{{ item.subType }}</p>
                    <p>pageUrl: {{ item.pageUrl }}</p>
                    <p>tagName: {{ item.tagName }}</p>
                    <p>innerHTML: {{ item.innerHTML }}</p>
                  </template>
                  <template v-if="item.category == 'HTTP_LOG'">
                    <p>
                      {{ item.subType }}请求方式: {{ item.method }} 请求方式:{{
                        item.type
                      }}
                      接口状态: {{ item.status }} 耗时:{{
                        timeformatter(item.duration)
                      }}
                    </p>
                    <p>pageUrl: {{ item.pageUrl }}</p>
                    <p>pathName: {{ item.pathName }}</p>
                    <p>requestText: {{ item.requestText }}</p>
                    <p>responseText: {{ item.responseText }}</p>
                  </template>
                  <template v-if="item.category == 'PAGE_CHANGE'">
                    <p>
                      {{ item.subType }} 停留:{{ timeformatter(item.duration) }}
                    </p>
                    <p>referrer: {{ item.referrer }}</p>
                    <p>from: {{ item.from }}</p>
                    <p>to: {{ item.to }}</p>
                  </template>
                  <template v-if="item.category == 'JS_ERROR'">
                    <p>{{ item.subType }}</p>
                    <p>{{ item.errorMsg }}</p>
                  </template>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
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
        </div>
      </el-card>
      <div class="visit-right-contents">
        <div class="basic-header">
          <el-row>
            <el-col :span="12">cip： {{ data.pageDetail.ip }}</el-col>
            <el-col :span="12">cregion： {{ data.pageDetail.country }}</el-col>
            <el-col :span="12"
              >deviceType： {{ data.pageDetail.deviceType }}</el-col
            >
            <el-col :span="12">os： {{ data.pageDetail.os }}</el-col>
            <el-col :span="12"
              >browserInfo： {{ data.pageDetail.browserInfo }}</el-col
            >
            <el-col :span="12">device： {{ data.pageDetail.device }}</el-col>
            <el-col :span="12"
              >deviceModel： {{ data.pageDetail.deviceModel }}</el-col
            >
            <el-col :span="12"
              >language： {{ data.pageDetail.language }}</el-col
            >
            <el-col :span="12">netWork： {{ data.pageDetail.netWork }}</el-col>
            <el-col :span="12"></el-col>
            <el-col :span="12"
              >userAgent： {{ data.pageDetail.userAgent }}</el-col
            >
          </el-row>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { reactive, onMounted, ref, nextTick } from "vue";
import { timeQuantum, timeformatter } from "@/utils/index";
import { userBehavior } from "@/api/userBehavior/index";
import { usePagination } from "@/hooks/usePagination";
import { ElMessage } from 'element-plus'

export default {
  setup() {
    let data = reactive({
      height: 500,
      searchData: {
        uuId: "",
        categorys: ["PAGE_CHANGE", "USER_CLICK", "HTTP_LOG", "JS_ERROR"],
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
      pageDetail: <any>{},
      userList: <any>[],
    });

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        getUserBehavior();
      });

    const getUserBehavior = async () => {
      if (!data.searchData.uuId || !data.searchData.categorys) {
        ElMessage(!data.searchData.uuId ? '请输入用户ID' : '请选择事件类型');
        
        return;
      }
      let params = {
        uuId: data.searchData.uuId,
        categorys: data.searchData.categorys,
        startTime: data.searchData.data[0],
        endTime: data.searchData.data[1],
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      let res = await userBehavior(params);
      if (!res.success) {
        data.pageDetail = {};
        return;
      }
      data.pageDetail = res.model.pageDetail || {};
      data.userList = res.model.userList || [];
      paginationData.total = res.model.count;
    };

    const init = async () => {
      paginationData.currentPage = 1;
      paginationData.pageSize = 10;
      getUserBehavior();
    };
    const resetSearch = () => {};

    const mainRef = ref<any | null>(null);


    onMounted(() => {
      nextTick(() => {
        data.height = mainRef.value.offsetHeight - 100
      })
      init();
    });
    return {
      data,
      init,
      resetSearch,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
      timeformatter,
      mainRef
    };
  },
};
</script>

<style lang="scss" scoped>
@use "./style/style.scss";
</style>
