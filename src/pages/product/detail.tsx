import { useParams } from 'react-router-dom';
import { useGetProductById, useUpdateProduct } from './queries/queries';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import {
  ProductFormSchemaType,
  getSubCategories,
  productFormSchema
} from '@/lib/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import MasterCategorySelecter from './components/category/master-category-selecter';
import SubCategorySelecter from './components/category/sub-category-selecter';
import { useRouter } from '@/routes/hooks';
import { useEffect, useState } from 'react';
import { UploadButton } from '@bytescale/upload-widget-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  getCategoryState,
  loadAllCategories,
  selectMasterCategory,
  selectSubCategory
} from '@/redux/features/category/categorySlice';

const options = {
  apiKey: 'public_12a1zEmARBeezfGPFXGCm3iswBmL', // This is your API key.
  maxFileCount: 1,
  showFinishButton: true, // Note: You must use 'onUpdate' if you set 'showFinishButton: false' (default).
  mimeTypes: ['image/jpeg'],
  styles: {
    colors: {
      primary: '#377dff'
    }
  }
};
export default function ProductDetailPage() {
  const dispatch = useDispatch();
  const { mutate, isPending } = useUpdateProduct();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const params = useParams();
  useEffect(() => {
    getSubCategories('all').then((data) => {
      dispatch(loadAllCategories(data));
    });
  }, []);
  const { data, isLoading } = useGetProductById(params.id);
  const form = useForm<ProductFormSchemaType>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {}
  });
  useEffect(() => {
    if (isPending) {
      setIsSubmitting(true);
    }
  }, [isPending]);
  const router = useRouter();
  const onSubmit = (values: ProductFormSchemaType) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    mutate({
      id: params.id as string,
      formData: values
    });
  };
  const product = data;

  const selectCategory = useSelector((state: RootState) =>
    getCategoryState(state)
  );
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (product) {
      const category = data.tbl_categories;
      form.setValue('name', product.name);
      form.setValue('price', product.price);
      form.setValue('description', product.description);
      form.setValue('quantity', product.quantity);
      form.setValue('status', product.status);
      form.setValue('season', product.season);
      form.setValue('year', product.year);
      form.setValue('gender', product.gender);
      form.setValue('baseColour', product.baseColour);
      setImages(product.images.map((image) => image.image));
      getSubCategories('all').then((data) => {
        dispatch(loadAllCategories(data));
        dispatch(selectMasterCategory(category.masterCategory));
        dispatch(selectSubCategory(category.subCategory));
      });
    }
  }, [data]);

  useEffect(() => {
    form.setValue('images', images as any);
    form.setValue('masterCategory', selectCategory.masterSelected);
    form.setValue('subCategory', selectCategory.subSelected);
  }, [selectCategory, images]);

  const onDrop = (acceptedFiles: string[]) => {
    setImages((prev) => [...prev, ...acceptedFiles]);
  };

  const contentOnLoading = (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Dialog Title</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>Creating Product....</AlertDialogDescription>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </>
  );

  const contentOnSuccess = (
    <>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Dialog Title</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Product Created Successfully
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => router.reload()}>
            Re check the info
          </AlertDialogAction>
          <AlertDialogAction onClick={() => router.push('/product')}>
            Go to Product List
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );

  return (
    <Card className="container mx-auto h-full overflow-scroll p-4">
      <AlertDialog open={isSubmitting} onOpenChange={setIsSubmitting}>
        {isPending ? contentOnLoading : contentOnSuccess}
      </AlertDialog>
      <CardHeader>
        <h2 className="text-2xl font-bold">Update Product</h2>
      </CardHeader>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <CardContent>
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
                        <Select
                          value={form.getValues('status')}
                          onValueChange={(value: any) =>
                            form.setValue('status', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={product.status}
                              placeholder="Enter product status"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem key="instock" value="instock">
                              In stock
                            </SelectItem>
                            <SelectItem key="outofstock" value="outstock">
                              Out of stock
                            </SelectItem>
                            <SelectItem key="suspend" value="suspend">
                              Suspending
                            </SelectItem>
                          </SelectContent>
                        </Select>
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
                  name="baseColour"
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
                      <div className="mt-4 border-2 border-dashed p-4">
                        <UploadButton
                          options={options}
                          onComplete={(files) => {
                            onDrop(files.map((file) => file.fileUrl));
                          }}
                        >
                          {({ onClick }) => (
                            <Button onClick={onClick} type="button">
                              Upload a file...
                            </Button>
                          )}
                        </UploadButton>
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
                      src={file}
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
                  onClick={() => router.push('/product')}
                >
                  Cancel
                </Button>
                <Button type="submit" className="rounded-full" size="lg">
                  Update Product
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      )}
    </Card>
  );
}
