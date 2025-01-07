import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel
} from '@/components/ui/form';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCategoryState,
  loadAllCategories
} from '@/redux/features/category/categorySlice';
import { getSubCategories } from '@/lib/api';
import Heading from '@/components/shared/heading';
import { Textarea } from '@/components/ui/textarea';
import MasterCategorySelecter from '../category/master-category-selecter';
import SubCategorySelecter from '../category/sub-category-selecter';
import { RootState } from '@/redux/store';
import { ToastAction } from '@radix-ui/react-toast';
import { toast } from '@/hooks/use-toast';
import { ProductFormSchemaType, productFormSchema } from '@/lib/api';
import { useCreateProduct } from '../../queries/queries';

const ProductCreateForm = ({ modalClose }: { modalClose: () => void }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getSubCategories('all').then((data) => {
      dispatch(loadAllCategories(data));
    });
  }, []);
  const selectCategory = useSelector((state: RootState) =>
    getCategoryState(state)
  );

  const [images, setImages] = useState<File[]>([]);
  const form = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {}
  });

  useEffect(() => {
    form.setValue('masterCategory', selectCategory.masterSelected);
    form.setValue('subCategory', selectCategory.subSelected);
    form.setValue('images', images as any);
  }, [form, selectCategory, images]);

  const onDrop = (acceptedFiles: File[]) => {
    setImages([...images, ...acceptedFiles]);
  };

  const createProduct = useCreateProduct();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop
  });

  const onSubmit = (values: ProductFormSchemaType) => {
    // Do something with the form values and images.
    // ✅ This will be type-safe and validated.
    const { masterSelected, subSelected } = selectCategory;
    if (!subSelected || !masterSelected) {
      console.log('Select Category');
      toast({
        title: 'Select Category',
        description: 'Please select category',
        variant: 'destructive',
        action: <ToastAction altText="Close">Close</ToastAction>
      });
      return;
    }
    createProduct.mutate(values);

    toast({
      title: 'Select Category',
      description: 'Send category',
      action: <ToastAction altText="Close">Close</ToastAction>
    });
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
                  <FormLabel>Name</FormLabel>

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
                  <FormLabel>Price</FormLabel>

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
                  <FormLabel>Description</FormLabel>

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
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter product quantity"
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter product status"
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
              name="season"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Season</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter product season"
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
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter product year"
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
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="Enter product gender"
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
              name="baseColor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Color</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter product base color"
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
              name="masterCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <FormControl>
                    <MasterCategorySelecter />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Category</FormLabel>
                  <FormControl>
                    <SubCategorySelecter />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div
                    {...getRootProps()}
                    className="mt-4 border-2 border-dashed p-4"
                  >
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
