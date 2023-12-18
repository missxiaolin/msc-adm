import { request } from "@/utils/service";
import type * as Index from "./types/modules";

/**
 * 获取首页数据
 * @returns
 */
export function indexAnalyseCore(data: Index.AnalyseCoreRequestData) {
  return request<Index.AnalyseCoreResponseData>({
    url: "/adm/analyse/core",
    method: "post",
    data,
  });
}
