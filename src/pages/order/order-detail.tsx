import OrderDetail from './components/info/order-detail';
import { useParams } from 'react-router-dom';
import { useGetDetailOrder } from './queries/queries';
import OrderDetailSkeleton from './components/skeleton/order-detail-skeleton';
import PageHead from '@/components/shared/page-head';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const { data, isLoading } = useGetDetailOrder(orderId);
  const order = data;

  return (
    <>
      <div className="h-full overflow-scroll p-4 p-4 md:p-8">
        <PageHead title="Order Detail | App" />
        <Breadcrumbs
          items={[
            { title: 'Dashboard', link: '/' },
            { title: 'Orders', link: '/order' },
            { title: 'Order Detail', link: `/orders/${orderId}` }
          ]}
        />

        {isLoading ? (
          <OrderDetailSkeleton />
        ) : (
          <OrderDetail data={order.data} />
        )}
      </div>
    </>
  );
}
