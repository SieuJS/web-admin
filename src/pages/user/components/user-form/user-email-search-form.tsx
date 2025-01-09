import { Input } from '@/components/ui/input';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

export default function UserEmailSearchForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get('email') || '';
  const [email, setEmail] = useState(search);

  const [debouncedValue] = useDebounce(email, 1000);

  const handleSettingSearchParams = useCallback((newSearchValue: string) => {
    // Update the URL with the new search value
    if (
      newSearchValue === '' ||
      newSearchValue === undefined ||
      !newSearchValue
    ) {
      searchParams.delete('email');
      setSearchParams(searchParams);
      return;
    }
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: '1', // Spread the existing search params
      email: newSearchValue // Update the search value
    });
  }, []);

  useEffect(() => {
    handleSettingSearchParams(debouncedValue);
  }, [debouncedValue, handleSettingSearchParams]);

  return (
    <Input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Search by email"
      className="w-full md:max-w-sm"
    />
  );
}
