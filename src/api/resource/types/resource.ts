export interface ResourceListRequestData {
    pageUrl: string;
    startTime: string;
    endTime: string;
    pageSize: number;
    page: number;
    url: string;
    resourceType: string;
  }
  
  export interface ResourceResponseData {
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
    errorMsg: string;
    url: string;
    html: string;
    resourceType: string;
    paths: string;
  }
  
  export type ResourceListResponseData = ApiResponseData<{
    list: ResourceResponseData[];
    count: number;
  }>;
  