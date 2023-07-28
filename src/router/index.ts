import {
  type RouteRecordRaw,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";

const Layouts = () => import("@/layouts/index.vue")

/** 常驻路由 */
export const constantRoutes: any = [
  {
    path: "/",
    component: Layouts,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        hidden: false,
        meta: {
          title: "首页",
          elIcon: "eleme",
          affix: true
        }
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    hidden: false,
    meta: {
      title: "403",
      elIcon: "help",
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    hidden: false,
    meta: {
      title: "404",
      elIcon: "camera",
    },
    alias: "/:pathMatch(.*)*"
  },
];

/**
 * 动态路由
 * 用来放置有权限 (Roles 属性) 的路由
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = []

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
