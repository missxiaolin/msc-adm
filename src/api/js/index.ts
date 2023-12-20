import { request } from "@/utils/service";
import type * as Js from "./types/index";

/**
 * js 每小时图表
 * @param data
 * @returns
 */
export function jsHourEchats(data: Js.JsListRequestData) {
  return request<Js.JsListResponseData>({
    url: "/adm/js/echart/hour",
    method: "post",
    data,
  });
}

/**
 * js 表格
 * @returns
 */
export function jsList(data: Js.JsListRequestData) {
  return request<Js.JsListResponseData>({
    url: "/adm/js/list",
    method: "post",
    data,
  });
}
