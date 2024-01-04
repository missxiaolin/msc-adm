<template>
  <el-table :data="NFTable" stripe max-height="500">
    <el-table-column prop="name" label="资源名称" fixed width="200" />
    <el-table-column prop="transferSize" label="资源大小" fixed />
    <el-table-column prop="initiatorType" label="资源类型" />
    <el-table-column prop="startTime" label="开始时间" />
    <el-table-column prop="domainLookupStart" label="DNS查询开始" />
    <el-table-column prop="domainLookupEnd" label="DNS查询结束" />
    <el-table-column prop="duration" label="资源的总耗时" />
  </el-table>
</template>

<script lang="ts">
import { computed } from "vue";
export default {
  props: {
    data: {
      type: Array,
      defualt: () => [],
    },
  },
  setup(props) {
    function timestampToDateTime(timestamp: number) {
      const date = new Date(timestamp);
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      const hours = ("0" + date.getHours()).slice(-2);
      const minutes = ("0" + date.getMinutes()).slice(-2);
      const seconds = ("0" + date.getSeconds()).slice(-2);

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    const NFTable = computed(() => {
      if (!props.data || !props.data.length) return [];
      const list = props.data.map((item: any) => {
        item.startTime = timestampToDateTime(parseInt(item.startTime))
        item.domainLookupStart = timestampToDateTime(parseInt(item.domainLookupStart))
        item.domainLookupEnd = timestampToDateTime(parseInt(item.domainLookupEnd))
        return item;
      });
      return list;
    });

    return {
      NFTable,
    };
  },
};
</script>

<style scoped></style>
