
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

export const createBrand = async (data) => {
  try {
    const response = await api.post("brand/create",data);
    return response.data;
  } catch (error) {
    console.error('createBrand fail', error);
    throw error;
  }
};

export const updateBrand = async (data , id) => {
  try {
    const response = await api.put(`brand/${id}/update`,data);
    return response;
  } catch (error) {
    console.error('updateBrand fail', error);
    throw error;
  }
};


export const deleteBrand = async (id) => {
  try {
    const response = await api.delete(`brand/${id}/delete`);
    return response;
  } catch (error) {
    console.error('deleteBrand fail', error);
    throw error;
  }
};