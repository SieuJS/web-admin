import { getMasterCategories, getProducts, getSubCategories } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = (search, master, sub, page, perPage) => {
  return useQuery({
    queryKey: ['products', search, master, sub, page, perPage],
    queryFn: async () => getProducts(search, master, sub, page, perPage)
  });
};

export const useGetMasterCategories = () => {
  return useQuery({
    queryKey: ['master-categories'],
    queryFn: async () => getMasterCategories()
  });
};

export const useGetSubCategories = (master) => {
  return useQuery({
    queryKey: ['sub-categories', master],
    queryFn: async () => getSubCategories(master)
  });
};
