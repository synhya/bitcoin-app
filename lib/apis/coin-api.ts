import 'server-only'
import axios from 'axios'
import { cryptoPath } from '@/lib/apis/path'
import {
  IdMapResponse,
  MapQueryParams,
  QuoteResponse,
  QuoteQueryParams,
  MetadataResponse, MetadataQueryParams,
  TickerQueryParams, TickerResponse, TableCoinData, ResponseCoinData
} from '@/lib/apis/query-types'

const cryptoApiHeaders = {
  "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_COIN_MARKET_API_KEY,
};

export const getIdMap = async (params: MapQueryParams) => {
  try {
    const res = await axios.get<IdMapResponse>(
      cryptoPath.idMapUrl,
      {
        headers: cryptoApiHeaders,
        params: params
    });

    console.log(res.data.data);

    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get Id Map');
  }
}

/// for specific coin info
export const getQuotes = async (params: QuoteQueryParams) => {
  try {
    const res = await axios.get<QuoteResponse>(
      cryptoPath.quotesUrl,
      {
        headers:cryptoApiHeaders,
        params: params
      }
    )
    return refactorToTableData(res.data.data[params.id], params.convert ?? 'USD');
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get Quotes');
  }
}

/// for table filling
export const getTableData = async (params: TickerQueryParams) => {
  try {
    const res = await axios.get<TickerResponse>( //
      cryptoPath.tickersUrl,
      {
        headers:cryptoApiHeaders,
        params: params
      }
    )

    return res.data.data.map((data) => (
      refactorToTableData(data, params.convert ?? 'USD')
    ))
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get Table Data');
  }
}

// for description
export const getMetadata = async (params: MetadataQueryParams) => {
  try {
    const res = await axios.get<MetadataResponse>(
      cryptoPath.metadataUrl,
      {
        headers:cryptoApiHeaders,
        params: params
      }
    )
    const data = res.data;
    return data.data[params.id];
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get Meta data');
  }
}


const refactorToTableData = (coinData: ResponseCoinData, convert: string):TableCoinData => {
  const quoteData = coinData.quote[convert];

  return {
    id: coinData.id,
    cmc_rank: coinData.cmc_rank,
    name: coinData.name,
    symbol: coinData.symbol,
    percent_change_1h: quoteData.percent_change_1h,
    percent_change_24h: quoteData.percent_change_24h,
    price: quoteData.price,
    market_cap: quoteData.market_cap,
  };
}