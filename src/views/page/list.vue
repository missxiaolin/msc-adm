<template>
  <div class="app-container">
    <el-card class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="simpleUrl" label="页面链接">
          <el-input v-model="searchData.simpleUrl" placeholder="请输入带*的页面链接" />
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
    <section class="custom-main-contents visit-left-contents">
      <el-card class="flex flex-1 flex-column visit-left-list">
        <template #header>
          <div class="card-header">
            <span>访问页面</span>
            <span>总PV: {{ data.pvCount }}次</span>
          </div>
        </template>
        <div class="flex-1 flex flex-column">
          <el-scrollbar>
            <dl
              class="arco-list-item"
              :class="{ active: data.activePage == item.simpleUrl }"
              v-for="(item, index) in data.visitList"
              :key="index"
              @click="handleVisitItem(item)"
            >
              <dt>
                {{ item.simpleUrl }}
              </dt>
              <dd class="flex align-items-center">
                {{ numberFormat(item.pageCount) }}次({{
                  visitPercent(item.pageCount)
                }})
                <el-icon><ArrowRightBold /></el-icon>
              </dd>
            </dl>
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
        <div class="visit-right-contents flex-1 flex flex-column">
          <el-scrollbar>
            <!-- 地理分布 -->
            <el-card>
              
            </el-card>
          </el-scrollbar>
        </div>
      </el-card>

    </section>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, ref } from "vue";
import { timeQuantum, numberFormat } from "@/utils/index";
import { pageList } from "@/api/page";
import { usePagination } from "@/hooks/usePagination";

export default {
  setup() {
    let data = reactive({
      activePage: "", // 访问页面选中
      pvCount: 0,
      visitList: <any>[],
    });
    const searchData = ref({
      simpleUrl: "",
      data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
    });

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        getPageList();
      }, {
        layout: "total, prev, pager, next, jumper",
      });

    // 分页
    const getPageList = async () => {
      let param = {
        simpleUrl: searchData.value.simpleUrl,
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
      };
      let res = await pageList(param);
      if (!res.success) {
        return;
      }
      data.pvCount = res.model.pvCount;
      paginationData.total = res.model.count;
      data.visitList = res.model.list;
      // 默认查询第一条数据详情
      handleVisitItem(data.visitList[0] || {});
    };
    /**
     * @description: 左侧列表 点击http 点击
     * @param {*} node
     * @return {*}
     */
    const handleVisitItem = (node: any) => {
      const { simpleUrl = "" } = node;
      data.activePage = simpleUrl;
    };

    /**
     * @description: 访问占比
     * @param {*} count
     * @return {*}
     */
    const visitPercent = (count: number) => {
      return ((count / data.pvCount) * 100).toFixed(2) + "%";
    };

    // 初始化
    const init = async () => {
      getPageList();
    };

    // 重置
    const resetSearch = async () => {
      searchData.value = {
        simpleUrl: "",
        data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
      };
    };

    onMounted(() => {
      init();
    });

    return {
      data,
      searchData,
      resetSearch,
      init,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
      visitPercent,
      numberFormat,
      handleVisitItem
    };
  },
};
</script>

<style lang="scss" scoped>
@use "./style/style.scss";
</style>
