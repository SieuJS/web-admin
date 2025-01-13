import { Order } from '@/constants/data';
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'order_of_user.name',
    header: 'CUSTOMER'
  },
  {
    accessorKey: 'status',
    header: 'STATUS',
    cell: ({ row }) => {
      const status = (row.getValue('status') as string).toLocaleUpperCase();
      console.log(status);
      return status === 'PROCESSING' ? (
        <span className="text-yellow-500">{status}</span>
      ) : status === 'COMPLETED' ? (
        <span className="text-green-500">{status}</span>
      ) : (
        <span className="text-red-500">{status as string}</span>
      );
    }
  },
  {
    accessorKey: 'totalPrice',
    header: 'TOTAL'
  },
  {
    accessorKey: 'orderDate',
    header: 'ORDER DATE',
    cell: ({ row }) =>
      new Date(row.getValue('orderDate')).toLocaleTimeString() +
      ' ' +
      new Date(row.getValue('orderDate')).toLocaleDateString()
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
