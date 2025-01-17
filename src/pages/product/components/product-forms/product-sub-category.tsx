import { useGetSubCategories } from '../../queries/queries';
import InputSkeleton from '@/components/shared/input-skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
interface Categories {
  id: string;
  masterCategory: string;
  subCategory: string;
}

export default function ProductSubCategory({ master }: { master: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sub = searchParams.get('sub') || 'all';
  const { data, isLoading } = useGetSubCategories(master);

  const subCategories: Categories[] = data;

  const [subCategory, setSubCategory] = useState(sub);

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      sub: subCategory
    });
  }, [subCategory, searchParams, setSearchParams]);

  useEffect(() => {
    setSubCategory(sub);
  }, [sub]);

  return (
    <>
      {isLoading ? (
        <InputSkeleton />
      ) : (
        <Select
          value={subCategory}
          onValueChange={(value) => setSubCategory(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue
              placeholder={
                subCategory === 'all' ? 'All Subcategory' : subCategory
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Subcategory</SelectItem>
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
