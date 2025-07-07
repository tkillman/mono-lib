import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type MockApiOnOffStore = {
  apiOnOff: Record<string, boolean>; // apiKey를 키로 사용하여 on/off 상태를 저장
  setApiOnOff: (apiKey: string, isOn: boolean) => void;
};

export const useMockApiOnOffStore = create<MockApiOnOffStore>()(
  persist(
    (set) => ({
      apiOnOff: {},
      setApiOnOff: (apiKey, isOn) => {
        set((state) => ({
          apiOnOff: {
            ...state.apiOnOff,
            [apiKey]: isOn, // apiKey를 키로 사용하여 상태 업데이트
          },
        }));
      },
    }),
    {
      name: 'mock-api-on-off-storage', // 저장소 이름
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
