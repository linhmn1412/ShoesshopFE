import api from '.';


// get list all products
export const getAllProducts = async (page) => {
  try {
    const response = await api.get(`/products?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getAllProducts fail', error);
    throw error;
  }
};
// get list new arrivals
export const getProductsNewArrivals = async (page) => {
    try {
      const response = await api.get(`/products/newArrivals?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('getProductsNewArrivals fail', error);
      throw error;
    }
  };
  // get list best seller
export const getProductsBestSellers = async (page) => {
    try {
      const response = await api.get(`/products/bestSellers?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('getProductsBestSellers fail', error);
      throw error;
    }
  };

// get list products by category
export const getProductsByCategory = async (category,page) => {
  try {
    const response = await api.get(`/products/category=${category}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getProductsByCategory fail', error);
    throw error;
  }
};

// get list products by brand
export const getProductsByBrand = async (brand,page) => {
  try {
    const response = await api.get(`/products/brand=${brand}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getProductsByBrand fail', error);
    throw error;
  }
};

// get list products by price
export const getProductsByPrice = async (price,page) => {
  try {
    const response = await api.get(`/products/price=${price}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getProductsByPrice fail', error);
    throw error;
  }
};

// get list products by price
export const getProductsSale = async (sale,page) => {
  try {
    const response = await api.get(`/products/sale=${sale}?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getProductsSale fail', error);
    throw error;
  }
};

// get detail product
export const getProductDetail = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error('getProductDetail fail', error);
    throw error;
  }
};

// get image product
export const getImageProduct = async (id, image) => {
  try {
    const response = await api.get(`/product/${id}/${image}`);
    return response.data;
  } catch (error) {
    console.error('getImageProduct fail', error);
    throw error;
  }
};

// get list all products for Admin
export const getProductsAdmin = async (page) => {
  try {
    const response = await api.get(`/getAllProducts?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getProductsAdmin fail', error);
    throw error;
  }
};
