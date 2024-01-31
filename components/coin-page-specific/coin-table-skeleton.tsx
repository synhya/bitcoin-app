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
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DataTablePagination,
  DataTableViewOptions,
} from "@/components/ui/data-table-components";
import { cn } from "@/lib/utils";
import { columnKeys } from "@/components/coin-page-specific/coin-table-columns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CoinTableSkeleton() {
  return (
    <div className="w-full">
      <div className="flex items-center py-2 gap-2">
        <Skeleton className="flex w-full px-3 py-2 max-w-sm h-8 rounded-md" />
        {/*<DataTableViewOptions table={table} />*/}
      </div>
      <div className="rounded-md border">
        <Skeleton className="flex flex-col w-full h-[600px]" />
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/*<DataTablePagination table={table} />*/}
      </div>
    </div>
  );
}
