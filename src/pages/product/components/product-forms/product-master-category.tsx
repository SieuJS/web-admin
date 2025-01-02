import { useEffect, useState } from 'react';
import { useGetMasterCategories } from '../../queries/queries';
import InputSkeleton from '@/components/shared/input-skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';
import ProductSubCategory from './product-sub-category';
interface MasterCategory {
  masterCategory: string;
}

const ProductMasterCategory = () => {
  const { data, isLoading } = useGetMasterCategories();
  const masterCategories: MasterCategory[] = data;
  const [searchParams, setSearchParams] = useSearchParams();
  const master = searchParams.get('master') || 'all';
  const [masterCategory, setMasterCategory] = useState(master);

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      master: masterCategory,
      sub: 'all'
    });
  }, [masterCategory, searchParams, setSearchParams]);

  return (
    <>
      {isLoading ? (
        <InputSkeleton />
      ) : (
        <>
          <Select
            value={masterCategory}
            onValueChange={(value) => setMasterCategory(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue
                placeholder={
                  masterCategory === 'all' ? 'All Sub Category' : master
                }
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sub Category</SelectItem>
              {masterCategories.map((category) => (
                <SelectItem
                  key={category.masterCategory}
                  value={category.masterCategory}
                >
                  {category.masterCategory}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <ProductSubCategory master={master} />
        </>
      )}
    </>
  );
};

export default ProductMasterCategory;
