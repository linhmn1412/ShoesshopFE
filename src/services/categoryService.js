
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