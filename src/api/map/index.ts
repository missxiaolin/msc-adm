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
