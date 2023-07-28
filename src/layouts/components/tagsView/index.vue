<template>
  <div class="tags-view-container">
    <scroll-pane class="tags-view-wrapper" :tag-refs="tagRefs">
      <router-link
        ref="tagRefs"
        v-for="tag in tagsViewStore.visitedViews"
        :key="tag.path"
        :class="{ active: isActive(tag) }"
        class="tags-view-item"
        :to="{ path: tag.path, query: tag.query }"
      >
      </router-link>
    </scroll-pane>
  </div>
</template>

<script lang="ts">
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import {
  type RouteRecordRaw,
  RouterLink,
  useRoute,
  useRouter,
} from "vue-router";
import { type TagView, useTagsViewStore } from "@/store/modules/tags-view";
import scrollPane from "./scrollPane.vue";
import path from "path-browserify";
import routes from "../../../router/routers";

export default {
  components: {
    scrollPane,
  },
  setup() {
    /** 标签页组件元素的引用数组 */
    const tagRefs = ref<InstanceType<typeof RouterLink>[]>([]);
    const instance = getCurrentInstance();
    const router = useRouter();
    const route = useRoute();
    const tagsViewStore = useTagsViewStore();
    /** 固定的标签页 */
    let affixTags: any = []

    /** 判断标签页是否激活 */
    const isActive = (tag: TagView) => {
      return tag.path === route.path;
    };

    /** 判断标签页是否固定 */
    const isAffix = (tag: TagView) => {
      return tag.meta?.affix;
    };

    /** 筛选出固定标签页 */
    const filterAffixTags = (routes: any, basePath = "/") => {
      const tags: TagView[] = [];
      routes.forEach((route: any) => {
        if (isAffix(route)) {
          const tagPath = path.resolve(basePath, route.path);
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            meta: { ...route.meta },
          });
        }
        if (route.children) {
          const childTags = filterAffixTags(route.children, route.path);
          tags.push(...childTags);
        }
      });
      return tags;
    };

    /** 初始化标签页 */
    const initTags = () => {
      affixTags = filterAffixTags(routes);
      for (const tag of affixTags) {
        // 必须含有 name 属性
        tag.meta?.title && tagsViewStore.addVisitedView(tag);
      }
    };

    /** 添加标签页 */
    const addTags = () => {};

    watch(
      route,
      () => {
        addTags();
      },
      {
        deep: true,
      }
    );

    onMounted(() => {
      initTags();
      addTags();
    });

    return {
      tagRefs,
      tagsViewStore,
      isActive,
    };
  },
};
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: var(--v3-tagsview-height);
  width: 100%;
  background-color: var(--v3-header-bg-color);
  box-shadow: 0 0 3px 0 #00000010;
  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid var(--v3-tagsview-tag-border-color);
      border-radius: var(--v3-tagsview-tag-border-radius);
      color: var(--v3-tagsview-tag-text-color);
      background-color: var(--v3-tagsview-tag-bg-color);
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      &:first-of-type {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 5px;
      }
      &.active {
        background-color: var(--v3-tagsview-tag-active-bg-color);
        color: var(--v3-tagsview-tag-active-text-color);
        border-color: var(--v3-tagsview-tag-active-border-color);
        &::before {
          content: "";
          background-color: var(--v3-tagsview-tag-active-before-color);
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
      .el-icon {
        margin: 0 2px;
        vertical-align: middle;
        border-radius: 50%;
        &:hover {
          background-color: var(--v3-tagsview-tag-icon-hover-bg-color);
          color: var(--v3-tagsview-tag-icon-hover-color);
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background-color: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 #00000030;
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
