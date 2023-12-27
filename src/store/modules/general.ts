import { defineStore } from "pinia";
import { setCookit, getCookit } from "@/utils/cache/cookies";
import { projectAllList } from "@/api/project";
export const useGeneralStore = defineStore({
  id: "app-general",
  state: (): any => ({
    projectList: <any>getCookit("PROJECT_ALL") ? JSON.parse(getCookit("PROJECT_ALL") || "[]") : [], // 项目列表
    currentProjectId: <any>getCookit("PROJECT_ID") || "", // 当前菜单
  }),
  getters: {
    // 获取菜单列表
    getProjectList(): any {
      return this.projectList;
    },
    getCurrentProjectId(): any {
      return this.currentProjectId
    }
  },
  actions: {
    setCurrentProject(monitorAppId: string) {
      this.currentProjectId = monitorAppId;
      setCookit("PROJECT_ID", monitorAppId);
    },
    /**
     * 保存项目数据
     * @param projectList
     */
    setProjectList(projectList: any) {
      this.projectList = projectList;
      setCookit("PROJECT_ALL", JSON.stringify(projectList));
      let currentProject = projectList[0]?.monitorAppId;
      if (currentProject && !getCookit("PROJECT_ID")) {
        this.currentProjectId = currentProject.monitorAppId;
        setCookit("PROJECT_ID", currentProject.monitorAppId);
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
  },
});
