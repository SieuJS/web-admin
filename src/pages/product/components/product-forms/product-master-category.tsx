import { useGetMasterCategories } from '../../queries/queries';
import InputSkeleton from '@/components/shared/input-skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
interface MasterCategory {
  masterCategory: string;
}

const ProductMasterCategory = () => {
  const { data, isLoading } = useGetMasterCategories();
  const masterCategories: MasterCategory[] = data;

  return (
    <>
      {isLoading ? (
        <InputSkeleton />
      ) : (
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">All Sub Category</SelectItem>
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
      )}
    </>
  );
};

export default ProductMasterCategory;
