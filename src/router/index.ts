import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

import { defineAsyncComponent } from 'vue'

const Layouts = () => import("@/layouts/index.vue");

/** 常驻路由 */
export const constantRoutes: any = [
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    meta: {
      title: "首页",
      elIcon: "eleme",
    },
    children: [
      {
        path: "dashboard",
        
        component: () => defineAsyncComponent(() => import("@/views/dashboard/index.vue")),
        hidden: false,
        meta: {
          title: "应用概览",
          elIcon: "Operation",
          keepAlive: false,
          affix: true,
        },
      },
    ],
  },
  {
    path: "/login",
    component: () => defineAsyncComponent(() => import("@/views/login/index.vue")),
    hidden: true,
    meta: {},
  },
  {
    path: "/403",
    component: () => defineAsyncComponent(() => import("@/views/error-page/403.vue")),
    hidden: true,
    meta: {
      title: "403",
      elIcon: "help",
    },
  },
  {
    path: "/404",
    component: () => defineAsyncComponent(() => import("@/views/error-page/404.vue")),
    hidden: true,
    meta: {
      title: "404",
      elIcon: "camera",
    },
    alias: "/:pathMatch(.*)*",
  },
  {
    path: "/performance",
    component: Layouts,
    redirect: "/performance/list",
    name: "Performance",
    meta: {
      title: "页面性能",
      elIcon: "Odometer",
    },
    children: [
      {
        path: "list",
        component: () => defineAsyncComponent(() => import("@/views/performance/list.vue")),
        hidden: false,
        meta: {
          title: "页面性能列表",
          keepAlive: false,
          elIcon: "Odometer",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/resource",
    component: Layouts,
    redirect: "/resource/list",
    name: "Resource",
    meta: {
      title: "资源错误",
      elIcon: "ScaleToOriginal",
    },
    children: [
      {
        path: "list",
        component: () => defineAsyncComponent(() => import("@/views/resource/list.vue")),
        hidden: false,
        meta: {
          title: "资源错误列表",
          keepAlive: false,
          elIcon: "ScaleToOriginal",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/js",
    component: Layouts,
    redirect: "/js/list",
    name: "JS",
    meta: {
      title: "JS错误",
      elIcon: "HelpFilled",
    },
    children: [
      {
        path: "list",
        component: () => defineAsyncComponent(() => import("@/views/js/list.vue")),
        hidden: false,
        meta: {
          title: "JS错误列表",
          keepAlive: false,
          elIcon: "HelpFilled",
          affix: true,
        },
      },
    ],
  },
  {
    path: "/page",
    component: Layouts,
    redirect: "/page/list",
    name: "Page",
    meta: {
      title: "访问页面",
      elIcon: "Files",
    },
    children: [
      {
        path: "list",
        component: () => defineAsyncComponent(() => import("@/views/page/list.vue")),
        hidden: false,
        meta: {
          title: "页面信息列表",
          keepAlive: false,
          elIcon: "Files",
          affix: true,
        },
      },
    ],
  }
];

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [];

const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === "hash"
      ? createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH)
      : createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: constantRoutes,
});

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route: any) => {
      const { name, meta } = route;
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name);
      }
    });
  } catch {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload();
  }
}

export default router;
