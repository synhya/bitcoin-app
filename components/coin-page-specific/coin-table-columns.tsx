"use client";
import { Column, ColumnDef } from "@tanstack/table-core";
import { DataTableColumnButtonHeader } from "@/components/ui/data-table-components";
import React from "react";
import { TableCoinData } from "@/lib/apis/query-types";
import Image from "next/image";
import { number } from "prop-types";
import { cn } from "@/lib/utils";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";

const rank: keyof TableCoinData = "cmc_rank";
const name: keyof TableCoinData = "name";
const symbol: keyof TableCoinData = "symbol";
const price: keyof TableCoinData = "price";
const price_KRW: keyof TableCoinData = "price_KRW";
const percent_change_1h: keyof TableCoinData = "percent_change_1h";
const percent_change_24h: keyof TableCoinData = "percent_change_24h";
const market_cap: keyof TableCoinData = "market_cap";
const market_cap_KRW: keyof TableCoinData = "market_cap_KRW";

export const columnKeys = {
  rank,
  name,
  symbol,
  price,
  percent_change_1h,
  percent_change_24h,
  market_cap_KRW,
  market_cap,
  id: "id" as keyof TableCoinData,
};

export const columns: ColumnDef<TableCoinData, unknown>[] = [
  {
    accessorKey: columnKeys.id,
  },
  {
    accessorKey: rank,
    header: ({ column }) => (
      <DataTableColumnButtonHeader column={column} title="순위" />
    ),
    cell: ({ row }) => {
      const rowValue = row.getValue<string>(rank);
      return <div className="font-medium pl-2.5">{rowValue}</div>;
    },
  },
  {
    accessorKey: name,
    header: ({ column }) => (
      <DataTableColumnButtonHeader
        column={column}
        title="이름"
        className="text-left"
      />
    ),
    cell: ({ row, table }) => {
      const coinName = row.getValue<string>(name);
      const coinSymbol = row.getValue<string>(symbol);
      return (
        <div className={cn("text-left font-medium truncate")}>
          <p className="block truncate">{coinName}</p>
          <p className="text-foreground/60 text-xs">{coinSymbol}</p>
        </div>
      );
    },
  },
  {
    id: "symbol",
    accessorKey: symbol,
  },
  {
    accessorKey: price,
    header: ({ column }) => (
      <DataTableColumnButtonHeader
        column={column}
        title="가격"
        className="text-right"
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>(price);
      const amountKRW = row.getValue<number>(price_KRW);

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumSignificantDigits: amount < 1 ? 2 : undefined,
        maximumSignificantDigits: amount < 1 ? 2 : undefined,
      }).format(amount);

      const formattedKRW = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
        minimumSignificantDigits: amountKRW < 10 ? 2 : undefined,
        maximumSignificantDigits: amountKRW < 10 ? 2 : undefined,
      }).format(amountKRW);

      return (
        <div className="text-right font-medium truncate">
          <p className="truncate">{formatted}</p>
          <p className="text-foreground/60 text-xs truncate">{formattedKRW}</p>
        </div>
      );
    },
  },
  {
    id: price_KRW,
    accessorKey: price_KRW,
  },
  {
    accessorKey: percent_change_1h,
    header: ({ column }) => (
      <DataTableColumnButtonHeader
        column={column}
        title="1시간"
        className="text-right"
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>(percent_change_1h);
      const formatted = Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(Math.abs(amount));
      return (
        <div
          className={cn("flex text-right font-medium pl-2.5 text-red-500", {
            "text-green-500": amount > 0,
            "text-white": amount === 0,
          })}
        >
          {amount === 0 ? null : amount < 0 ? (
            <ArrowBigDownDash className="size-3" />
          ) : (
            <ArrowBigUpDash className="size-3" />
          )}
          {formatted + "%"}
        </div>
      );
    },
  },
  {
    accessorKey: percent_change_24h,
    header: ({ column }) => (
      <DataTableColumnButtonHeader
        column={column}
        title="24시간"
        className="text-right"
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>(percent_change_24h);
      const formatted = Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(Math.abs(amount));
      return (
        <div
          className={cn("flex text-right font-medium pl-2.5 text-red-500", {
            "text-green-500": amount > 0,
          })}
        >
          {amount === 0 ? null : amount < 0 ? (
            <ArrowBigDownDash className="size-3" />
          ) : (
            <ArrowBigUpDash className="size-3" />
          )}
          {formatted + "%"}
        </div>
      );
    },
  },
  {
    accessorKey: market_cap,
    header: ({ column }) => (
      <DataTableColumnButtonHeader
        column={column}
        title="시가총액"
        className="text-right"
      />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<number>(market_cap);
      const amountKRW = row.getValue<number>(market_cap_KRW);

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      const formattedKRW = new Intl.NumberFormat("ko-KR", {
        style: "currency",
        currency: "KRW",
      }).format(amountKRW);

      return (
        <div className="font-medium flex flex-col items-end">
          <p className="text-right">{formatted}</p>
          <p className="text-right text-foreground/60 text-xs">
            {formattedKRW}
          </p>
        </div>
      );
    },
  },
  {
    id: market_cap_KRW,
    accessorKey: market_cap_KRW,
  },
];
// const column: ColumnDef<Payment> = {
//   id: 't',
//   accessorKey: 'status', // row object to use when extracting the value for the column.
//   accessorFn: originalRow => 1,
//   columns: columns, // child column defs to include in a group column.
//   cell
// }
