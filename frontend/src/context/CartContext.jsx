import { createContext, useState, useEffect } from "react";
import API from "../utils/api";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });

  const fetchCart = async () => {
    try {
      const { data } = await API.get("/cart");
      setCart(data);
    } catch (err) {
      if (err.response?.status === 401) {
        console.warn("Unauthorized: user not logged in or token expired");
        setCart({ items: [] });
      } else {
        console.error(err);
      }
    }
  };

  const addToCart = async (productId, qty = 1) => {
    try {
      await API.post("/cart", { productId, qty });
      fetchCart();
    } catch (err) {
      console.error(err);
        if (err.response?.status === 400) {
            alert(err.response.data.message || "Failed to add to cart");
        } else {
            alert("An error occurred while adding to cart");
        }
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await API.delete(`/cart/${itemId}`);
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
