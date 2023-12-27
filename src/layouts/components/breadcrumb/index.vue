<template>
  <div class="flex flex-row justify-between">
    <el-breadcrumb class="app-breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbs" :key="item.path">
        <span
          v-if="
            item.redirect === 'noRedirect' || index === breadcrumbs.length - 1
          "
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">
          {{ item.meta.title }}
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
    <el-select placeholder="请选择项目" @change="handleProjectChange" v-model="currentProjectId" size="large" class="mt5">
      <el-option
        
        v-for="item in projectList"
        :key="item.id"
        :label="item.name"
        :value="item.monitorAppId"
      />
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed, getCurrentInstance } from "vue";
import { type RouteLocationMatched, useRoute, useRouter } from "vue-router";
import { compile } from "path-to-regexp";
import { useGeneralStore } from "@/store/modules/general";

const route = useRoute();
const router = useRouter();
const generalStore = useGeneralStore();
const { proxy }: any = getCurrentInstance();

const handleManualRefresh = () => {
	generalStore.setManualRefresh();
};

/** 定义响应式数据 breadcrumbs，用于存储面包屑导航信息 */
const breadcrumbs = ref<RouteLocationMatched[]>([]);

/** 获取面包屑导航信息 */
const getBreadcrumb = () => {
  breadcrumbs.value = route.matched.filter(
    (item) => item.meta?.title && item.meta?.breadcrumb !== false
  );
};

/** 编译路由路径 */
const pathCompile = (path: string) => {
  const toPath = compile(path);
  return toPath(route.params);
};

/** 处理面包屑导航点击事件 */
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(redirect as string);
    return;
  }
  router.push(pathCompile(path));
};

/** 监听路由变化，更新面包屑导航信息 */
watch(
  () => route.path,
  (path) => {
    if (path.startsWith("/redirect/")) return;
    getBreadcrumb();
  }
);

/** 初始化面包屑导航信息 */
getBreadcrumb();

const projectList = computed(() => {
  return generalStore.getProjectList
});
const currentProjectId = ref(generalStore.getCurrentProjectId)
const handleProjectChange = (v: any) => {
  generalStore.setCurrentProject(v)
  proxy.$nextTick(() => {
		handleManualRefresh();
	});
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: var(--v3-navigationbar-height);
  margin-left: 8px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
