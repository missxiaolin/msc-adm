<template>
  <el-drawer
    v-model="drawerVisible"
    ref="drawerRef"
    title="性能指标查看"
    direction="rtl"
    size="90%"
    :z-index="999"
  >
  </el-drawer>
</template>

<script lang="ts">
import { ref } from "vue";
export default {
  props: {
    perfNode: {
      type: Object,
      required: true,
    },
  },
  name: "perfDetail",
  setup() {
    const drawerVisible = ref(true);

    return {
      drawerVisible,
    };
  },
};
</script>
