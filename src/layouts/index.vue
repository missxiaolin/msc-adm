<template>
  <div>
    <!-- 左侧模式 -->
    <leftMode
      v-if="layoutMode === 'left' || appStore.device === DeviceEnum.Mobile"
    />
    <!-- 顶部模式 -->
    <topMode v-else-if="layoutMode === 'top'" />
    <!-- 混合模式 -->
    <leftTopMode v-else-if="layoutMode === 'left-top'" />
    <!-- <router-view></router-view> -->
  </div>
</template>

<script lang="ts">
import leftTopMode from "./leftTopMode.vue";
import leftMode from "./leftMode.vue";
import topMode from "./topMode.vue";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/modules/settings";
import { useAppStore } from "@/store/modules/app";
import { DeviceEnum } from "@/constants/app-key";

export default {
  components: {
    leftMode,
    topMode,
    leftTopMode,
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
