// 图表数据
export interface PageHourRequestData {
  startTime: string;
  endTime: string;
}

export type PageHourResponseData = ApiResponseData<any>;

// 综合图表数据
export interface PageEchartByUuIdRequestData {
  startTime: string;
  endTime: string;
  limit: number;
}

export type PageEchartByUuIdResponseData = ApiResponseData<any>;