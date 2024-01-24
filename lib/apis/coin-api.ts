import axios from 'axios'
import { MapQueryParam, Payment } from '@/lib/types'
import { cryptoPath } from '@/lib/apis/path'

const cryptoApiHeaders = {
  "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_COIN_MARKET_API_KEY,
};

export const getIdMap = async (params: MapQueryParam) => {
  try {
    const res = await axios.get(
      cryptoPath.idMapUrl,
      {
        headers: cryptoApiHeaders,
        params: params
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getPayment = async ():Promise<Payment[]> => {
  // fetch
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "489e1d42",
      amount: 125,
      status: "processing",
      email: "example@gmail.com",
    },
    // ...
  ];
}