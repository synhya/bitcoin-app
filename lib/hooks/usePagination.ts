import { create } from "zustand";
import { persist } from "zustand/middleware";

type PageSizeState = {
  pageSize: number;
  setPageSizeState: (pageSize: number) => void;
};

export const usePageSize = create(
  persist<PageSizeState>(
    (set) => ({
      pageSize: 10,
      setPageSizeState: (newPageSize) =>
        set(() => ({
          pageSize: newPageSize,
        })),
    }),
    {
      name: "pageSize",
    },
  ),
);

type PageIndexState = {
  pageIndex: number;
  setPageIndexState: (pageSize: number) => void;
};

export const usePageIndex = create(
  persist<PageIndexState>(
    (set) => ({
      pageIndex: 0,
      setPageIndexState: (pageIndex) =>
        set(() => ({
          pageIndex: pageIndex,
        })),
    }),
    {
      name: "pageIndex",
    },
  ),
);
