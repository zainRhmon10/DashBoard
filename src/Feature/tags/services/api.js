import axios from "axios"

const Base_url = 'http://localhost:8000/api/dashboard/tags'

export const fetchAllTags = async(token) => {
    try{

        const response  = await axios.get(`${Base_url}`,
        {headers:{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }}
    );

    return response.data.tags ;
    }catch(e){
        alert(`Error: ${e.response?.data?.message || e.message}`);
    }
    
}  


export const getDetailsTag =  async(token,id) =>{
    try{
        const response = await axios.get(`${Base_url}/${id}`,
        {headers :{
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }}
    );
    return response.data.tag ;

    }catch(e){
        alert(`Error: ${e.response?.data?.message || e.message}`);

    }
}

export const deleteTag = async(token,id) =>{
    try{
        const response = await axios.delete(`${Base_url}/${id}`,
            {headers:{
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            }}
        );
        return response.data;

    }catch(e){
        alert(`Error: ${e.response?.data?.message || e.message}`);
    }
}

export const editTag = async (token, id, data) => {
    try {
        const response = await axios.post(
            `${Base_url}/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            }
        );

        return response.data;
    } catch (e) {
        // 👇 اطبع رسالة الخطأ لفهمها بسهولة أثناء التطوير
        console.error("Edit Tag Error:", e.response?.data || e.message);
        alert(`Error: ${e.response?.data?.message || e.message}`);
        throw e;
    }
};


export const addNewTag = async (token,data) => {
    try {
        const response = await axios.post(`${Base_url}`,
            data,
             {headers:{
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            }}
        );

        return response ;
    }catch (e) {
       alert(`Error: ${e.response?.data?.message || e.message}`);
    }
}
