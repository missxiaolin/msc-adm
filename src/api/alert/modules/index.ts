export interface AlertSaveRequestData {
  id?: number;
  serviceType: string; // 报警类别 = > <
  whereType: string; // sum avg
  errorType: string; // 错误类型
  errorName: string; // 错误名称
  timeRangeS: number | string; // 报警时间范围
  maxErrorCount: number | string; // 报警错误阈值
  alarmIntervalS: number | string; // 报警时间间隔
  isEnable: number; // 是否开启本条报警配置1：是0：否
  note: string; // 配置说明
  startHour: string; // 告警时间点
  endHour: string; // 告警时间点
}

export type AlertSaveResponseData = ApiResponseData<any>;

export interface AlertListRequestData {
  page: number;
  pageSize: number;
}

export type AlertListResponseData = ApiResponseData<any>;
