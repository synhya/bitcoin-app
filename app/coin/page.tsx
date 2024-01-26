import React from "react";
import { getMetadata, getTableData } from '@/lib/apis/coin-api'
import CoinDataPanel from '@/app/coin/panel'
import { MetadataQueryParams, TickerQueryParams } from '@/lib/apis/query-types'
import CoinTable from '@/app/coin/coin-table'

const Page = async ({
  searchParams,
}: {
  searchParams? :{
    query?: string,
    page?: string,
  }
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const queryParam: TickerQueryParams = {
    start: 1,
    limit: 10, // page size would be great
  }

  const tableCoinData = await getTableData(queryParam);

  return (
    <div className={"justify-center flex flex-col items-center"}>
      <CoinDataPanel />
      <CoinTable coinData={tableCoinData} searchParams={searchParams?.query ?? ""} />
    </div>
  );
};

export default Page;
