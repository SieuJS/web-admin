import DataTable from '@/components/shared/data-table';
import { columns } from './columns';

type TPRoductsTableProps = {
  products: any;
  page: number;
  totalProducts: number;
  pageCount: number;
};

export default function ProductsTable({
  products,
  pageCount
}: TPRoductsTableProps) {
  return (
    <>
      {products && (
        <DataTable columns={columns} data={products} pageCount={pageCount} />
      )}
    </>
  );
}
