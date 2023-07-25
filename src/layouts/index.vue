<template>
  <div>
    <!-- 混合模式 -->
    <LeftTopMode />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script lang="ts">
import LeftTopMode from "./leftTopMode.vue"
import { storeToRefs } from "pinia";

export default {
  components: {
    LeftTopMode
  },
  setup() {},
};
</script>
