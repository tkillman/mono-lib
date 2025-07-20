import type { SELECT_API_METHOD } from "src/domain/API_METHOD.domain";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type SearchStoreState = {
  searchMethod: SELECT_API_METHOD;
};
interface SearchStoreStateActions {
  setSearchMethod: (method: SELECT_API_METHOD) => void;
  clear: () => void;
}

export const useSearchStore = create<
  SearchStoreState & SearchStoreStateActions
>()(
  persist(
    (set) => ({
      searchMethod: "ALL", // Default value for search method
      setSearchMethod: (method: SELECT_API_METHOD) => {
        set({ searchMethod: method });
      },
      clear: () => {
        set({ searchMethod: "ALL" }); // Reset to default value
      },
    }),
    {
      name: "mock-search-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
