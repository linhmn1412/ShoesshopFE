
import api from '.';

  // get list brand
export const getBrands = async () => {
    try {
      const response = await api.get(`/brands`);
      return response.data;
    } catch (error) {
      console.error('getBrands fail', error);
      throw error;
    }
  };

  // get list brands for admin
export const getAllBrands = async (page) => {
  try {
    const response = await api.get(`/getAllBrands?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getAllBrands fail', error);
    throw error;
  }
};