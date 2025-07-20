import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface MockSelectStore {
  selectedApi: Record<string, string>; // apiKey를 키로 사용하여 label 저장
  setSelectedApi: (apiKey: string, label: string) => void;
  clear: () => void;
}

export const useMockSelectStore = create<MockSelectStore>()(
  persist(
    (set) => ({
      selectedApi: {},
      setSelectedApi: (apiKey, label) => {
        set((state) => ({
          selectedApi: {
            ...state.selectedApi,
            [apiKey]: label, // apiKey를 키로 사용하여 label 저장
          },
        }));
      },
      clear: () => {
        set({ selectedApi: {} }); // selectedApi 상태를 초기화
      },
    }),
    {
      name: "mock-select-storage", // 저장소 이름
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
