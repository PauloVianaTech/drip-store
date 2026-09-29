/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const getSalePrice = (product) => (
  typeof product?.priceDiscount === 'number' && product.priceDiscount < product.price
    ? product.priceDiscount
    : product?.price ?? 0
);

const normalizeCart = (items) => Array.isArray(items)
  ? items.map((item) => ({ ...item, quantity: Number.isInteger(item.quantity) && item.quantity > 0 ? item.quantity : 1 }))
  : [];

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return normalizeCart(JSON.parse(localStorage.getItem('cartItems') || '[]'));
    } catch {
      return [];
    }
  });

  useEffect(() => { localStorage.setItem('cartItems', JSON.stringify(cartItems)); }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);
      if (!existing) return [...items, { ...product, quantity: 1 }];
      const limit = Number.isFinite(existing.stock) && existing.stock >= 0 ? existing.stock : Infinity;
      return items.map((item) => item.id === product.id
        ? { ...item, quantity: Math.min(item.quantity + 1, limit) }
        : item);
    });
  };

  const decreaseQuantity = (id) => setCartItems((items) => items.flatMap((item) => {
    if (item.id !== id) return [item];
    return item.quantity > 1 ? [{ ...item, quantity: item.quantity - 1 }] : [];
  }));

  const removeFromCart = (id) => setCartItems((items) => items.filter((item) => item.id !== id));
  const clearCart = () => { setCartItems([]); localStorage.removeItem('cartItems'); };
  const isInCart = (id) => cartItems.some((item) => item.id === id);
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleCartItem = (product) => isInCart(product.id) ? removeFromCart(product.id) : addToCart(product);

  return <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, isInCart, toggleCartItem, getSalePrice, cartQuantity }}>{children}</CartContext.Provider>;
};