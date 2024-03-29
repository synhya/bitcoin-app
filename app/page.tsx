import React, { Suspense } from "react";
import CoinDescriptionContainer from "@/components/coin-page-specific/coin-description-container";
import CoinTable from "@/components/coin-page-specific/coin-table";
import { CoinTableSkeleton } from "@/components/coin-page-specific/coin-table-skeleton";

type SearchParams = {
  query?: string;
  symbol?: string;
  page?: string;
  pageSize?: string;
};

export type PageProps = {
  page: number;
};

const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const symbol = searchParams?.symbol ?? "BTC";

  return (
    <div className={"justify-center flex flex-col items-center"}>
      <CoinDescriptionContainer symbol={symbol} />
      {/*<Suspense key="1" fallback={<CoinDescriptionContainerSkeleton />}>*/}
      {/*</Suspense>*/}
      <Suspense fallback={<CoinTableSkeleton />}>
        <CoinTable />
      </Suspense>
    </div>
  );
};

export default Page;
