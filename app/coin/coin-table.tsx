'use client';
import React from 'react'
import { columns } from '@/app/coin/coin-table-columns'
import { DataTable } from '@/components/ui/data-table'
import { Column } from '@tanstack/table-core'
import { usePathname, useRouter } from 'next/navigation'
import { TableCoinData } from '@/lib/apis/query-types'

type CoinTableProps = {
  coinData: TableCoinData[],
  searchParams: string,
}

const CoinTable = ({coinData, searchParams} : CoinTableProps) => {
  const { replace } = useRouter();
  const pathname = usePathname();

  // 페이지의 경우 useRounter 쓰지 말자. <LINK />로 해결되니까


  return (
    <DataTable columns={columns} data={coinData}
    />
  )
}

export default CoinTable
