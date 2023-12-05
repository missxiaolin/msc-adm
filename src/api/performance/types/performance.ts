export interface PerformanceListRequestData {
  pageUrl: string;
  startTime: string;
  endTime: string;
  pageSize: number;
  page: number;
}

export interface PerformanceListData {
  monitorAppId: string;
  userAgent: string;
  uuId: string;
  level: string;
  category: string;
  happenTime: string;
  deviceType: string;
  os: string;
  browserInfo: string;
  device: string;
  deviceModel: string;
  screenHeight: number;
  screenWidth: number;
  language: string;
  netWork: string;
  country: string;
  province: string;
  city: string;
  pageUrl: string;
  simpleUrl: string;
  fcp: string;
  fp: string;
  fmp: string;
  lcp: string;
  nt: string;
  rf: string;
}

export type PerformanceListResponseData = ApiResponseData<{
  list: PerformanceListData[];
  count: number;
}>;
