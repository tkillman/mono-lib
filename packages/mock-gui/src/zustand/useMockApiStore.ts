import type { MockCase } from "../domain/MockCase";
import { create } from "zustand";

export type ApiInfo = {
  apiKey: string; // GET_path 형태로 API를 구분하는 키
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // HTTP 메소드
  path: string;
  apiTitle: string;
  mockCase: Array<MockCase>;
};

export type MockApi = {
  apiData: Record<string, ApiInfo>;
  setApi: (api: ApiInfo) => void;
};

export const useMockApiStore = create<MockApi>((set) => {
  return {
    apiData: {}, // 초기 상태 설정
    setApi: (api: ApiInfo) => {
      set((state) => {
        const newApiData = { ...state.apiData };
        newApiData[api.apiKey] = api; // apiKey를 키로 사용하여 api 정보를 저장
        return { apiData: newApiData };
      });
    },
  };
});
