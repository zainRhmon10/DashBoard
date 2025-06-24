import axios from "axios";

const BASE_URL = "http://localhost:8000/api/dashboard/roles";


export const getRoles = (token) =>{
     if (!token) {
    throw new Error('there is no token');
  }
  return axios.get(BASE_URL,{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
}

export const changeStatus = (token,id) =>{
      if (!token) {
    throw new Error('there is no token');
  }
  return axios.patch(`${BASE_URL}/${id}`,{},{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
}




export const getAllPermissions = (token) =>{
  if(!token) {
    throw new Error('there is no token');
  }
  return axios.get(`${BASE_URL}/permissions`,{
     headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
  })
}



export const createRole = (token, roleData) => {

   if(!token) {
    throw new Error('there is no token');
  }
  const formData = new FormData();
  
  
  formData.append("name[en]", roleData.name_en);
  formData.append("name[ar]", roleData.name_ar);
  
  formData.append("status", roleData.status);
  
  roleData.permissions.forEach(perm => {
    formData.append("permissions[]", perm);
  });

  return axios.post(BASE_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};



export const deleteRole = (token,roleId)=>{
    if(!token) {
    throw new Error('there is no token');
  }
  return axios.delete(`${BASE_URL}/${roleId}`,{
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  
}

export const getRoleById = (token, roleId) => {
  return axios.get(`${BASE_URL}/${roleId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

export const updateRole = (token, roleData ,roleId) => {

   if(!token) {
    throw new Error('there is no token');
  }
  const formData = new FormData();
  
  
  formData.append("name[en]", roleData.name_en);
  formData.append("name[ar]", roleData.name_ar);
  
  formData.append("status", roleData.status);
  
  roleData.permissions.forEach(perm => {
    formData.append("permissions[]", perm);
  });

  return axios.post(`${BASE_URL}/${roleId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};