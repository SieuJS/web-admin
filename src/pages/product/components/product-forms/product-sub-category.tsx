import { useGetSubCategories } from '../../queries/queries';
import InputSkeleton from '@/components/shared/input-skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
interface Categories {
  id: string;
  masterCategory: string;
  subCategory: string;
}

type ProductSubCategoryProps = {
  master?: string;
};

export default function ProductSubCategory({
  master
}: ProductSubCategoryProps) {
  const { data, isLoading } = useGetSubCategories(master);
  const subCategories: Categories[] = data;

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
            <SelectItem value="system">All Parent Category</SelectItem>
            {subCategories.map((category) => (
              <SelectItem key={category.id} value={category.subCategory}>
                {category.subCategory}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
}
