export interface UserBehaviorRequestData {
  uuId: string;
  categorys: string[];
  startTime: string;
  endTime: string;
  page: number;
  pageSize: number;
}

export type UserBehaviorResponseData = ApiResponseData<{
  pageDetail: {
    ip: string;
    uuId: string;
    userAgent: string;
    deviceType: string;
    os: string;
    browserInfo: string;
    device: string;
    deviceModel: string;
    language: string;
    netWork: string;
    country: string;
    province: string;
    city: string;
  },
  userList: any
  count: number
}>;
