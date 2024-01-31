// 项目列表
export interface RecordscreenListRequestData {
    page: number;
    pageSize: number;
    simpleUrl: string;
}

export type RecordscreenListResponseData = ApiResponseData<any>;