import React, { createContext, useContext, useReducer } from "react";

// Başlangıç değeri
const CartContext = createContext();

const initialState = {
  cartItems: [],
};

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const index = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (index !== -1) {
        const updatedItems = [...state.cartItems];
        const newQuantity =
          updatedItems[index].quantity + Number(action.payload.quantity);

        if (newQuantity <= 0) {
          updatedItems.splice(index, 1);
        } else {
          updatedItems[index] = {
            ...updatedItems[index],
            quantity: newQuantity,
          };
        }

        return { ...state, cartItems: updatedItems };
      } else if (action.payload.quantity > 0) {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload }],
        };
      } else {
        return state;
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addItem,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartContext);
