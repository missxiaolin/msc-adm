import { request } from "@/utils/service";
import type * as Performance from "./types/performance";

/**
 * 获取性能列表
 * @returns
 */
export function performanceList(data: Performance.PerformanceListRequestData) {
  return request<Performance.PerformanceListResponseData>({
    url: "/adm/performance/list",
    method: "post",
    data,
  });
}


/**
 * 页面平均性能
 * @param data 
 * @returns 
 */
export function performanceEchartByUrl(data: Performance.PerformanceEchartByUrlRequestData) {
  return request<Performance.PerformanceEchartByUrlResponseData>({
    url: "/adm/performance/echart/by/url",
    method: "post",
    data,
  });
}