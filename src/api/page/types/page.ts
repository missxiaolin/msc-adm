// 图表数据
export interface PageHourRequestData {
  startTime: string;
  endTime: string;
}

export type PageHourResponseData = ApiResponseData<{
  pvTotal: number;
  uvTotal: number;
  axisData: string[];
  seriesData: {
    data: number[];
  }[];
}>;

// 综合图表数据
export interface PageEchartByUuIdRequestData {
  startTime: string;
  endTime: string;
  limit?: number;
  simpleUrl?: string;
}

export type PageEchartByUuIdResponseData = ApiResponseData<{
  browser: {
    axisData: string[];
    seriesData: number[];
  };
  cregion: {
    axisData: string[];
    seriesData: number[];
  };
  device: {
    axisData: string[];
    seriesData: number[];
  };
  os: {
    axisData: string[];
    seriesData: number[];
  };
  screen: {
    axisData: string[];
    seriesData: number[];
  };
  simpleUrl: {
    axisData: string[];
    seriesData: number[];
  };
}>;

// 地图数据
export interface PageGeoDistributionRequestData {
  startTime: string;
  endTime: string;
  simpleUrl?: string;
}

export type PageGeoDistributionResponseData = ApiResponseData<
  {
    name: string;
    value: number;
  }[]
>;

// 分页
export interface PageListRequestData {
  startTime: string;
  endTime: string;
  simpleUrl: string;
  pageSize: number;
  page: number;
}

export interface PageListItem {
  count: number;
  pvCount: number;
  list: {
    pageCount: number;
    simpleUrl: string;
  }[];
}

export type PageListResponseData = ApiResponseData<PageListItem>;
