import { getMasterCategories, getProducts, getSubCategories } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = (page, perPage, master, sub) => {
  return useQuery({
    queryKey: ['products', page, perPage, master],
    queryFn: async () => getProducts(page, perPage, master, sub)
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
