import { request } from "@/utils/service";
import type * as UserBehavior from "./modules/index";

/**
 * 用户行为记录
 * @returns
 */
export function userBehavior(data: UserBehavior.UserBehaviorRequestData) {
  return request<UserBehavior.UserBehaviorResponseData>({
    url: "/adm/get/user/behavior",
    method: "post",
    data,
  });
}
