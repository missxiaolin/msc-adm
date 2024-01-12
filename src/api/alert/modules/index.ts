export interface AlertSaveRequestData {
  id?: number;
  project_id: number | string; // 项目ID
  error_type: string; // 错误类型
  error_name: string; // 错误名称
  time_range_s: number | string; // 报警时间范围
  max_error_count: number | string; // 报警错误阈值
  alarm_interval_s: number | string; // 报警时间间隔
  is_enable: number; // 是否开启本条报警配置1：是0：否
  note: string; // 配置说明
  startHour: string; // 告警时间点
  endHour: string; // 告警时间点
}

export type AlertSaveResponseData = ApiResponseData<any>;
