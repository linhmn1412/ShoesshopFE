import { configureStore } from '@reduxjs/toolkit';
import userReducer, { getUserInfo } from "./services/AuthSlice";
import { useEffect } from 'react';

const store = configureStore({
  reducer: {
    user : userReducer,
  },
});


  const token = localStorage.getItem('token');
  if (token) {
    store.dispatch(getUserInfo());
  }


export default store;