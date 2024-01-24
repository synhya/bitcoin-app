import { AxiosRequestConfig } from 'axios'

export type Theme = "dark" | "light";

export type MapQueryParam = {
  listingStatus?: string,
  start?: string,
  limit?: string,
  symbol?: string,
  sort?: string
}

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}