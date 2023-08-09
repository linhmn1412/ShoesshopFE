import api from ".";

export const setHeader = (token) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };
  
  // Hàm để xóa header Authorization
  export const clearHeader = () => {
    delete api.defaults.headers.common['Authorization'];
  };

 