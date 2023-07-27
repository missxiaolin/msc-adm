import CacheKey from "@/constants/cache-key";
import { type SidebarOpened, type SidebarClosed } from "@/constants/app-key";
import { type LayoutSettings } from "@/config/layouts";
import { type ThemeName } from "@/hooks/useTheme"

export const removeConfigLayout = () => {
  localStorage.removeItem(CacheKey.CONFIG_LAYOUT);
};

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

export const setConfigLayout = (settings: LayoutSettings) => {
  localStorage.setItem(CacheKey.CONFIG_LAYOUT, JSON.stringify(settings));
};

//#region 系统布局配置
export const getConfigLayout = () => {
  const json = localStorage.getItem(CacheKey.CONFIG_LAYOUT);
  return json ? (JSON.parse(json) as LayoutSettings) : null;
};

//#region 正在应用的主题名称
export const getActiveThemeName = () => {
  return localStorage.getItem(CacheKey.ACTIVE_THEME_NAME) as ThemeName | null;
};
export const setActiveThemeName = (themeName: ThemeName) => {
  localStorage.setItem(CacheKey.ACTIVE_THEME_NAME, themeName);
};
