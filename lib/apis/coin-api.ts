import "server-only";
import axios from "axios";
import { cryptoPath } from "@/lib/apis/path";
import {
  IdMapResponse,
  MapQueryParams,
  QuoteResponse,
  QuoteQueryParams,
  MetadataResponse,
  MetadataQueryParams,
  TickerQueryParams,
  TickerResponse,
  TableCoinData,
  CoinResponseData,
  ConvertQueryParams,
  CoinMetadata,
} from "@/lib/apis/query-types";
import { unstable_noStore } from "next/cache";

const cryptoApiHeaders = {
  "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_COIN_MARKET_API_KEY ?? "",
};

export const getIdMap = async (params: MapQueryParams) => {
  try {
    const res = await axios.get<IdMapResponse>(cryptoPath.idMapUrl, {
      headers: cryptoApiHeaders,
      params: params,
    });

    console.log(res.data.data);

    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Id Map");
  }
};

/// for specific coin info
export const getQuotes = async (
  params: QuoteQueryParams,
): Promise<CoinResponseData> => {
  try {
    const res = await fetch(
      `${cryptoPath.quotesUrl}?${new URLSearchParams(params)}`,
      {
        method: "GET",
        headers: cryptoApiHeaders,
        next: {
          revalidate: 60,
        },
        cache: "force-cache",
      },
    )
      .then((r) => r.json())
      .then((r) => r.data);

    return res[params.symbol]; // params.id
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Quotes");
  }
};

/// for table filling
export const getTableData = async (
  params: TickerQueryParams,
): Promise<TableCoinData[]> => {
  const krwParams: TickerQueryParams = {
    ...params,
    convert: "KRW",
  };

  try {
    // <TickerResponse>
    const [resUSD, resKRW] = await Promise.all([
      fetch(`${cryptoPath.tickersUrl}?${new URLSearchParams(params)}`, {
        method: "GET",
        headers: cryptoApiHeaders,
        next: {
          revalidate: 60,
        },
        cache: "force-cache",
      })
        .then((r) => r.json())
        .then<CoinResponseData[]>((r) => r.data),
      fetch(`${cryptoPath.tickersUrl}?${new URLSearchParams(krwParams)}`, {
        method: "GET",
        headers: cryptoApiHeaders,
        next: {
          revalidate: 60,
        },
        cache: "force-cache",
      })
        .then((r) => r.json())
        .then<CoinResponseData[]>((r) => r.data),
    ]);

    return resUSD.map((data, idx) =>
      refactorToTableData(data, resKRW[idx], params.convert ?? "USD"),
    );
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Table Data");
  }
};

// for description
export const getMetadata = async (
  params: MetadataQueryParams,
): Promise<CoinMetadata> => {
  try {
    const res = await fetch(
      `${cryptoPath.metadataUrl}?${new URLSearchParams(params)}`,
      {
        method: "GET",
        headers: cryptoApiHeaders,
        next: {
          revalidate: 60,
        },
        cache: "force-cache",
      },
    )
      .then((r) => r.json())
      .then((r) => r.data);

    return res[params.symbol];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Meta data");
  }
};

/// set amount to 1
export const getPriceConversion = async (
  params: ConvertQueryParams,
): Promise<number> => {
  try {
    const res = await axios.get(cryptoPath.toolsUrl, {
      headers: cryptoApiHeaders,
      params: params,
    });
    return res.data.data.quote[params.symbol].price;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to convert price");
  }
};

const refactorToTableData = (
  coinData: CoinResponseData,
  coinDataKRW: CoinResponseData,
  convert: string,
): TableCoinData => {
  // separate by comma.
  const quoteData = coinData.quote[convert];
  const quoteDataKRW = coinDataKRW.quote["KRW"];

  return {
    id: coinData.id,
    cmc_rank: coinData.cmc_rank,
    name: coinData.name,
    symbol: coinData.symbol,
    percent_change_1h: quoteData.percent_change_1h,
    percent_change_24h: quoteData.percent_change_24h,
    price: quoteData.price,
    price_KRW: quoteDataKRW.price, // convert later
    market_cap: quoteData.market_cap,
    market_cap_KRW: quoteDataKRW.market_cap,

    price_key: [quoteData.price, quoteDataKRW.price], // for table
  };
};
