import Heading from '@/components/shared/heading';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { z } from 'zod';

const productFormSchema = z.object({
  name: z.string().min(1, { message: 'Product name is required' }),
  price: z.coerce.number().min(1, { message: 'Product price is required' }),
  description: z
    .string()
    .min(10, { message: 'Product description is required' })
});

type ProductFormSchemaType = z.infer<typeof productFormSchema>;

const ProductCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const form = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {}
  });

  const onSubmit = (values: ProductFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  };

  return (
    <div className="px-2">
      <Heading
        title={'Create New Product'}
        description={''}
        className="space-y-2 py-4 text-center"
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter product name"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter product price"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter product description"
                    {...field}
                    className="px-4 py-6 shadow-inner drop-shadow-xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full "
              size="lg"
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full" size="lg">
              Create Student
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductCreateForm;
