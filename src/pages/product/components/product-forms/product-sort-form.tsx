import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

export default function ProductSortForm() {
  useEffect(() => {
    console.log('ProductSortForm mounted');
    return () => {
      console.log('ProductSortForm unmounted');
    };
  }, []);

  return (
    <Select value="newest">
      <SelectTrigger>
        <SelectValue placeholder="Select an sort options" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
