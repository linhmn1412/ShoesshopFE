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
export const getImageProduct = async (id) => {
  try {
    const response = await api.get(`/product/${id}/image`);
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

// create product
export const createProduct = async (data) => {
  try {
    const response = await api.post("/product-create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error('createProduct fail', error);
    throw error;
  }
};

// update product
export const updateProduct = async (data , id) => {
  try {
    const response = await api.post(`/product/${id}/update`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error('updateProduct fail', error);
    throw error;
  }
};

// update product
export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/product/${id}/delete`);
    return response;
  } catch (error) {
    console.error('deleteProduct fail', error);
    throw error;
  }
};
 
// top selling products
export const topSellingProducts = async () => {
  try {
    const response = await api.get("top5-selling-products");
    return response.data;
  } catch (error) {
    console.error('deleteProduct fail', error);
    throw error;
  }
};

// revenue statistics
export const revenueStatistics = async () => {
  try {
    const response = await api.get("revenue-statistics");
    return response.data;
  } catch (error) {
    console.error('deleteProduct fail', error);
    throw error;
  }
};
