import router from "@/router";
import NProgress from "nprogress";
import { getToken } from "@/utils/cache/cookies";
import isWhiteList from "@/config/white-list"

import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

router.beforeEach(async (to: any, _from: any, next: any) => {
  NProgress.start();
  if (getToken()) {
    if (to.path === "/login") {
        // 如果已经登录，并准备进入 Login 页面，则重定向到主页
        next({ path: "/" })
        NProgress.done()
      } else {
        // 检查用户是否已获得其权限角色
      }
  } else {
    // 如果没有 Token
    if (isWhiteList(to)) {
      // 如果在免登录的白名单中，则直接进入
      next();
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next("/login");
      NProgress.done();
    }
  }
});
