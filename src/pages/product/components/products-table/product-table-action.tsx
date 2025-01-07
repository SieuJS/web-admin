import TableSearchInput from '@/components/shared/table-search-input';

import { useRouter } from '@/routes/hooks';
import ProductMasterCategory from '../product-forms/product-master-category';
import ProductSortForm from '../product-forms/product-sort-form';
import { Button } from '@/components/ui/button';

export default function ProductTableActions() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-between gap-3 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Product Here" />
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-1">
          <ProductSortForm />
        </div>
        <div className="col-span-2 flex gap-3">
          <ProductMasterCategory />
        </div>
        <div className="col-span-1">
          <Button
            className="text-xs md:text-sm"
            onClick={() => {
              router.push('/product/create');
            }}
          >
            Add new
          </Button>
        </div>
      </div>
    </div>
  );
}
