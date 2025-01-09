import { User } from '@/constants/data';

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'NAME'
  },
  {
    accessorKey: 'email',
    header: 'EMAIL'
  },
  {
    accessorKey: 'role',
    header: 'ROLE'
  },
  {
    accessorKey: 'status',
    header: 'STATUS'
  },
  {
    accessorKey: 'createdAt',
    header: 'CREATED AT',
    cell: ({ row }) => new Date(row.getValue('createdAt')).toLocaleTimeString()
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
