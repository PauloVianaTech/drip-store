/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const getSalePrice = (product) => {
  if (typeof product?.priceDiscount === 'number' && product.priceDiscount < product.price) {
    return product.priceDiscount;
  }

  return product?.price ?? 0;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cartItems');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((previousItems) => (
      previousItems.some((item) => item.id === product.id)
        ? previousItems
        : [...previousItems, product]
    ));
  };

  const removeFromCart = (id) => {
    setCartItems((previousItems) => previousItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const toggleCartItem = (product) => {
    if (isInCart(product.id)) {
      removeFromCart(product.id);
      return;
    }

    addToCart(product);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      toggleCartItem,
      getSalePrice,
    }}>
      {children}
    </CartContext.Provider>
  );
};