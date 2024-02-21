import React, { Suspense } from "react";
import CoinDescriptionContainer from "@/components/coin-page-specific/coin-description-container";
import CoinTable from "@/components/coin-page-specific/coin-table";
import { CoinTableSkeleton } from "@/components/coin-page-specific/coin-table-skeleton";
import CoinDescriptionContainerSkeleton from "@/components/coin-page-specific/coin-description-container-skeleton";

type SearchParams = {
  query?: string;
  symbol?: string;
  page?: string;
  pageSize?: string;
};

export type PageProps = {
  page: number;
};

export const revalidate = 60;
export const fetchCache = "force-cache";

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
