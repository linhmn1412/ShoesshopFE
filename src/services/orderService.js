import api from ".";

// create order
export const createOrder = async (data) => {
    try {
      const response = await api.post("/order/create", data);
      return response.data;
    } catch (error) {
      console.error('createOrder fail', error);
      throw error;
    }
  };

  // get orders pending
export const getOrdersPending = async (page) => {
  try {
    const response = await api.get(`getOrderPending?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getOrdersPending fail', error);
    throw error;
  }
};

  // get all orders 
  export const getAllOrders = async (page) => {
    try {
      const response = await api.get(`getAllOrders?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('getOrdersPending fail', error);
      throw error;
    }
  };

    // get orders by user
    export const getOrdersByUser = async () => {
      try {
        const response = await api.get('/getOrdersByUser');
        return response.data;
      } catch (error) {
        console.error('getOrdersByUser fail', error);
        throw error;
      }
    };

  // approve order by staff
  export const confirmOrder = async (id) => {
    try {
      const response = await api.put("order/approve",{
        id_order: id
      });
      return response.data;
    } catch (error) {
      console.error('getOrdersPending fail', error);
      throw error;
    }
  };

    // cancel order by user
    export const cancelOrder = async (id) => {
      try {
        const response = await api.put("order/cancel",{
          id_order: id
        });
        return response.data;
      } catch (error) {
        console.error('cancelOrder fail', error);
        throw error;
      }
    };

     // recieve order by user
     export const receiveOrder = async (id) => {
      try {
        const response = await api.put("order/receive",{
          id_order: id
        });
        return response.data;
      } catch (error) {
        console.error('receiveOrder fail', error);
        throw error;
      }
    };