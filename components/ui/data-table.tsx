"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-components";
import { cn } from "@/lib/utils";
import { columnKeys } from "@/components/coin-page-specific/coin-table-columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { usePageIndex, usePageSize } from "@/lib/hooks/usePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const displayedCoin = searchParams.get("symbol");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    symbol: false,
    price_KRW: false,
    market_cap_KRW: false,
    id: false,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: usePageIndex((state) => state.pageIndex),
    pageSize: usePageSize((state) => state.pageSize),
  });

  const { pageIndex, setPageIndexState } = usePageIndex();
  const savedPageSize = usePageSize((state) => state.pageSize);
  useEffect(() => {
    setPagination((prev) => ({
      ...prev,
      pageIndex: pageIndex,
    }));
  }, [pageIndex, displayedCoin]);
  useEffect(() => {
    setPageIndexState(table.getState().pagination.pageIndex);
    setPagination((prev) => ({
      ...prev,
      pageSize: savedPageSize,
    }));
  }, [savedPageSize]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
  });

  // 페이지의 경우 useRouter 쓰지 말자. <LINK />로 해결되니까 바꿔주자.
  // ++ 그냥 재마운트 하지말고 내용만 바꿔주는 식으로하자 (reactQuery)
  const rowClickHandler = (symbol: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("symbol", symbol);

    // in case of searching.
    // newSearchParams.set("page", (pagination.pageIndex + 1).toString());

    // get search params change symbol query, replace.
    replace(`${pathname}?${newSearchParams.toString()}`);
  };

  return (
    <div id="coin-table" className="w-full">
      <div className="flex items-center justify-between py-2 gap-2">
        <Input
          placeholder="이름을 입력하세요.."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm h-8 focus-visible:ring-amber-300 focus-visible:ring-1 focus-visible:ring-offset-accent transition-colors duration-500"
        />
        {/*<DataTableViewOptions table={table} />*/}
      </div>
      <div className="rounded-md border">
        <Table className="flex flex-col w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="flex justify-between content-center"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn("h-10 min-w-24 p-1 flex items-center", {
                        "min-w-16 w-16": header.id === columnKeys.rank,
                        "w-52": header.id === columnKeys.name,
                        "justify-center min-w-[80px] w-[80px] pl-3":
                          header.id === columnKeys.percent_change_1h ||
                          header.id === columnKeys.percent_change_24h,
                        "min-w-40 w-40 justify-center":
                          header.id === columnKeys.market_cap,
                        "w-28 pr-3 justify-end": header.id === columnKeys.price,
                      })}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header, // comp
                            header.getContext(), // props
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(
                    "flex justify-between content-center cursor-pointer",
                    {
                      "border-amber-300 border":
                        displayedCoin ===
                        row.getValue<string>(columnKeys.symbol),
                    },
                  )}
                  onClick={() =>
                    rowClickHandler(row.getValue<string>(columnKeys.symbol))
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn("h-12 p-1 min-w-24 flex items-center", {
                        "min-w-16 w-16": cell.column.id === columnKeys.rank,
                        "w-52 pl-3": cell.column.id === columnKeys.name,
                        "justify-center min-w-[80px] w-[80px] pr-3":
                          cell.column.id === columnKeys.percent_change_1h ||
                          cell.column.id === columnKeys.percent_change_24h,
                        "min-w-40 pr-3 w-40 justify-end":
                          cell.column.id === columnKeys.market_cap,
                        "w-28 pr-3 justify-end":
                          cell.column.id === columnKeys.price,
                      })}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
