import api from ".";

// create order
export const createOrder = async (data) => {
  try {
    const response = await api.post("/order/create", data);
    return response.data;
  } catch (error) {
    console.error("createOrder fail", error);
    throw error;
  }
};

// get orders pending
export const getOrdersPending = async (page) => {
  try {
    const response = await api.get(`getOrderPending?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("getOrdersPending fail", error);
    throw error;
  }
};

// get all orders
export const getAllOrders = async (page) => {
  try {
    const response = await api.get(`getAllOrders?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("getOrdersPending fail", error);
    throw error;
  }
};

// get orders by user
export const getOrdersByUser = async () => {
  try {
    const response = await api.get("/getOrdersByUser");
    return response.data;
  } catch (error) {
    console.error("getOrdersByUser fail", error);
    throw error;
  }
};

// get orders by id
export const getOrderById = async (id) => {
  try {
    const response = await api.get(`/getOrder/${id}`);
    return response.data;
  } catch (error) {
    console.error("getOrdersById fail", error);
    throw error;
  }
};

// approve order by staff
export const confirmOrder = async (id) => {
  try {
    const response = await api.put(`order/${id}/confirm`);
    return response.data;
  } catch (error) {
    console.error("getOrdersPending fail", error);
    throw error;
  }
};

// cancel order by user
export const cancelOrder = async (id) => {
  try {
    const response = await api.put(`order/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error("cancelOrder fail", error);
    throw error;
  }
};

// recieve order by user
export const receiveOrder = async (id) => {
  try {
    const response = await api.put(`order/${id}/receive`);
    return response.data;
  } catch (error) {
    console.error("receiveOrder fail", error);
    throw error;
  }
};

export const payment = async (data) => {
  try {
    const response = await api.post("/payment-vnpay", data);
    return response.data;
  } catch (error) {
    console.error("payment fail", error);
    throw error;
  }
};
