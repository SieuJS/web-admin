import { useSearchParams } from 'react-router-dom';
import { useGetOrders } from './queries/queries';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import PageHead from '@/components/shared/page-head';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import OrderTable from './components/order-table';

export default function OrderListPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const status = searchParams.get('status') || '';
  const orderBy = searchParams.get('orderBy') || '';
  const order = searchParams.get('order') || '';
  const { data, isLoading } = useGetOrders(
    status,
    page,
    pageLimit,
    orderBy,
    order
  );
  const orders = data?.data;
  const totalOrders = data?.meta.total;
  const pageCount = data?.meta.lastPage;
  if (isLoading) {
    return (
      <div className="p-5">
        <DataTableSkeleton
          columnCount={10}
          filterableColumnCount={2}
          searchableColumnCount={1}
        />
      </div>
    );
  }
  return (
    <div className="p-4 md:p-8">
      <PageHead title="Order Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Orders', link: '/orders' }
        ]}
      />
      <OrderTable orders={orders} pageCount={pageCount} />
    </div>
  );
}
