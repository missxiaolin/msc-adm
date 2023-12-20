// js 列表
export interface JsListRequestData {
  pageUrl: string;
  errorMsg: string;
  startTime: string;
  endTime: string;
  pageSize: number;
  page: number;
}

export interface JsListItem {
  browserInfo: string;
  category: string;
  city: string;
  col: number;
  componentName: string;
  componentNameTrace: string;
  country: string;
  device: string;
  deviceModel: string;
  deviceType: string;
  errorMsg: string;
  happenTime: string;
  hook: string;
  ip: string;
  language: string;
  level: string;
  line: number;
  monitorAppId: string;
  netWork: string;
  os: string;
  pageUrl: string;
  propsData: string;
  province: string;
  screenHeight: string;
  screenWidth: number;
  simpleUrl: string;
  stackTraces: string;
  subType: string;
  type: string;
  userAgent: string;
  uuId: string;
}

export type JsListResponseData = ApiResponseData<{
  list: JsListItem[];
  count: number;
}>;

// js 每小时图表
export interface JsHourEchatsRequestData {
  pageUrl: string;
  errorMsg: string;
  startTime: string;
  endTime: string;
}

export interface JsHourEchatsItem {
    axisData: string[];
    seriesData: number[]
}

export type JsHourEchatsResponseData = ApiResponseData<JsHourEchatsItem>;
