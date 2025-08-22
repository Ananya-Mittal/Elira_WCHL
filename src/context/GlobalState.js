// src/context/GlobalState.js
import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  cart: [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addItemToCartList(item) {
    dispatch({
      type: "ADD_TO_CART",
      payload: item,
    });
  }

  function removeItemFromCartList(id) {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: id,
    });
  }

  function updateCartItemQuantity(id, quantity) {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity },
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        cart: state.cart,
        addItemToCartList,
        removeItemFromCartList,
        updateCartItemQuantity,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
