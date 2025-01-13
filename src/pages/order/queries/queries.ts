import { getOrders, updateOrder, getOrder } from '@/lib/api';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetOrders = (status, page, perPage, orderBy, order) => {
  return useQuery({
    queryKey: ['orders', status, page, perPage, orderBy, order],
    queryFn: async () => getOrders(status, page, perPage, orderBy, order)
  });
};

export const useUpdateOrder = () => {
  return useMutation({
    mutationFn: updateOrder
  });
};

export const useGetDetailOrder = (orderId) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => getOrder(orderId)
  });
};
