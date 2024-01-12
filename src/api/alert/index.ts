import { request } from "@/utils/service";
import type * as Alert from "./modules/index";

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
