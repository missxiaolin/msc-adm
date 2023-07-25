<template>
  <div
    class="layout-logo-container"
    :class="{
      collapse: props.collapse,
      'layout-mode-top': layoutMode === 'top',
    }"
  >
    <transition name="layout-logo-fade">
      <router-link v-if="props.collapse" key="collapse" to="/">
        <img :src="logo" class="layout-logo" />
      </router-link>
      <router-link v-else key="expand" to="/">
        <img
          :src="layoutMode !== 'left' ? logo : logo"
          class="layout-logo-text"
        />
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/store/modules/settings";
import logo from "@/assets/img/logo.jpeg?url";

interface Props {
  collapse?: boolean;
}

export default {
  setup(props) {
    const settingsStore = useSettingsStore();
    const { layoutMode } = storeToRefs(settingsStore);
    return {
      layoutMode,
      logo,
      props,
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-logo-container {
  position: relative;
  width: 100%;
  height: var(--v3-header-height);
  line-height: var(--v3-header-height);
  background-color: transparent;
  text-align: center;
  overflow: hidden;
  .layout-logo {
    display: none;
  }
  .layout-logo-text {
    height: 50px;
    vertical-align: middle;
  }
}

.layout-mode-top {
  height: var(--v3-navigationbar-height);
  line-height: var(--v3-navigationbar-height);
}

.collapse {
  .layout-logo {
    width: 32px;
    height: 32px;
    vertical-align: middle;
    display: inline-block;
  }
  .layout-logo-text {
    display: none;
  }
}
</style>
