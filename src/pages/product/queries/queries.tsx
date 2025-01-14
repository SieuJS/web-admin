import {
  getMasterCategories,
  getProductById,
  getProducts,
  getSubCategories,
  updateProduct,
  uploadProduct
} from '@/lib/api';
import { useQuery, useMutation } from '@tanstack/react-query';

export const useGetProducts = (
  search,
  master,
  sub,
  page,
  perPage,
  orderBy,
  order
) => {
  return useQuery({
    queryKey: ['products', search, master, sub, page, perPage, orderBy, order],
    queryFn: async () =>
      getProducts(search, master, sub, page, perPage, orderBy, order)
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

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: uploadProduct
  });
};

export const useGetProductById = (id) => {
  return useQuery({
    queryKey: [],
    queryFn: async () => getProductById(id)
  });
};

export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: updateProduct
  });
};
