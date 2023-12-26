import { request } from "@/utils/service";
import type * as Project from "./types/modules";

/**
 * 项目保存
 * @returns
 */
export function projectSave(data: Project.ProjectSaveRequestData) {
  return request<Project.ProjectSaveResponseData>({
    url: "/adm/project/save",
    method: "post",
    data,
  });
}