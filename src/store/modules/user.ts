import { ref } from "vue";
import { resetRouter } from "@/router";
import { useTagsViewStore } from "./tags-view";
import { useSettingsStore } from "./settings";
import { defineStore } from "pinia";
import { type LoginRequestData } from "@/api/login/types/login";
import { loginApi } from "@/api/login";
import { setToken, getToken, removeToken, setCookie } from "@/utils/cache/cookies";
import { useGeneralStore } from "@/store/modules/general";
const generalStore = useGeneralStore();

export const useUserStore = defineStore("user", () => {
  const token = ref<string>(getToken() || "");
  const tagsViewStore = useTagsViewStore();
  const settingsStore = useSettingsStore();

  /** 登录 */
  const login = async ({ username, password }: LoginRequestData) => {
    const { model, success } = await loginApi({ username, password });
    if (success) {
      setToken(model.token);
      token.value = model.token || "";
      setCookie('userId', model.userId || "")
      generalStore.setProjectList(model.projectAll || []);
    }
  };

  /** 登出 */
  const logout = () => {
    removeToken();
    token.value = "";
    resetRouter();
    _resetTagsView();
  };

  /** 重置 Token */
  const resetToken = () => {
    removeToken();
    token.value = "";
  };

  /** 重置 Visited Views 和 Cached Views */
  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews();
      tagsViewStore.delAllCachedViews();
    }
  };

  return { login, logout, resetToken };
});
