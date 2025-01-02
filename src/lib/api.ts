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

export async function getProducts(page: number, perPage: number) {
  try {
    const res = await axios.get(
      `http://localhost:3000/api/v1/product?page=${page}&perPage=${perPage}`
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
      `http://localhost:3000/api/v1/category/sub?masterId=${master}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
