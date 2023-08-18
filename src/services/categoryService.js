
import api from '.';

  // get list category
export const getCategories = async () => {
    try {
      const response = await api.get(`/categories`);
      return response.data;
    } catch (error) {
      console.error('getCategories fail', error);
      throw error;
    }
  };

     // get list categories for admin
export const getAllCategories = async (page) => {
  try {
    const response = await api.get(`/getAllCategories?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getAllCategories fail', error);
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    const response = await api.post("category/create",data);
    return response.data;
  } catch (error) {
    console.error('createCategory fail', error);
    throw error;
  }
};

export const updateCategory = async (data , id) => {
  try {
    const response = await api.put(`category/${id}/update`,data);
    return response;
  } catch (error) {
    console.error('updateCategory fail', error);
    throw error;
  }
};


export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`category/${id}/delete`);
    return response;
  } catch (error) {
    console.error('deleteCategory fail', error);
    throw error;
  }
};