import axios from "axios"
const BASE_URL = "http://localhost:8000/api/dashboard";

export const getAllAtributte = async (token) => {
    const response = await axios.get(`${BASE_URL}/attributes`,
        {headers : {
            Accept: 'application/json',
          Authorization: `Bearer ${token}`,

        }}
    );

    const data = response.data.attributes ;

    const formData = data.map(attr => ({
    id: attr.id,
    name: attr.name,
    type: attr.type,
    created_at: attr.created_at,
    options: attr.options.map(opt => opt.name),
  }));

  return formData ;


}

export const getAttribute = async (token , id) => {
   const response = await axios.get(`${BASE_URL}/attributes/${id}`,
     {headers : {
            Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",

        }}
   );

   const data = response.data.attribute; 

   return data ;
   
}


export const editAttribute = async (token ,id ,data) =>{
    try{
      const response = await axios.post(`${BASE_URL}/attributes/${id}`,
        data,
         {headers : {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,

        }}
    );
    return response.data ;

    }
    catch (e) {
        console.error("Edit Category Error:", e.response?.data || e.message);
        alert(`Error: ${e.response?.data?.message || e.message}`);
        throw e;
    }
    
}


export const DeleteAttribute = async (token ,id ) => {

    const response = await axios.delete(`${BASE_URL}/attributes/${id}`,
        {headers : {
            
            Accept: 'application/json',
          Authorization: `Bearer ${token}`,

        }}
    );

    return response.data;

}






export const CreateAttribute = async (token , data) =>{
    const response = await axios.post(`${BASE_URL}/attributes`,
        data,
         {headers : {
            Accept: 'application/json',
          Authorization: `Bearer ${token}`,

        }}
    );

    return response.data ;
}