
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
