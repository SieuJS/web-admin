import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/routes/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAppDispatch } from '@/hooks/redux-hook';
import { useLogin } from '../../queries/queries';
import { setUser } from '@/redux/features/auth/authSlice';
const formSchema = z.object({
  username: z.string().nonempty({ message: 'Username is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const router = useRouter();
  const [loading] = useState(false);
  const defaultValues = {
    username: 'admintest'
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  const dispatch = useAppDispatch();
  const { mutate: fetchLogin, isPending, isSuccess, data } = useLogin();
  const onSubmit = async (data: UserFormValue) => {
    console.log('data', data);
    const { username, password } = data;
    if (username && password) {
      try {
        fetchLogin({ username, password });
      } catch (e) {
        window.alert('Invalid username or password');
        console.error(e);
      }
    } else {
      // Show an error message.
    }
  };
  useEffect(() => {
    console.log('isLoading', isPending);
    if (isSuccess) {
      dispatch(setUser(data));
      router.push('/');
      router.reload();
    }
  }, [isPending, isSuccess]);

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>User name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Continue With Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
}
