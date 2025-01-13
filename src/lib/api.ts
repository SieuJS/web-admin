import axios from 'axios';
import { string, z } from 'zod';

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
  baseColour: z.string(),
  images: z.array(string()).nonempty('Images are required'),
  masterCategory: z.string().nonempty('Master category is required'),
  subCategory: z.string().nonempty('Sub category is required')
});

export type ProductFormSchemaType = z.infer<typeof productFormSchema>;

export async function uploadProduct(formData: ProductFormSchemaType) {
  try {
    const res = await axios.post(`${HOST}/api/v1/product/upload`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getProductById(id: string) {
  try {
    const res = await axios.get(`${HOST}/api/v1/product/admin/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateProduct({
  id,
  formData
}: {
  id: string;
  formData: ProductFormSchemaType;
}) {
  try {
    const res = await axios.patch(`${HOST}/api/v1/product/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export type UserQuery = {
  page: number;
  pageLimit: number;
  name: string | null;
  email: string | null;
  orderBy: string;
  order: string;
};

export async function getListUser({
  page,
  pageLimit,
  name,
  email,
  orderBy,
  order
}: UserQuery) {
  try {
    const res = await axios.get(
      `${HOST}/api/v1/user/list?page=${page}&limit=${pageLimit}&name=${name || ''}&email=${email || ''}&orderBy=${orderBy || ''}&order=${order || ''}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function banUser({ id, isBan }: { id: string; isBan: boolean }) {
  if (isBan) {
    try {
      const res = await axios.patch(`${HOST}/api/v1/user/ban/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  } else {
    try {
      const res = await axios.patch(`${HOST}/api/v1/user/unban/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export async function getOrders(
  status: string,
  page: number,
  pageLimit: number,
  orderBy: string,
  order: string
) {
  try {
    const res = await axios.get(
      `${HOST}/api/v1/order/getlist?page=${page}&limit=${pageLimit}&orderBy=${orderBy}&order=${order}&status=${status === 'all' ? '' : status}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function updateOrder({ orderId, status }) {
  try {
    const res = await axios.patch(
      `${HOST}/api/v1/order/update/${orderId}`,
      { status },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getOrder(orderId: string) {
  try {
    const res = await axios.get(`${HOST}/api/v1/order/info/${orderId}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function login({ username, password }) {
  try {
    const res = await axios.post(
      `${HOST}/api/v1/user/login`,
      {
        username,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getProfile() {
  try {
    const res = await axios.get(`${HOST}/api/v1/user/profile`);
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function checkAuth() {
  try {
    const res = await axios.get(`${HOST}/api/v1/user/protected`);
    const data = res.data;
    if (data.role !== 'admin') {
      return false;
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
