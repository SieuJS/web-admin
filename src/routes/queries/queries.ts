import { checkAuth } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

export function useCheckAuth() {
  return useMutation({
    mutationFn: checkAuth
  });
}
