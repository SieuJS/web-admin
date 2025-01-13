import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function SelectStatus() {
  const [searchParams, setSearchParams] = useSearchParams();
  const statusParams = searchParams.get('status') || 'all';
  const [status, setStatus] = useState(statusParams);
  const statusValues = [
    'pending',
    'processing',
    'completed',
    'cancelled',
    'all'
  ];
  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      status: status
    });
  }, [status, searchParams, setSearchParams]);

  const handleChange = (value) => {
    setStatus(value);
  };

  return (
    <Select value={status} onValueChange={handleChange} defaultValue={status}>
      <SelectTrigger>
        <SelectValue placeholder={status} />
      </SelectTrigger>
      <SelectContent>
        {statusValues.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
