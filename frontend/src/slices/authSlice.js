// // FILE: src/slices/authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import { toast } from 'react-toastify'
// import API from "../utils/api";

// const initialState = {
//   userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
//   loading: false,
//   error: null,
// }

// export const register = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
//   try {
//     const { data } = await API.post('/api/auth/register', userData)
//     localStorage.setItem('userInfo', JSON.stringify(data.user))
//     localStorage.setItem('token', data.token)
//     return data.user
//   } catch (error) {
//     return rejectWithValue(error.response.data.message)
//   }
// })

// export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
//   try {
//     const { data } = await API.post('/api/auth/login', userData)
//     localStorage.setItem('userInfo', JSON.stringify(data.user))
//     localStorage.setItem('token', data.token)
//     return data.user
//   } catch (error) {
//     return rejectWithValue(error.response.data.message)
//   }
// })

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: (state) => {
//       state.userInfo = null
//       localStorage.removeItem('userInfo')
//       localStorage.removeItem('token')
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(register.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false
//         state.userInfo = action.payload
//         toast.success('Registered successfully')
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//         toast.error(action.payload)
//       })
//       .addCase(login.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false
//         state.userInfo = action.payload
//         toast.success('Logged in successfully')
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//         toast.error(action.payload)
//       })
//   },
// })

// export const { logout } = authSlice.actions
// export default authSlice.reducer

//-------------
// FILE: src/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import API from "../utils/api";

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  loading: false,
  error: null,
}

// ✅ Register User
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/auth/register', userData) // 🔥 no extra /api
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      return data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed")
    }
  }
)

// ✅ Login User
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await API.post('/auth/login', userData) // 🔥 no extra /api
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      return data.user
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed")
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        toast.success('Registered successfully')
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.userInfo = action.payload
        toast.success('Logged in successfully')
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        toast.error(action.payload)
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
