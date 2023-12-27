// 项目保存
export interface ProjectSaveRequestData {
  id?: number;
  name: string; // 应用名称
  desc: string; // 应用说明
  monitorAppId: string; // 项目ID
  projectType: number; // 项目类型
  delay: number; // 应用间隔
  encryption: number; // 是否加密
  watch?: string[];
  maxQueues: number; // 上报条数
}

export type ProjectSaveResponseData = ApiResponseData<any>;

// 项目列表
export interface ProjectListRequestData {
    page: number;
    pageSize: number;
}

export type ProjectListResponseData = ApiResponseData<any>;