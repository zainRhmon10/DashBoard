import axios from "axios";

const BASE_URL = "http://localhost:8000/api/dashboard";

export const loginApi = (email, password) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  return axios.post(`${BASE_URL}/login`, formData, {
    headers: {
      Accept: "application/json",
    },
  });
};

export const enterEmailAPi = (email) => {
  const formData = new FormData();
  formData.append("email", email);
  return axios.post(`${BASE_URL}/passwords/email`, formData, {
    headers: {
      Accept: "application/json",
    },
  });
};

export const verifyOtpApi = (email, OTP) => {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("OTP", OTP);

  return axios.post(`${BASE_URL}/passwords/verify-otp`, formData, {
    headers: {
      Accept: "application/json",
    },
  });
};

export const newPasswordAPI = (
  password,
  password_confirmation,
  logout_oth_dev,
  token
) => {
  const formData = new FormData();
  formData.append("password", password);
  formData.append("password_confirmation", password_confirmation);
  formData.append("logout_oth_dev", logout_oth_dev);

  return axios.post(`${BASE_URL}/passwords/reset`, formData, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
};



