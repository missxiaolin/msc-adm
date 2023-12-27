import { defineStore } from "pinia";
import { setCookie, getCookie } from "@/utils/cache/cookies";
import { projectAllList } from "@/api/project";
export const useGeneralStore = defineStore({
  id: "app-general",
  state: (): any => ({
    projectList: <any>getCookie("PROJECT_ALL") ? JSON.parse(getCookie("PROJECT_ALL") || "[]") : [], // 项目列表
    currentProjectId: <any>getCookie("PROJECT_ID") || "", // 当前菜单
    refreshTimer: <any>null,
    manualRefresh: <boolean>false
  }),
  getters: {
    // 获取菜单列表
    getProjectList(): any {
      return this.projectList;
    },
    getCurrentProjectId(): any {
      return this.currentProjectId
    },
    getManualRefresh(): boolean {
      return this.manualRefresh
    }
  },
  actions: {
    setCurrentProject(monitorAppId: string) {
      this.currentProjectId = monitorAppId;
      setCookie("PROJECT_ID", monitorAppId);
    },
    /**
     * 保存项目数据
     * @param projectList
     */
    setProjectList(projectList: any) {
      this.projectList = projectList;
      setCookie("PROJECT_ALL", JSON.stringify(projectList));
      let currentProject = projectList[0]?.monitorAppId;
      if (currentProject && !getCookie("PROJECT_ID")) {
        this.currentProjectId = currentProject.monitorAppId;
        setCookie("PROJECT_ID", currentProject.monitorAppId);
      }
    },
    // 获取系统有效的应用
    async getValidProject() {
      let res = await projectAllList()
      if (!res.success) {
        return
      }
      this.setProjectList(res.model)
    },
    // 手动刷新
		setManualRefresh() {
			if (this.refreshTimer) return;
			this.manualRefresh = true;
			this.refreshTimer = setTimeout(() => {
				this.manualRefresh = false;
				this.refreshTimer = null;
				clearTimeout(this.refreshTimer);
			}, 100);
		},
  },
});
