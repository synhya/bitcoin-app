'use client';
import { Column, ColumnDef } from '@tanstack/table-core'
import {
  DataTableColumnButtonHeader
} from '@/components/ui/data-table-components'
import React from 'react'
import { TableCoinData } from '@/lib/apis/query-types'
import Image from 'next/image'

const rank:keyof TableCoinData = 'cmc_rank';
const name:keyof TableCoinData = 'name';
const symbol:keyof TableCoinData = 'symbol';
const price:keyof TableCoinData = 'price';
const percent_change_1h:keyof TableCoinData = 'percent_change_1h';
const percent_change_24h:keyof TableCoinData = 'percent_change_24h';
const market_cap:keyof TableCoinData = 'market_cap';

export const columns
  : ColumnDef<TableCoinData, unknown>[] = [
  {
    accessorKey: rank,
    header: ({column}) => <DataTableColumnButtonHeader column={column} title='순위'/>,
    cell: ({ row }) => {
      const rowValue = row.getValue<string>(rank);
      return <div className='font-medium pl-2.5 w-12'>{rowValue}</div>
    }
  },
  {
    accessorKey: name,
    header: ({column}) => <DataTableColumnButtonHeader
      column={column} title='이름'
      className='text-left'
    />,
    cell: ({ row }) =>
    {
      const coinName = row.getValue<string>(name);
      const coinSymbol = row.getValue<string>(symbol);
      return <div className='text-left font-medium w-32 pl-2.5 whitespace-nowrap'>
        <p className='hidden md:inline'>{coinName}</p>
        <p className='inline text-foreground md:text-foreground/60 md:text-xs md:pl-2'>{coinSymbol}</p>
      </div>
    },
  },
  {
    id: 'symbol',
    accessorKey: symbol,
  },
  {
    accessorKey: price,
    header: ({column}) => <DataTableColumnButtonHeader
      column={column} title='가격'
      className='text-right'
      iconDir='left'
    />,
    cell: ({ row }) =>
    {
      const amount = row.getValue<number>(price);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className='text-right font-medium pr-2.5'>{formatted}</div>
    },
  },
  {
    accessorKey: percent_change_1h,
    header: ({column}) => <DataTableColumnButtonHeader
      column={column} title='1시간 %'
      className='text-right'
      iconDir='left'
    />,
    cell: ({ row }) =>
    {
      const amount = row.getValue<number>(percent_change_1h)
      const formatted = Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(
        amount,
      )
      return <div className='text-right font-medium pr-2.5'>{formatted + '%'}</div>
    },
  },
  {
    accessorKey: percent_change_24h,
    header: ({column}) => <DataTableColumnButtonHeader
      column={column} title='24시간 %'
      className='text-right'
      iconDir='left'
    />,
    cell: ({ row }) =>
    {
      const amount = row.getValue<number>(percent_change_24h)
      const formatted = Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(
        amount,
      )
      return <div className='text-right font-medium pr-2.5'>{formatted + '%'}</div>
    },
  },
  {
    accessorKey: market_cap,
    header: ({column}) => <DataTableColumnButtonHeader
      column={column} title='시가총액'
      className='text-right'
      iconDir='left'
    />,
    cell: ({ row }) =>
    {
      const amount = row.getValue<number>(market_cap);
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className='text-right font-medium'>{formatted}</div>
    },
  },
]
// const column: ColumnDef<Payment> = {
//   id: 't',
//   accessorKey: 'status', // row object to use when extracting the value for the column.
//   accessorFn: originalRow => 1,
//   columns: columns, // child column defs to include in a group column.
//   cell
// }