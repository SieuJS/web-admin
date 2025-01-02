import PageHead from '@/components/shared/page-head';
import { useGetProducts } from './queries/queries';
import ProductsTable from './components/products-table';
import { useSearchParams } from 'react-router-dom';
import { DataTableSkeleton } from '@/components/shared/data-table-skeleton';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

export default function ProductPage() {
  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 10);
  const master = searchParams.get('master') || null;
  const search = searchParams.get('search') || null;
  const sub = searchParams.get('sub') || null;
  const { data, isLoading } = useGetProducts(
    search,
    master,
    sub,
    page,
    pageLimit
  );

  const products = data?.data;
  const totalProducts = data?.meta.total; //1000
  const pageCount = data?.meta.lastPage;

  if (isLoading) {
    return (
      <div className="p-5">
        ]
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
      <PageHead title="Product Management | App" />
      <Breadcrumbs
        items={[
          { title: 'Dashboard', link: '/' },
          { title: 'Products', link: '/products' }
        ]}
      />
      <ProductsTable
        products={products}
        page={page}
        totalProducts={totalProducts}
        pageCount={pageCount}
      />
    </div>
  );
}
