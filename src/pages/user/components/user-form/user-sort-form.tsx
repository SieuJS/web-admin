import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
const fieldNames = ['name', 'email', 'createdAt'];
const orderValues = ['asc', 'desc'];

export default function UserSortForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const orderBy = searchParams.get('orderBy') || '';
  const order = searchParams.get('order') || '';
  const [selectedOrderBy, setSelectedOrderBy] = useState(orderBy) || 'name';
  const [selectedOrder, setSelectedOrder] = useState(order) || 'asc';

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      orderBy: selectedOrderBy,
      order: selectedOrder
    });
  }, [selectedOrderBy, selectedOrder, searchParams, setSearchParams]);

  return (
    <div className="grid grid-cols-3 gap-3">
      <span className="flex-1">Sort by:</span>
      <Select
        value={selectedOrderBy}
        onValueChange={(value) => setSelectedOrderBy(value)}
        defaultValue={selectedOrderBy}
      >
        <SelectTrigger>
          <SelectValue placeholder={selectedOrderBy} />
        </SelectTrigger>
        <SelectContent>
          {fieldNames.map((field) => (
            <SelectItem key={field} value={field}>
              {field}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedOrder}
        onValueChange={(value) => setSelectedOrder(value)}
        defaultValue={selectedOrder}
      >
        <SelectTrigger>
          <SelectValue placeholder={selectedOrder} />
        </SelectTrigger>
        <SelectContent>
          {orderValues.map((order) => (
            <SelectItem key={order} value={order}>
              {order}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
