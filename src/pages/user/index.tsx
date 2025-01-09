import { useSearchParams } from 'react-router-dom';
import { useGetUser } from './queries/queries';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import PageHead from '@/components/shared/page-head';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';
import UserTable from './components/user-table';

export default function UserPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const nameSearch = searchParams.get('name') || '';
  const emailSearch = searchParams.get('email') || '';
  const orderBy = searchParams.get('orderBy') || '';
  const order = searchParams.get('order') || '';
  const { data, isLoading } = useGetUser(
    nameSearch,
    emailSearch,
    page,
    pageLimit,
    orderBy,
    order
  );
  const users = data?.data;
  const totalUsers = data?.meta.total;
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
      <PageHead title="User Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Products', link: '/products' }
        ]}
      />
      <UserTable
        users={users}
        page={page}
        totalUsers={totalUsers}
        pageCount={pageCount}
      />
    </div>
  );
}
