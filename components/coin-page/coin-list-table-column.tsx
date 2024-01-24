import { Payment } from '@/lib/types'
import { ColumnDef } from '@tanstack/table-core'

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
]
// const column: ColumnDef<Payment> = {
//   id: 't',
//   accessorKey: 'status', // row object to use when extracting the value for the column.
//   accessorFn: originalRow => 1,
//   columns: columns, // child column defs to include in a group column.
//   cell
// }