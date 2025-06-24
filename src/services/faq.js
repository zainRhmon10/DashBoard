import axios from "axios";

const BASE_URL = "http://localhost:8000/api/dashboard/faqs";





export const getFaqs = (token) =>{
    if (!token) {
    throw new Error('there is no token');
  }
  return axios.get(`${BASE_URL}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });
}


export const createFaq = (faq, token) => {
  if (!token) {
    throw new Error("there is no token");
  }

  const formData = new FormData();
  formData.append("question[en]", faq.questionEn);
  formData.append("question[ar]", faq.questionAr);
  formData.append("answer[en]", faq.answerEn);
  formData.append("answer[ar]", faq.answerAr);

  return axios.post(BASE_URL, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};


export const deleteFaq = (id, token) => {
  if (!token) {
    throw new Error("there is no token");
  }
  if (!id) {
    throw new Error("FAQ ID is required");
  }

  return axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};

export const getFaq = (id, token) => {
  if (!token) {
    throw new Error("there is no token");
  }
  if (!id) {
    throw new Error("FAQ ID is required");
  }

  return axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });
};


export const updateFaq = (faq, token , faqid) => {
  if (!token) {
    throw new Error("there is no token");
  }

  const formData = new FormData();
  formData.append("question[en]", faq.questionEn);
  formData.append("question[ar]", faq.questionAr);
  formData.append("answer[en]", faq.answerEn);
  formData.append("answer[ar]", faq.answerAr);

  return axios.post(`${BASE_URL}/${faqid}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
  });
};