import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  return useContext(CartContext);
}


export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  function addToCart(item) {
    setCart((prevCart) => {
      const c = [...prevCart];
      const existing = c.find((ci) => ci.menuId === item.id);
      
      if (existing) {
        existing.qty += 1;
      } else {
        c.push({
          menuId: item.id,
          name: item.name,
          price: item.price,
          qty: 1,
          imageUrl: item.imageUrl,
        });
      }
      return c;
    });
  }

  function updateQty(menuId, newQty) {
    setCart((prevCart) => {
      if (newQty <= 0) {
        return prevCart.filter(item => item.menuId !== menuId);
      } else {
        return prevCart.map(item =>
          item.menuId === menuId ? { ...item, qty: newQty } : item
        );
      }
    });
  }

  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  function clearCart() {
    setCart([]);
  }

  const value = {
    cart,
    addToCart,
    updateQty,
    clearCart,
    totalItems,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
