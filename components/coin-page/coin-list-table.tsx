import React from 'react'
import { Payment } from '@/lib/types'
import { ColumnDef, getCoreRowModel } from '@tanstack/table-core'
import { useReactTable } from '@tanstack/react-table'
import { columns } from '@/components/coin-page/coin-list-table-column'
import { DataTable } from '@/components/ui/data-table'
import { getIdMap, getPayment } from '@/lib/apis/coin-api'



const CoinTable = async ({

}) => {
  const payments = await getPayment();
  return (
    <DataTable columns={columns} data={payments} />
  )
}

export default CoinTable
