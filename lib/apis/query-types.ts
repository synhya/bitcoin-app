import { lstat } from "node:fs";
import { satisfies } from "next/dist/lib/semver-noop";

export type CoinResponseData = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  cmc_rank: number;
  num_market_pairs: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  infinite_supply: boolean;
  last_updated: string;
  date_added: string;
  tags: string[]; // "mine able"
  platform: PlatformData | null;
  self_reported_circulating_supply: null;
  self_reported_market_cap: null;
  quote: {
    [convert: string]: PriceData;
  };
};

export type PriceData = {
  fully_diluted_market_cap: number;
  last_updated: string; // '2023-06-18T09:00:00.000Z'
  market_cap: number;
  market_cap_dominance: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_7d: number;
  percent_change_90d: number;
  price: number;
  tvl: unknown;
  volume_24h: number;
  volume_change_24h: number;
};

export type TableCoinData = {
  id: number;
  cmc_rank: number;
  name: string;
  symbol: string;
  percent_change_1h: number;
  percent_change_24h: number;
  price: number;
  price_KRW: number;
  market_cap: number;
  market_cap_KRW: number;
  price_key?: [number, number];
};

export type ConvertQueryParams = {
  amount: number;
  id?: string;
  symbol: string;

  convert: string;
};

//region Ticker

/*
For table. type is similar to quote
 */
export type TickerQueryParams = {
  start?: string;
  limit?: string;
  // "market_cap" is default
  sort?: (typeof TickerSort)[number];
  sort_dir?: "asc" | "desc";
  convert?: string; //
};

export type TickerResponse = {
  data: CoinResponseData[];
  status: any;
};

const TickerSort = [
  "name",
  "symbol",
  "date_added",
  "market_cap",
  "market_cap_strict",
  "price",
  "circulating_supply",
  "total_supply",
  "max_supply",
  "num_market_pairs",
  "volume_24h",
  "percent_change_1h",
  "percent_change_24h",
  "percent_change_7d",
  "market_cap_by_total_supply_strict",
  "volume_7d",
  "volume_30d",
] as const;

//endregion

//region IdMap

export type MapQueryParams = {
  listingStatus?: string;
  start?: number;
  limit?: number;
  symbol?: string;
  /*
    What field to sort the list of cryptocurrencies by
    valid values: "cmc_rank", "id"   // default is id
   */
  sort?: string;
};

export type IdMapResponse = {
  status: any;
  data: {
    id: number;
    rank: number;
    name: string;
    symbol: string;
    slug: string;
    is_active: 1 | 0; // 1 or 0
    first_historical_data: string; // "2013-04-28T18:47:21.000Z"
    last_historical_data: string; // "2013-04-28T18:47:21.000Z"
    platform: PlatformData | null;
  }[];
};

export type PlatformData = {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  token_address: string;
};

//endregion

//region Quote

export type QuoteQueryParams = {
  /*
  Optionally calculate market quotes in up to 120 currencies
  at once by passing a comma-separated list of cryptocurrency
  or fiat currency symbols.
   */
  convert?: string; // 'USD'
} & MetadataQueryParams;

export type QuoteResponse = {
  data: {
    [symbol: string]: CoinResponseData;
  };
  status: any;
};
//endregion

//region Metadata

/*
This information includes details like logo, description,
official website URL, social links,
and links to a cryptocurrency's technical documentation.
 */
export type MetadataQueryParams = {
  id?: string;
  slug?: string;
  symbol: string; // use as slug
};

export type MetadataResponse = {
  data: {
    [symbol: string]: CoinMetadata;
  };
  status: any;
};

export type CoinMetadata = {
  urls: {
    website: string[];
    source_code: string[];
    [name: string]: string[];
  };
  logo: string;
  id: 1;
  name: string;
  symbol: string;
  slug: string;
  description: string;
  date_added: string; // "2013-04-28T00:00:00.000Z"
  date_launched: string;
  tags: string[];
  platform: null;
  category: string;
};
//endregion
