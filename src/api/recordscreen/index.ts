import { request } from "@/utils/service";
import type * as Recordscreen from "./types/modules";

/**
 * 项目列表
 * @returns
 */
export function recordscreenList(data: Recordscreen.RecordscreenListRequestData) {
  return request<Recordscreen.RecordscreenListResponseData>({
    url: "/adm/recordscreen/list",
    method: "post",
    data,
  });
}


export function recordscreenDetail(data: Recordscreen.RecordscreenDetailRequestData) {
  return request<Recordscreen.RecordscreenDetailResponseData>({
    url: "/adm/recordscreen/video",
    method: "post",
    data,
  });
}