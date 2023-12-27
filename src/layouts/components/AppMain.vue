<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <!-- <router-view v-slot="{ Component }">
        <transition name="el-fade-in" mode="out-in">
          <component :is="Component" :key="key" />
        </transition>
      </router-view> -->
      <router-view v-if="!isManualRefresht"></router-view>
    </div>
  </section>
</template>

<script lang="ts">
import { computed } from "vue";
import { useGeneralStore } from "@/store/modules/general";
import { useRoute } from "vue-router";
const generalStore = useGeneralStore();
export default {
  setup() {
    const route = useRoute();

    const key = computed(() => {
      // 返回 route.path 和 route.fullPath 有着不同的效果，大多数时候 path 更通用
      return route.path;
    });
    const isManualRefresht = computed(() => {
      return generalStore.getManualRefresh;
    });
    return {
      key,
      isManualRefresht
    };
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixins.scss";

.app-main {
  width: 100%;
  background-color: var(--v3-body-bg-color);
}

.app-scrollbar {
  height: 100%;
  overflow: auto;
  @include scrollbar;
}
</style>
