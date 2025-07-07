import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type MockGuiStore = {
  isAllOn: boolean;
  setIsAllOn: (isAllOn: boolean) => void;
};

export const useMockGuiStore = create<MockGuiStore>()(
  persist(
    (set) => ({
      isAllOn: false,
      setIsAllOn: (isAllOn: boolean) => {
        set({ isAllOn });
      },
    }),
    {
      name: 'mock-gui-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
