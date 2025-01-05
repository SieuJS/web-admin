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
  selectMasterCategory
} from '@/redux/features/category/categorySlice';
const MasterCategorySelecter = () => {
  const { masterList, masterSelected } = useSelector((state: RootState) =>
    getCategoryState(state)
  );
  const dispatch = useDispatch();
  return (
    <Select
      value={masterSelected}
      onValueChange={(value) => dispatch(selectMasterCategory(value))}
    >
      <SelectTrigger>
        <SelectValue placeholder={masterSelected} />
      </SelectTrigger>
      <SelectContent>
        {masterList.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MasterCategorySelecter;
