<template>
  <div :class="layoutClasses" class="app-wrapper">
    <!-- 头部导航栏和标签栏 -->
    <div class="fixed-header layout-header">
      <logo v-if="showLogo" :collapse="false" class="logo" />
      <div class="content">
        <navigation-bar />
        <tags-view v-show="showTagsView" />
      </div>
    </div>
    <!-- 主容器 -->
    <div class="main-container">
      <!-- 左侧边栏 -->
      <sidebar class="sidebar-container" />
      <!-- 页面主体内容 -->
      <appMain class="app-main" />
    </div>
  </div>
</template>

<script lang="ts">
import { appMain, sidebar, logo, navigationBar, tagsView } from "./components";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";

export default {
  components: {
    sidebar,
    appMain,
    logo,
    navigationBar,
    tagsView
  },
  setup() {
    const appStore = useAppStore();
    const settingsStore = useSettingsStore();
    const { showTagsView, showLogo } = storeToRefs(settingsStore);
    /** 定义计算属性 layoutClasses，用于控制布局的类名 */
    const layoutClasses = computed(() => {
      return {
        hideSidebar: !appStore.sidebar.opened,
      };
    });

    return {
      layoutClasses,
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
  display: flex;
  .logo {
    width: var(--v3-sidebar-width);
  }
  .content {
    flex: 1;
    position: relative;
  }
}

.layout-header {
  background-color: var(--v3-header-bg-color);
  box-shadow: var(--el-box-shadow-lighter);
}

.main-container {
  min-height: 100%;
}

.sidebar-container {
  transition: width $transition-time;
  width: var(--v3-sidebar-width) !important;
  height: 100%;
  position: fixed;
  left: 0;
  top: 30px;
  z-index: 1001;
  overflow: hidden;
  padding-top: var(--v3-navigationbar-height);
}

.app-main {
  transition: padding-left $transition-time;
  padding-top: var(--v3-navigationbar-height);
  padding-left: var(--v3-sidebar-width);
  height: 100vh;
  overflow: auto;
}

.hideSidebar {
  .sidebar-container {
    width: var(--v3-sidebar-hide-width) !important;
  }
  .app-main {
    padding-left: var(--v3-sidebar-hide-width);
  }
}

.hasTagsView {
  .sidebar-container {
    padding-top: var(--v3-header-height);
  }
  .app-main {
    padding-top: var(--v3-header-height);
  }
}
</style>
