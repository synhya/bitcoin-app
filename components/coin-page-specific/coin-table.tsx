import React from "react";
import { columns } from "@/components/coin-page-specific/coin-table-columns";
import { DataTable } from "@/components/ui/data-table";
import { TickerQueryParams } from "@/lib/apis/query-types";
import { getTableData } from "@/lib/apis/coin-api";
import { PageProps } from "@/app/page";

const CoinTable = async () => {
  const queryParam: TickerQueryParams = {
    start: "1",
    limit: "500", // page size would be great
  };

  const tableCoinData = await getTableData(queryParam);

  return <DataTable columns={columns} data={tableCoinData} />;
};

export default CoinTable;
