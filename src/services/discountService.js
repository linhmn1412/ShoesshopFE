
import api from '.';


  // get list discount
export const getDiscounts = async () => {
    try {
      const response = await api.get(`/discounts`);
      return response.data;
    } catch (error) {
      console.error('getDiscounts fail', error);
      throw error;
    }
  };

    // get list discount for admin
export const getAllDiscounts = async (page) => {
  try {
    const response = await api.get(`/getAllDiscounts?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getDiscounts fail', error);
    throw error;
  }
};

export const createDiscount = async (data) => {
  try {
    const response = await api.post("discount/create",data);
    return response.data;
  } catch (error) {
    console.error('createDiscount fail', error);
    throw error;
  }
};

export const updateDiscount = async (data, id) => {
  try {
    const response = await api.put(`discount/${id}/update`,data);
    return response;
  } catch (error) {
    console.error('updateDiscount fail', error);
    throw error;
  }
};


export const deleteDiscount = async (id) => {
  try {
    const response = await api.delete(`discount/${id}/delete`);
    return response;
  } catch (error) {
    console.error('deleteDiscount fail', error);
    throw error;
  }
};