import CacheKey from "@/constants/cache-key";
import { type SidebarOpened, type SidebarClosed } from "@/constants/app-key"

/**
 * region 侧边栏状态
 * @returns 
 */
export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS);
};
/**
 * @param sidebarStatus 
 */
export const setSidebarStatus = (
  sidebarStatus: SidebarOpened | SidebarClosed
) => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus);
};
