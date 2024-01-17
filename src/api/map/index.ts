import { request } from "@/utils/service";
import type * as Map from "./types/index";

/**
 * 保存sourcemap
 * @param data 
 * @returns 
 */
export function sourcemapSave(data: Map.MapSaveRequestData) {
  return request<Map.MapSaveResponseData>({
    url: "/adm/sourcemap/save",
    method: "post",
    data,
  });
}

/**
 * sourcemap列表
 * @param data 
 * @returns 
 */
export function sourcemapList(data: Map.MapListRequestData) {
  return request<Map.MapListResponseData>({
    url: "/adm/sourcemap/list",
    method: "post",
    data,
  });
}

/**
 * sourcemap列表
 * @param data 
 * @returns 
 */
export function sourcemapVersionList(data: Map.MapVersionListRequestData) {
  return request<Map.MapVersionListResponseData>({
    url: "/adm/sourcemap/version/list",
    method: "post",
    data,
  });
}

/**
 * 解析错误
 * @param data 
 * @returns 
 */
export function sourcemapAnalysis(data: Map.MapAnalysisRequestData) {
  return request<Map.MapAnalysisResponseData>({
    url: "/adm/sourcemap/analysis",
    method: "post",
    data,
  });
}

