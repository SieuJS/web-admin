import { banUser, getListUser, UserQuery } from '@/lib/api';

import { useMutation, useQuery } from '@tanstack/react-query';

export function useGetUser(
  name: string,
  email: string,
  page: number,
  pageLimit: number,
  orderBy: string,
  order: string
) {
  return useQuery({
    queryKey: ['user', name, email, page, pageLimit, orderBy, order],
    queryFn: async () =>
      getListUser({ name, email, page, pageLimit, orderBy, order })
  });
}

export function useBanUser() {
  return useMutation({
    mutationFn: async ({ id, isBan }: { id: string; isBan: boolean }) =>
      banUser({ id, isBan })
  });
}
