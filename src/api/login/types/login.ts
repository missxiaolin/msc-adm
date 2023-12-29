export interface LoginRequestData {
  /** admin 或 editor */
  username: string;
  /** 密码 */
  password: string;
}

export type LoginResponseData = ApiResponseData<{
  token: string;
  userId: number;
  projectAll: {
    id: number,
    name: string,
    desc: string,
    monitorAppId: string,
    watch: string,
    maxQueues: number,
    projectType: string,
    encryption: string,
    delay: number,
    status: number,
    startTime: number,
    updateTime: number
  }[]
}>;
