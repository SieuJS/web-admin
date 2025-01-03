import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';
interface SortProps {
  orderBy?: string;
  order?: string;
}

export default function ProductSortForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderBy = searchParams.get('orderBy') || '';
  const order = searchParams.get('order') || '';
  const [selected, setSelected] = useState('newest');

  const [sort, setSort] = useState<SortProps>({ orderBy, order });

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      orderBy: sort.orderBy || '',
      order: sort.order || ''
    });

    setSelected(
      sort.orderBy === 'price' && sort.order === 'asc'
        ? 'price-low'
        : sort.orderBy === 'price' && sort.order === 'desc'
          ? 'price-high'
          : sort.orderBy === 'year' && sort.order === 'desc'
            ? 'newest'
            : sort.orderBy === 'year' && sort.order === 'asc'
              ? 'oldest'
              : 'newest'
    );
  }, [searchParams, setSearchParams, sort]);

  const handleSort = (value) => {
    let newSort = {};
    if (value === 'price-low') {
      newSort = {
        orderBy: 'price',
        order: 'asc'
      };
    } else if (value === 'price-high') {
      newSort = {
        orderBy: 'price',
        order: 'desc'
      };
    } else if (value === 'newest') {
      newSort = {
        orderBy: 'year',
        order: 'desc'
      };
    } else if (value === 'oldest') {
      newSort = {
        orderBy: 'year',
        order: 'asc'
      };
    }

    setSelected(value);
    setSort(newSort);
  };

  return (
    <Select value={selected} onValueChange={(value) => handleSort(value)}>
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
