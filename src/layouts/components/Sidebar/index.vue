<template>
  <div :class="{ 'has-logo': isLogo }">
    <Logo v-if="isLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
        
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";
import Logo from "../logo/index.vue";
import SidebarItem from "./sidebarItem.vue";

export default {
  components: {
    Logo,
    SidebarItem
  },
  setup() {
    const appStore = useAppStore();
    const { sidebar, device } = storeToRefs(appStore);

    const isCollapse = computed(() => !sidebar.value.opened);
    const settingsStore = useSettingsStore();
    const { layoutMode, showLogo } = storeToRefs(settingsStore);

    const isLeft = computed(() => layoutMode.value === "left");
    const isLogo = computed(() => isLeft.value && showLogo.value);

    return {
      isLogo,
      isCollapse,
    };
  },
};
</script>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind(tipLineWidth);
    height: 100%;
    background-color: var(--v3-sidebar-menu-tip-line-bg-color);
  }
}

.has-logo {
  .el-scrollbar {
    // 多 1% 是为了在左侧模式时侧边栏最底部不显示 1px 左右的白色线条
    height: calc(101% - var(--v3-header-height));
  }
}

.el-scrollbar {
  // 多 5% 是为了在顶部模式时不显示垂直滚动条
  height: 105%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item),
:deep(.el-menu--horizontal .el-menu-item) {
  height: v-bind(sidebarMenuItemHeight);
  line-height: v-bind(sidebarMenuItemHeight);
  &.is-active,
  &:hover {
    background-color: v-bind(sidebarMenuHoverBgColor);
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

:deep(.el-sub-menu) {
  &.is-active {
    .el-sub-menu__title {
      color: v-bind(activeTextColor) !important;
    }
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        @include tip-line;
      }
    }
  }
}
</style>
