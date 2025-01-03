import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form';

import Heading from '@/components/shared/heading';
import { Textarea } from '@/components/ui/textarea';

const productFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  price: z.number().positive('Price must be positive'),
  description: z.string().optional()
});

type ProductFormSchemaType = z.infer<typeof productFormSchema>;

const ProductCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const [images, setImages] = useState<File[]>([]);
  const form = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {}
  });

  const onDrop = (acceptedFiles: File[]) => {
    setImages([...images, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop
  });

  const onSubmit = (values: ProductFormSchemaType) => {
    // Do something with the form values and images.
    // ✅ This will be type-safe and validated.
    console.log(values, images);
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      {...field}
                      className="px-4 py-6 shadow-inner drop-shadow-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div {...getRootProps()} className="mt-4 border-2 border-dashed p-4">
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4">
            {images.map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`preview ${index}`}
                  className="h-32 w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== index));
                  }}
                  className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              size="lg"
              onClick={modalClose}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-full" size="lg">
              Create Product
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductCreateForm;
