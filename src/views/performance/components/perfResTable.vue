<template>
  <el-table :data="NFTable" stripe max-height="500">
    <el-table-column prop="name" label="资源名称" fixed width="200" />
    <el-table-column prop="transferSize" label="资源大小" fixed />
    <el-table-column prop="initiatorType" label="资源类型" />
    <el-table-column prop="responseStatus" label="资源状态" />
    <el-table-column prop="startTime" label="开始时间" />
    <el-table-column prop="duration" label="资源的总耗时" />
    <el-table-column prop="responseEnd" label="资源下载时间" />
    <el-table-column
      prop="renderBlockingStatus"
      label="否有渲染阻塞"
      fixed="right"
    />
    <el-table-column label="命中缓存" fixed="right">
      <template #default="{ row }">
        {{ row.deliveryType == 'cache' ? '浏览器缓存' : '服务器获取' }}
      </template>
    </el-table-column>
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
    const NFTable = computed(() => {
      const fileds = [
        "startTime",
        "responseEnd",
        "duration",
        "dns",
        "tcp",
        "ssl",
        "ttfb",
        "contentDownload",
      ];
      if (!props.data || !props.data.length) return [];
      const list = props.data.map((item: any) => {
        //
        for (let key in item) {
          if (fileds.includes(key)) {
            item[key] = (item[key] || 0).toFixed(2) + "ms";
          }
        }
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
