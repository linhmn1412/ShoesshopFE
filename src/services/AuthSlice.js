// export default userSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from ".";
import { clearHeader, setHeader } from './apiService';

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  successLogin: false,
  errorLogin : null ,
  successRegister: false,
  successUpdateAccount: false,
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

  export const forgotPassword = async (data) => {
    try {
      const response = await api.post("forgot-password", data);
      return response;
    } catch (error) {
      console.error('forgotPassword fail', error);
      throw error;
    }
  };

  export const changePassword = async (data) => {
    try {
      const response = await api.put("change-password", data);
      return response;
    } catch (error) {
      console.error('changePassword fail', error);
      throw error;
    }
  };

  export const createStaff = async (data) => {
    try {
      const response = await api.post("staff/create", data);
      return response;
    } catch (error) {
      console.error('createStaff fail', error);
      throw error;
    }
  };

  export const updateStaff = async (data,id) => {
    try {
      const response = await api.put(`staff/${id}/update`, data);
      return response;
    } catch (error) {
      console.error('createStaff fail', error);
      throw error;
    }
  };

// Thunk action to login
export const login = createAsyncThunk('login', async (data) => {
  try {
    const response = await api.post('/login', data);
    const responseData = {
      data: response.data,
      status: response.status, 
    };
    return responseData;
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

export const updateUserAccount = createAsyncThunk('updateUserAccount', async (data) => {
  try {
    const response = await api.put('/account/update', data);
    return response;
  } catch (error) {
    throw new Error('updateUserAccount failed!');
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
      state.successUpdateAccount = false;
      state.successRegister = false;
      state.loading = false;
      state.error = null;
      state.errorLogin = null;
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
        state.successLogin = false;
        state.errorLogin = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.errorLogin = null;
        if(action.payload){
        if (action.payload.status === 200) {
          
          state.successLogin = true;
          state.user = action.payload.data.user;
          state.accessToken = action.payload.data.access_token;
          localStorage.setItem("token", action.payload.data.access_token);
          setHeader(action.payload.data.access_token);
          state.userChanged = true;
          
        } else {
          state.successLogin = false;
          state.errorLogin = action.payload.data.errors;
        }
      }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.successLogin = false;
       // state.error = action.payload.errors;
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
      })
      .addCase(updateUserAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successUpdateAccount = false;
      })
      .addCase(updateUserAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          if(action.payload.status === 200) {
            state.user = action.payload.data.user;
            state.successUpdateAccount = true;
          }
          else {
            state.notiErrors = action.payload.data.errors;
            state.successUpdateAccount = false;

          }
        }else{
          state.successUpdateAccount = false;
        }
      })
      .addCase(updateUserAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.successUpdateAccount = false;

      });
  },
});

export const { logout, setUserChanged } = userSlice.actions;
export default userSlice.reducer;
