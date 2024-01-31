// 项目列表
export interface RecordscreenListRequestData {
  page: number;
  pageSize: number;
  simpleUrl: string;
  startTime: string;
  endTime: string;
}

export type RecordscreenListResponseData = ApiResponseData<any>;


// 项目详情
export interface RecordscreenDetailRequestData {
  id: number
}

export type RecordscreenDetailResponseData = ApiResponseData<any>;
