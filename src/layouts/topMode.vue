<template>
  <div class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="fixed-header layout-header">
      <div class="content">
        <logo v-if="showLogo" :collapse="false" class="logo" />
        <navigation-bar class="navigation-bar" />
      </div>
      <tags-view v-show="showTagsView" />
    </div>
    <!-- 主容器 -->
    <div :class="{ hasTagsView: showTagsView }" class="main-container">
      <!-- 页面主体内容 -->
      <appMain class="app-main" />
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/modules/settings";
import { appMain, navigationBar, tagsView, logo } from "./components";

export default {
  components: {
    appMain,
    navigationBar,
    tagsView,
    logo,
  },
  setup() {
    const settingsStore = useSettingsStore();

    const { showTagsView, showLogo } = storeToRefs(settingsStore);
    return {
      showTagsView,
      showLogo,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";
$transition-time: 0.35s;

.app-wrapper {
  @include clearfix;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  z-index: 1002;
  width: 100%;
  .logo {
    width: var(--v3-sidebar-width);
  }
  .content {
    display: flex;
    .navigation-bar {
      flex: 1;
    }
  }
}

.layout-header {
  background-color: var(--v3-header-bg-color);
  box-shadow: var(--el-box-shadow-lighter);
}

.main-container {
  min-height: 100%;
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--v3-navigationbar-height);
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
