import useSWR from 'swr'
import { Coin } from '@/app/api/coin/[slug]/route'
const fetcher = (url:string) => fetch(url).then(r => r.json());

const useCoin = (symbol: string) => {
  const {data, error, isLoading} = useSWR<Coin, any, any>(`/api/coin/${symbol}`, fetcher);

  return {
    coin: data,
    isLoading,
    isError: error,
  }
}

export default useCoin
