import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/products';

export const getProducts = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const searchProducts = async (query) => {
  const response = await axios.get(`${API_BASE_URL}/search`, {
    params: { query }
  });
  return response.data;
};

export const getProductsByCategory = async (category) => {
  const response = await axios.get(`${API_BASE_URL}/category/${category}`);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_BASE_URL, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/${id}`);
  return response.data;
};
