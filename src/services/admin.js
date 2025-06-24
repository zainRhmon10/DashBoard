import axios from "axios";

const BASE_URL = "http://localhost:8000/api/dashboard/admins";

export const getAdmins = (token) => {
  if (!token) throw new Error("Missing token");
  return axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const changeStatus = (token, adminId) => {
  if (!token) throw new Error("Missing token");
  return axios.patch(`${BASE_URL}/${adminId}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const deleteAdmin = (token, adminId) => {
  if (!token) throw new Error("Missing token");
  return axios.delete(`${BASE_URL}/${adminId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const createAdmin = (token, adminData) => {
  if (!token) throw new Error("Missing token");

  const formData = new FormData();
  formData.append("name", adminData.name);
  formData.append("email", adminData.email);
  formData.append("status", adminData.status === 'active' ? "1" : "0");
  formData.append("role_id", adminData.role_id);
  formData.append("password", adminData.password);
  formData.append("password_confirmation", adminData.password_confirmation);

  if (adminData.image) {
    formData.append("image", adminData.image);
  }

  return axios.post(BASE_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

 export const getAdminById = (token, adminId) => {
  return axios.get(`${BASE_URL}/${adminId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });
};

export const updateAdmin = (token, adminData, adminId) => {
  if (!token) throw new Error("Missing token");

  const formData = new FormData();
  formData.append("name", adminData.name);
  formData.append("email", adminData.email);
  formData.append("status", adminData.status ?? 1);
  formData.append("role_id", adminData.role_id);
  if (adminData.password) {
    formData.append("password", adminData.password);
    formData.append("password_confirmation", adminData.password_confirmation);
  }
  if (adminData.image) {
    formData.append("image", adminData.image);
  }

  return axios.post(`${BASE_URL}/${adminId}?_method=PUT`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};
