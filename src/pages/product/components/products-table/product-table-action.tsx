import PopupModal from '@/components/shared/popup-modal';
import TableSearchInput from '@/components/shared/table-search-input';

import ProductCreateForm from '../product-forms/product-create-form';
import ProductMasterCategory from '../product-forms/product-master-category';
import ProductSubCategory from '../product-forms/product-sub-category';

export default function ProductTableActions() {
  return (
    <div className="flex items-center justify-between gap-3 py-5">
      <div className="flex flex-1 gap-4">
        <TableSearchInput placeholder="Search Product Here" />
      </div>
      <div className="flex gap-3">
        <ProductMasterCategory />
        <ProductSubCategory />
        <PopupModal
          renderModal={(onClose) => <ProductCreateForm modalClose={onClose} />}
        />
      </div>
    </div>
  );
}
