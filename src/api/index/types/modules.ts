export interface AnalyseCoreRequestData {
  analyseTime: string;
}

export interface AnalyseCoreResponse {
  todayData: {
    pvCount: number;
    uvCount: number;
    newUvCount: number;
    ipCounct: number;
    jumpCount: number;
    visitFrequency: number;
  };
  yesterdayData: {
    pvCount: number;
    uvCount: number;
    newUvCount: number;
    ipCounct: number;
    jumpCount: number;
    visitFrequency: number;
  };
}

export type AnalyseCoreResponseData = ApiResponseData<AnalyseCoreResponse>;
