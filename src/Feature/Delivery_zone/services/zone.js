import axios from "axios"
const BASE_URL = 'http://localhost:8000/api/dashboard/zones'

export const getAllZones = async (token) =>{
    try{
        const response = await axios.get(`${BASE_URL}`,
            {headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },}
        );
        return response.data.delivery_zones;
    }
    catch (e) {
        console.error("get zones Error:", e.response?.data || e.message);
        alert(`Error: ${e.response?.data?.message || e.message}`);
        throw e;
    }
}


export const getDetailsZone =  async (token ,id ) => {
    try{
        const response = await axios.get(`${BASE_URL}/${id}`,
            {headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },}
        );

        return response.data.delivery_zone ;
        
    }catch ( e) {
         alert(`Error: ${e.response?.data?.message || e.message}`);
    }

}



export const deleteZone =  async (token ,id ) => {
    try{
        const response = await axios.delete(`${BASE_URL}/${id}`,
            {headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },}
        );
    }catch ( e) {
         alert(`Error: ${e.response?.data?.message || e.message}`);
    }

}

export const createZone = async (token,data) => {

 try{
  const response = await axios.post(`${BASE_URL}`,
   data,
   {headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
          'Content-Type': 'application/json',
      },}
 );
 return response;

 }catch(e){

   alert(`Error: ${e.response?.data?.message || e.message}`);
 }
};


export const chageStatusZone = async (token , id) =>{
    try {
        const respone = await axios.patch(`${BASE_URL}/${id}`,
            {},
             {headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },}
        )
    }catch(e){
        alert(`Error: ${e.response?.data?.message || e.message}`);

    }
}



export const EditZone = async (token ,id , data) => {
    try{
        const response = await axios.post (`${BASE_URL}/${id}`,
            data,
            {headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },}

        );

        return response ;

    }catch (e){
        alert(`Error: ${e.response?.data?.message || e.message}`);

    }

}

