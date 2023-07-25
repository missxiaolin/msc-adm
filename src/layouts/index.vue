<template>
  <div>
    <!-- 左侧模式 -->
    <LeftMode
      v-if="layoutMode === 'left' || appStore.device === DeviceEnum.Mobile"
    />
    <!-- 顶部模式 -->
    <TopMode v-else-if="layoutMode === 'top'" />
    <!-- 混合模式 -->
    <LeftTopMode v-else-if="layoutMode === 'left-top'" />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script lang="ts">
import LeftTopMode from "./leftTopMode.vue";
import LeftMode from "./leftMode.vue";
import TopMode from "./topMode.vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/modules/settings";
import { useAppStore } from "@/store/modules/app";
import { DeviceEnum } from "@/constants/app-key";

export default {
  components: {
    LeftMode,
    TopMode,
    LeftTopMode,
  },
  setup() {
    const appStore = useAppStore();
    const settingsStore = useSettingsStore();
    const {
      showSettings,
      layoutMode,
      showTagsView,
      showGreyMode,
      showColorWeakness,
    } = storeToRefs(settingsStore);

    return {
      layoutMode,
      appStore,
      DeviceEnum,
    };
  },
};
</script>
