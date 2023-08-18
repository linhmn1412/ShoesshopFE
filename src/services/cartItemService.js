import api from ".";

// get list cart item by user
export const getCartItemByUser = async (page) => {
    try {
      const response = await api.get(`/getCartItemByUser?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('getCartItemByUser fail', error);
      throw error;
    }
  };

  // add product to cart
export const addToCart = async (variant, quantity) => {
  try {
    const response = await api.post("/addToCart",{
      id_variant : variant.id_variant,
      quantity
    });
    return response.data;
  } catch (error) {
    console.error('addToCart fail', error);
    throw error;
  }
};

  // update product to cart
  export const update = async (id, quantity) => {
    try {
      const response = await api.post(`cartItem/${id}/update`, {
        quantity : quantity
      });
      return response.data;
    } catch (error) {
      console.error('update cart item fail', error);
      throw error;
    }
  };

  // remove product to cart
  export const remove = async (id) => {
    try {
      const response = await api.delete(`cartItem/${id}/delete`);
      return response.data;
    } catch (error) {
      console.error('remove cart item fail', error);
      throw error;
    }
  };