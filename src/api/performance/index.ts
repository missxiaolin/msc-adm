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
