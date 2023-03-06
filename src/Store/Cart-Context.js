import React from "react";

const CartContext = React.createContext({
    lists: [],
    items: [],
    totalAmount: 0,
    addProduct: (prodct) => {},
    addItem: (item) =>{},
    removeItem: (id,size) => {},
});

export default CartContext;