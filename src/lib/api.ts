import axios from 'axios';
import { z } from 'zod';

const HOST = import.meta.env.VITE_HOST_API;
export async function getStudents(
  offset: number,
  pageLimit: number,
  country: string
) {
  try {
    const res = await axios.get(
      `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
        (country ? `&search=${country}` : '')
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getProducts(
  search: string,
  master: string,
  sub: string,
  page: number,
  perPage: number,
  orderBy: string,
  order: string
) {
  try {
    const searchQuery = search ? `&search=${search}` : '';
    const masterQuery = master
      ? `&master=${master === 'all' ? '' : master}`
      : '';
    const subQuery = sub ? `&sub=${sub === 'all' ? '' : sub}` : '';
    const res = await axios.get(
      `${HOST}/api/v1/product?${searchQuery}${masterQuery}${subQuery}&page=${page}&perPage=${perPage}&orderBy=${orderBy}&order=${order} `
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getMasterCategories() {
  try {
    const res = await axios.get(`${HOST}/api/v1/category/master`);

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getSubCategories(master: string) {
  try {
    const res = await axios.get(
      `${HOST}/api/v1/category/sub?master=${master === 'all' ? '' : master}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
export const productFormSchema = z.object({
  name: z.string().nonempty('Name is required'),
  price: z.coerce.number().positive('Price must be positive'),
  description: z.string(),
  quantity: z.coerce.number().positive('Quantity must be positive'),
  status: z.enum(['instock', 'outstock']),
  season: z.enum(['summer', 'winter', 'spring', 'autumn']),
  year: z.coerce.number().min(2000).max(2025),
  gender: z.enum(['male', 'female', 'unisex']),
  baseColor: z.string(),
  images: z.array(z.instanceof(File)).nonempty('Images are required'),
  masterCategory: z.string().nonempty('Master category is required'),
  subCategory: z.string().nonempty('Sub category is required')
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;

export async function uploadProduct(formData: ProductFormSchemaType) {
  try {
    const res = await axios.post(`${HOST}/api/v1/product/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
