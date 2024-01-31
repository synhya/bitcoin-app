import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type PageState = {
  pageSize: number,
  setPageState: (pageSize: number) => void,
}

export const usePage = create(
  persist<PageState>(
    (set) => ({
      pageSize: 10,
      setPageState: (newPageSize) =>
        set(() => ({
          pageSize: newPageSize,
        })),
    }), {
      name: "page"
    },
  )
)