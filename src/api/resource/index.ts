import { request } from "@/utils/service";
import type * as Resource from "./types/resource";

/**
 * 获取资源错误列表
 * @returns
 */
export function resourceList(data: Resource.ResourceListRequestData) {
  return request<Resource.ResourceListResponseData>({
    url: "/adm/resource/list",
    method: "post",
    data,
  });
}

/**
 * 图表数据
 * @param data 
 * @returns 
 */
export function resourceHour(data: Resource.ResourceHourRequestData) {
  return request<Resource.ResourceHourResponseData>({
    url: "/adm/resource/hour",
    method: "post",
    data,
  });
}
