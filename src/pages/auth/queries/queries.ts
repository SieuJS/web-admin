import { login } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

export function useLogin() {
  return useMutation({
    mutationFn: login
  });
}
