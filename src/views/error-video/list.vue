<template>
  <div class="app-container">
    <el-card shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="version" label="页面URL">
          <el-input
            v-model="searchData.simpleUrl"
            placeholder="请输入页面链接"
          />
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
          <el-button type="primary" @click="initQuery">查询</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="mt20">
      <div class="table-wrapper">
        <el-table border :data="data.tableData">
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="uuId" label="用户ID" align="center" />
          <el-table-column prop="simpleUrl" label="页面链接" align="center" />
          <el-table-column prop="error_desc" label="错误类型" align="center" />
          <el-table-column prop="happenTime" label="上报时间" align="center" />
          <el-table-column label="操作" align="center">
            <template #default="{ row }">
              <el-button type="text" @click="getDetail(row)">
                查看视频
              </el-button>
              <el-button type="text" @click="goUserTrajectory(row)">
                用户行为轨迹
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
  </div>
  <el-dialog
    title="播放录屏"
    :class="{ 'revert-disalog': data.fullscreen }"
    top="10vh"
    :fullscreen="data.fullscreen"
    v-model="data.revertdialog"
    width="90%"
    :destroy-on-close="true"
  >
    <div id="revert" ref="revert"></div>
  </el-dialog>
</template>

<script lang="ts">
import { ref, reactive, onMounted, getCurrentInstance, nextTick } from "vue";
import { usePagination } from "@/hooks/usePagination";
import { recordscreenList, recordscreenDetail } from "@/api/recordscreen/index";
import { timeQuantum } from "@/utils/index";
import { unzip } from "@/utils/recordScreen";
import rrwebPlayer from "rrweb-player";
import "rrweb-player/dist/style.css";

export default {
  setup() {
    const { proxy }: any = getCurrentInstance();
    const searchData = ref({
      simpleUrl: "",
      data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
    });

    let data = reactive({
      tableData: <any>[],
      revertdialog: false,
      fullscreen: true,
    });

    const { paginationData, handleCurrentChange, handleSizeChange } =
      usePagination(() => {
        initQuery();
      });

    const initQuery = async () => {
      let param = {
        page: paginationData.currentPage,
        pageSize: paginationData.pageSize,
        simpleUrl: searchData.value.simpleUrl,
        startTime: searchData.value.data[0],
        endTime: searchData.value.data[1],
      };
      let res = await recordscreenList(param);
      if (!res.success) {
        return;
      }
      paginationData.total = res.model.count;
      data.tableData = res.model.list;
    };

    const resetSearch = () => {
      searchData.value = {
        simpleUrl: "",
        data: timeQuantum({ format: ["00:00:00", "23:59:59"] }),
      };
    };

    // 跳转到用户轨迹
    const goUserTrajectory = (row: any) => {
      proxy.$router.push({
        path: `/user/behavior`,
        query: {
          obj: JSON.stringify({
            uuId: row.uuId,
            startTime: searchData.value.data[0],
            endTime: searchData.value.data[1],
          }),
        },
      });
    };

    // 获取详情
    const getDetail = async (row: any) => {
      let param = {
        id: row.id,
      };
      let res = await recordscreenDetail(param);
      if (!res.success) {
        return;
      }
      let useData = res.model;
      let events = unzip(useData.events);
      data.revertdialog = true;
      nextTick(() => {
        new rrwebPlayer({
          target: document.getElementById("revert"),
          props: {
            events,
            UNSAFE_replayCanvas: true,
          },
        });
      });
    };

    onMounted(() => {
      initQuery();
    });

    return {
      searchData,
      initQuery,
      resetSearch,
      data,
      paginationData,
      handleCurrentChange,
      handleSizeChange,
      goUserTrajectory,
      getDetail,
    };
  },
};
</script>

<style lang="scss">
.revert-disalog {
  .el-dialog__body {
    height: 720px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
