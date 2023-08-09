// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from ".";
// import { clearHeader, setHeader } from './apiService';


// const initialState = {
    
//     user: null,
//     accessToken: null,
//     loading: false,
//     successLogin: false,
//   };

// export const loginUser = createAsyncThunk('user/login', async (data) => {
//   try {
//     const response = await api.post('/login', data);
//     setHeader(response.data.token);
//    // console.log("token",response.data.token);
//     return response.data;
//   } catch (error) {
//     throw new Error('Login failed!');
//   }
// });

// export const getUserInfo = async () => {
//   try {
//     const response = await api.get('/user');
//     return response.data;

//   } catch (error) {
//     console.error('Error fetching user info:', error);
//   }
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState: initialState,
//     reducers: {
//     logout: (state, action) => {
//       state.user = null;
//       state.successLogin = false;
//       state.loading = false;
//       state.error = null;
//       clearHeader();
//       localStorage.removeItem("token");
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = true;
//         state.error = null;
//         if (action.payload) {
//           state.successLogin = true;
//           state.user= action.payload.user;
//           state.accessToken= action.payload.access_token;
//           localStorage.setItem("token", action.payload.access_token);
//         } else {
//           state.successLogin = false;
//         }
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.successLogin = false;
//         state.error = action.error.message;
//       });
//   },
// });

// export const { logout } = userSlice.actions;
// export default userSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import api from ".";

// const initialState = {
//   user: null,
//   accessToken: null,
//   loading: false,
//   successLogin: false,
// };

// export const login = createAsyncThunk('login', async (data) => {
//   try {
//     const response = await api.post('/login', data);
//     setHeader(response.data.token);
//     return response.data;
//   } catch (error) {
//     throw new Error('Login failed!');
//   }
// });

// export const logout = createAsyncThunk('logout', async () => {
//   try {
//     clearHeader();
//     localStorage.removeItem("token");
//     return null;
//   } catch (error) {
//     throw new Error('Logout failed!');
//   }
// });

// const userSlice = createSlice({
//   name: 'user',
//   initialState: initialState,
//   reducers: {
   
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.successLogin = true;
//         state.user = action.payload.user;
//         state.accessToken = action.payload.access_token;
//         localStorage.setItem("token", action.payload.access_token);
//       })
//       .addCase(login.rejected, (state) => {
//         state.loading = false;
//         state.successLogin = false;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//         state.successLogin = false;
//         state.loading = false;
//         state.accessToken = null;
//       })
//       .addCase(logout.rejected, (state) => {
//       });
//   },
// });

// export default userSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from ".";
import { clearHeader, setHeader } from './apiService';

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  successLogin: false,
  userChanged : false
};

// Thunk action để thực hiện việc đăng nhập
export const login = createAsyncThunk('login', async (data) => {
  try {
    const response = await api.post('/login', data);
    return response.data;
  } catch (error) {
    throw new Error('Login failed!');
  }
});

// Thunk action để lấy thông tin người dùng từ server
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
