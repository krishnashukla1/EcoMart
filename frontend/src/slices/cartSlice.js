// // FILE: src/slices/cartSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import API from 'API'
// import { toast } from 'react-toastify'

// const config = {
//   headers: {
//     Authorization: `Bearer ${localStorage.getItem('token')}`,
//   },
// }

// const initialState = {
//   cartItems: [],
//   loading: false,
//   error: null,
// }

// export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
//   try {
//     const { data } = await API.get('/api/cart', config)
//     return data.items || []
//   } catch (error) {
//     return rejectWithValue(error.response.data.message)
//   }
// })

// export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, qty }, { rejectWithValue }) => {
//   try {
//     const { data } = await API.post('/api/cart', { productId, qty }, config)
//     toast.success('Added to cart')
//     return data.items
//   } catch (error) {
//     toast.error(error.response.data.message)
//     return rejectWithValue(error.response.data.message)
//   }
// })

// export const updateCartItem = createAsyncThunk('cart/updateCartItem', async ({ itemId, qty }, { rejectWithValue }) => {
//   try {
//     const { data } = await API.put(`/api/cart/${itemId}`, { qty }, config)
//     toast.success('Cart updated')
//     return data.items
//   } catch (error) {
//     toast.error(error.response.data.message)
//     return rejectWithValue(error.response.data.message)
//   }
// })

// export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (itemId, { rejectWithValue }) => {
//   try {
//     const { data } = await API.delete(`/api/cart/${itemId}`, config)
//     toast.success('Removed from cart')
//     return data.items
//   } catch (error) {
//     toast.error(error.response.data.message)
//     return rejectWithValue(error.response.data.message)
//   }
// })

// export const clearCart = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
//   try {
//     await API.delete('/api/cart', config)
//     toast.success('Cart cleared')
//     return []
//   } catch (error) {
//     toast.error(error.response.data.message)
//     return rejectWithValue(error.response.data.message)
//   }
// })

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCart.pending, (state) => {
//         state.loading = true
//       })
//       .addCase(fetchCart.fulfilled, (state, action) => {
//         state.loading = false
//         state.cartItems = action.payload
//       })
//       .addCase(fetchCart.rejected, (state, action) => {
//         state.loading = false
//         state.error = action.payload
//       })
//       .addCase(addToCart.fulfilled, (state, action) => {
//         state.cartItems = action.payload
//       })
//       .addCase(updateCartItem.fulfilled, (state, action) => {
//         state.cartItems = action.payload
//       })
//       .addCase(removeFromCart.fulfilled, (state, action) => {
//         state.cartItems = action.payload
//       })
//       .addCase(clearCart.fulfilled, (state, action) => {
//         state.cartItems = action.payload
//       })
//   },
// })

// export default cartSlice.reducer

//-----------------------------------------

// FILE: src/slices/cartSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import API from "../utils/api";

// Helper function to get auth config
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json',
  },
});

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

// Async Thunks
// Updated fetchCart in cartSlice.js
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.get('/api/cart', getConfig());
      
      if (!data.items) return [];

      // Transform items to include full product details
      const itemsWithProducts = await Promise.all(
        data.items.map(async (item) => {
          try {
            // Ensure we have a product ID string
            const productId = typeof item.product === 'object' 
              ? item.product._id 
              : item.product;
            
            if (!productId) {
              console.warn('Missing product ID for cart item:', item);
              return {
                ...item,
                product: {
                  _id: 'unknown',
                  name: 'Product not available',
                  price: 0,
                  image: '/placeholder-product.jpg',
                  stock: 0,
                },
              };
            }

            const { data: product } = await API.get(
              `/api/products/${productId}`,
              getConfig()
            );
            
            return {
              ...item,
              product: {
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || '/placeholder-product.jpg',
                stock: product.stock,
              },
            };
          } catch (error) {
            console.error(`Failed to fetch product ${item.product}:`, error);
            return {
              ...item,
              product: {
                _id: typeof item.product === 'object' ? item.product._id : item.product,
                name: 'Product not available',
                price: 0,
                image: '/placeholder-product.jpg',
                stock: 0,
              },
            };
          }
        })
      );

      return itemsWithProducts;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch cart'
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, qty }, { rejectWithValue }) => {
    try {
      const { data } = await API.post(
        '/api/cart',
        { productId, qty },
        getConfig()
      );
      toast.success('Added to cart');
      return data.items;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to add item to cart'
      );
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  'cart/updateCartItem',
  async ({ itemId, qty }, { rejectWithValue, getState }) => {
    try {
      // Check stock before updating
      const item = getState().cart.cartItems.find(i => i._id === itemId);
      if (item && item.product.stock < qty) {
        toast.error(`Only ${item.product.stock} items available`);
        return rejectWithValue('Insufficient stock');
      }

      const { data } = await API.put(
        `/api/cart/${itemId}`,
        { qty },
        getConfig()
      );
      toast.success('Cart updated');
      return data.items;
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update cart item'
      );
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeFromCart',
  async (itemId, { rejectWithValue }) => {
    try {
      const { data } = await API.delete(
        `/api/cart/${itemId}`,
        getConfig()
      );
      toast.success('Item removed from cart');
      return data.items; // Make sure your backend returns the updated items array
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to remove item from cart'
      );
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      await API.delete('/api/cart', getConfig());
      toast.success('Cart cleared');
      return [];
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to clear cart'
      );
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    resetCartError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cartItems = [];
        state.lastUpdated = new Date().toISOString();
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCartError } = cartSlice.actions;
export default cartSlice.reducer;