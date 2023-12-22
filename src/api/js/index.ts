import { request } from "@/utils/service";
import type * as Js from "./types/index";

/**
 * js 每小时图表
 * @param data
 * @returns
 */
export function jsHourEchats(data: Js.JsHourEchatsRequestData) {
  return request<Js.JsHourEchatsResponseData>({
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

/**
 * js 错误 errorMsg 分组
 * @param data 
 * @returns 
 */
export function aggregateErrorByErrorMsg(data: Js.ErrorByErrorMsgRequestData) {
  return request<Js.ErrorByErrorMsgResponseData>({
    url: "/adm/js/aggregate/error/by/errormsg",
    method: "post",
    data,
  });
}