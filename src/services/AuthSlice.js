// export default userSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from ".";
import { clearHeader, setHeader } from './apiService';

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  successLogin: false,
  successRegister: false,
  notiErrors : null
};

  // get list account staffs for admin
  export const getAllStaffs = async (page) => {
    try {
      const response = await api.get(`/getAllStaffs?page=${page}`);
      return response.data;
    } catch (error) {
      console.error('getAllStaffs fail', error);
      throw error;
    }
  };

// Thunk action to login
export const login = createAsyncThunk('login', async (data) => {
  try {
    const response = await api.post('/login', data);
    return response.data;
  } catch (error) {
    throw new Error('Login failed!');
  }
});

// Thunk action to register
export const registerAccount = createAsyncThunk('registerAccount', async (data) => {
  try {
    const response = await api.post('/register', data);
    return response.data;
  } catch (error) {
    return error.response.data.errors;
  }
});

// Thunk action to get user info
export const getUserInfo = createAsyncThunk('getUserInfo', async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logout: (state, action) => {
      state.user = null;
      state.accessToken = null;
      state.successLogin = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("token");
      clearHeader();
      state.userChanged = false;
    },
    setUserChanged: (state, action) => {
      state.userChanged = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          
          state.successLogin = true;
          state.user = action.payload.user;
          state.accessToken = action.payload.access_token;
          localStorage.setItem("token", action.payload.access_token);
          setHeader(action.payload.access_token);
          state.userChanged = true;
          
        } else {
          state.successLogin = false;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.successLogin = false;
        state.error = action.error.message;
      })
      .addCase(registerAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.notiErrors = null;
        state.successRegister = false;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          if(action.payload.errors) {
            state.notiErrors = action.payload.errors;
          }
          else {
            state.successRegister = true;
          }
        } else {
          state.successLogin = false;
        }
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.successRegister = false;
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.successLogin = true;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout, setUserChanged } = userSlice.actions;
export default userSlice.reducer;
