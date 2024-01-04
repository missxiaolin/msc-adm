// 获取性能列表
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
  project: {
    id: number;
    name: string;
    desc: string;
    monitorAppId: string;
    watch: string;
    cookieUserKey: string;
    maxQueues: number;
    projectType: string;
    encryption: string;
    delay: number;
    status: number;
    startTime: string;
    updateTime: string;
  };
}>;

// 页面平均性能
export interface PerformanceEchartByUrlRequestData {
  startTime: string;
  endTime: string;
  simpleUrl?: string;
}

export type PerformanceEchartByUrlResponseData = ApiResponseData<{
  NT: {
    FP: number;
    TTI: number;
    DomReady: number;
    Load: number;
    FirseByte: number;
    DNS: number;
    TCP: number;
    SSL: number;
    TTFB: number;
    Trans: number;
    DomParse: number;
    Res: number;
  };
  FP: {
    startTime: number;
  };
  FCP: {
    startTime: number;
  };
}>;
