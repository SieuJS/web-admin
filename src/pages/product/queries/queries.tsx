import { getProducts } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = (page, perPage) => {
  console.log('page in query', page);
  return useQuery({
    queryKey: ['products', page, perPage],
    queryFn: async () => getProducts(page, perPage)
  });
};
