import { request } from "@/utils/service";
import type * as Page from "./types/page";

/**
 * 图表数据
 * @param data 
 * @returns 
 */
export function pageHour(data: Page.PageHourRequestData) {
  return request<Page.PageHourResponseData>({
    url: "/adm/page/hours/list",
    method: "post",
    data,
  });
}
