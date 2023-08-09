import api from '.';


// get list reviews by id product
export const getReviewsProduct = async (id,page) => {
  try {
    const response = await api.get(`/product-${id}/review?page=${page}`);
    return response.data;
  } catch (error) {
    console.error('getAllProducts fail', error);
    throw error;
  }
};

// create review
export const createReviews = async (data) => {
  try {
    const response = await api.post("/reviews/create", data);
    return response.data;
  } catch (error) {
    console.error('createReviews fail', error);
    throw error;
  }
};