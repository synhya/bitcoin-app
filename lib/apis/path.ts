

const version = 'v1';
const baseUrl = process.env.NEXT_PUBLIC_COIN_MARKET_API_URL + '/' + version;
export const cryptoPath = {
  idMapUrl: baseUrl + '/cryptocurrency/map',
  metadataUrl: baseUrl + '/cryptocurrency/info',
  tickersUrl: baseUrl + '/cryptocurrency/listings/latest',
  quotesUrl: baseUrl + '/cryptocurrency/quotes/latest',
  globalUrl: baseUrl + '/global-metrics/quotes/latest',
}