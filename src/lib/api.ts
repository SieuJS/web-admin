import axios from 'axios';
// ---------------------------- Student API ------------------------------------------------- //
// export async function resendEmail(email: string) {
//     try {
//       const res = await axios.post("/auth/register/resend-email/", { email });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//       return error;
//     }
// }

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
      `http://localhost:3000/api/v1/product?${searchQuery}${masterQuery}${subQuery}&page=${page}&perPage=${perPage}&orderBy=${orderBy}&order=${order} `
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getMasterCategories() {
  try {
    const res = await axios.get(`http://localhost:3000/api/v1/category/master`);

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function getSubCategories(master: string) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/v1/category/sub?master=${master === 'all' ? '' : master}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
