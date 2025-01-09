import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function UserNameSearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('name') || '';
  const [name, setName] = useState(search);

  useEffect(() => {
    setSearchParams({
      ...Object.fromEntries(searchParams),
      name: name
    });
  }, [name, searchParams, setSearchParams]);

  useEffect(() => {
    setName(search);
  }, [search]);

  return (
    <Input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Search by name"
      className="input"
    />
  );
}
