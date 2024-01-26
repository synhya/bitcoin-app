"use client"

import {
  ColumnDef, ColumnFiltersState,
  flexRender,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel, PaginationState, RowSelectionState, SortingState,
  useReactTable, VisibilityState,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { DataTablePagination, DataTableViewOptions } from '@/components/ui/data-table-components'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting]
    = useState<SortingState>([]);
  const [columnFilters, setColumnFilters]
    = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility]
    = useState<VisibilityState>({ 'symbol':false })
  const [rowSelection, setRowSelection]
    = useState<RowSelectionState>({})

  const [pagination, setPagination]
    = useState<PaginationState>({pageIndex: 1, pageSize: 5})


  // fix columns here.
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // initialState: {
    //   columnVisibility: {
    //     'test': false,
    //   }
    // }
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-2 gap-2">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("name")?.setFilterValue(e.target.value)
          }
          className="max-w-sm h-8 focus-visible:ring-amber-300 focus-visible:ring-1"
        />
        {/*<DataTableViewOptions table={table} />*/}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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

