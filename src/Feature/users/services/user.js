import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/dashboard/users";

export const fetchUsers = async (token, page = 0, limit =10,searchedText = '') => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      params: {
        page ,
        limit ,  
        
        searched_text: searchedText || '',  
      },
    });

    const total = response.data.users.meta.total;


    const data = response.data.users.data;
    const formattedData = data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      orders_count: user.orders_count,
      reservations_count: user.reservations_count,
      wallet_balance: user.wallet_balance,
      status: user.status === 1 ? 'active' : 'banned',
    }));

     return {
      users: formattedData,
      total: total, 
    };

  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};



export const DeleteUser =async (token ,id ) => {
    const response = await axios.delete(`${BASE_URL}/${id}`,
        {headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        }
        }
    );
   

}

export const ChangeStatus = async (token, id, status) => {
  const response = await axios.patch(
    `${BASE_URL}/${id}`,
    { status },
    {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};




export const createUser = async (token , formData) => {
  const response = await axios.post (`${BASE_URL}`,
    formData ,
    {headers:{
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
          
        }}


  )
}