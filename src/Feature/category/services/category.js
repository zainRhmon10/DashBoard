import axios from "axios";

const BASE_URL = "http://localhost:8000/api/dashboard/categories";

export const getAllCategories = async (token) => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getDetailesGategory = async(token , id) => {
    try{
        const response = await axios.get(`${BASE_URL}/${id}`,
            {headers : {
               Authorization: `Bearer ${token}`,
               Accept: "application/json",
            }}
        );
        return response.data.category ;
    }
    catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
} 


export const deleteCategory = async (token , id) =>{
  try {
    const response  = await axios.delete (`${BASE_URL}/${id}`,
       {headers : {
               Authorization: `Bearer ${token}`,
               Accept: "application/json",
            }}
    );

  }catch(error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}

export const ChangeStatuscategory = async (token, id) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${id}`,
      {}, // جسم الطلب فاضي، إذا الـ API ما يحتاج بيانات
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error changing category status:", error.response?.data || error.message);
    throw error;
  }
};


export const editCategory = async (token, id, data) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
        return response.data;
    } catch (e) {
        console.error("Edit Category Error:", e.response?.data || e.message);
        alert(`Error: ${e.response?.data?.message || e.message}`);
        throw e;
    }
};


export const addCategory = async (token,data) => {
  try{
const response = await axios.post(`${BASE_URL}`,
    data,
    {headers : {
            Accept: 'application/json',
          Authorization: `Bearer ${token}`,

        }}
  );

  return response;
  } catch(e) {
    alert(`Error: ${e.response?.data?.message || e.message}`);
  }
}
