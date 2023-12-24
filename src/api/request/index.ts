import { request } from "@/utils/service";
import type * as Api from "./types/modules";

/**
 * api 数据
 * @returns
 */
export function apiAgregateList(data: Api.ApiAgregateListRequestData) {
  return request<Api.ApiAgregateListResponseData>({
    url: "/adm/api/agregate/list",
    method: "post",
    data,
  });
}