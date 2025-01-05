import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  getCategoryState,
  selectSubCategory
} from '@/redux/features/category/categorySlice';

export default function SubCategorySelecter() {
  const { subList, subSelected } = useSelector((state: RootState) =>
    getCategoryState(state)
  );
  const dispatch = useDispatch();
  return (
    <Select
      value={subSelected}
      onValueChange={(value) => dispatch(selectSubCategory(value))}
    >
      <SelectTrigger>
        <SelectValue placeholder={subSelected} />
      </SelectTrigger>
      <SelectContent>
        {subList.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
