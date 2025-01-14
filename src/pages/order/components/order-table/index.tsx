import DataTable from '@/components/shared/data-table';
import { columns } from './columns';
import OrderTableActions from './order-table-action';

export default function OrderTable({ orders, pageCount }) {
  return (
    <>
      <OrderTableActions />
      {orders && (
        <DataTable columns={columns} data={orders} pageCount={pageCount} />
      )}
    </>
  );
}
