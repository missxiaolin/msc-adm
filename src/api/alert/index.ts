import { request } from "@/utils/service";
import type * as Alert from "./modules/index";

/**
 * 项目列表
 * @param data
 * @returns
 */
export function alertList(data: Alert.AlertListRequestData) {
  return request<Alert.AlertListResponseData>({
    url: "/adm/alert/list",
    method: "post",
    data,
  });
}

/**
 * 告警保存
 * @returns
 */
export function alertSave(data: Alert.AlertSaveRequestData) {
  return request<Alert.AlertSaveResponseData>({
    url: "/adm/alert/save",
    method: "post",
    data,
  });
}

/**
 * 告警历史
 * @param data
 * @returns
 */
export function aleryHistory(data: Alert.AleryHistoryRequestData) {
  return request<Alert.AleryHistoryResponseData>({
    url: "/adm/alert/history/list",
    method: "post",
    data,
  });
}
