<template>
  <div :class="{ 'has-logo': isLogo }">
    <Logo v-if="isLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse && !isTop"
        :background-color="backgroundColor"
        :text-color="textColor"
        :active-text-color="activeTextColor"
        :unique-opened="true"
        :collapse-transition="false"
        :mode="isTop && !isMobile ? 'horizontal' : 'vertical'"
      >
        <SidebarItem
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :hidden="route.hidden"
          :base-path="route.path"
          :is-collapse="isCollapse"
          :is-top="isTop"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/settings";
import Logo from "../logo/index.vue";
import SidebarItem from "./sidebarItem.vue";
import { getCssVariableValue } from "@/utils";
import { DeviceEnum } from "@/constants/app-key";

const routes = [
  {
    path: "/403",
    hidden: false,
    meta: {
      title: "403",
      elIcon: "Grid",
    },
  },
  {
    path: "/404",
    meta: {
      title: "404",
      elIcon: "Grid",
    },
    hidden: false,
  },
];

export default {
  components: {
    Logo,
    SidebarItem,
  },
  setup() {
    const appStore = useAppStore();
    const route = useRoute();
    const { sidebar, device } = storeToRefs(appStore);

    const isCollapse = computed(() => !sidebar.value.opened);
    const settingsStore = useSettingsStore();
    const { layoutMode, showLogo } = storeToRefs(settingsStore);
    const v3SidebarMenuBgColor = getCssVariableValue(
      "--v3-sidebar-menu-bg-color"
    );
    const v3SidebarMenuTextColor = getCssVariableValue(
      "--v3-sidebar-menu-text-color"
    );
    const v3SidebarMenuActiveTextColor = getCssVariableValue(
      "--v3-sidebar-menu-active-text-color"
    );

    const isLeft = computed(() => layoutMode.value === "left");
    const isLogo = computed(() => isLeft.value && showLogo.value);
    const isTop = computed(() => layoutMode.value === "top");
    const backgroundColor = computed(() =>
      isLeft.value ? v3SidebarMenuBgColor : undefined
    );
    const textColor = computed(() =>
      isLeft.value ? v3SidebarMenuTextColor : undefined
    );
    const activeTextColor = computed(() =>
      isLeft.value ? v3SidebarMenuActiveTextColor : undefined
    );
    const isMobile = computed(() => device.value === DeviceEnum.Mobile);

    const activeMenu = computed(() => {
      const {
        meta: { activeMenu },
        path,
      } = route;
      return activeMenu ? activeMenu : path;
    });

    const sidebarMenuItemHeight = computed(() => {
      return layoutMode.value !== "top"
        ? getCssVariableValue("--v3-sidebar-menu-item-height")
        : getCssVariableValue("--v3-navigationbar-height");
    });

    const sidebarMenuHoverBgColor = computed(() => {
      return layoutMode.value !== "top"
        ? getCssVariableValue("--v3-sidebar-menu-hover-bg-color")
        : "transparent";
    });

    return {
      isLogo,
      isCollapse,
      activeMenu,
      isTop,
      backgroundColor,
      textColor,
      activeTextColor,
      isMobile,
      routes,
      sidebarMenuItemHeight,
      sidebarMenuHoverBgColor,
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
