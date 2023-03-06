import CartContext from "./Cart-Context";
import { useState } from "react";

const CartProvider = (props) => {
  const [listItems, setListItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const addProductToListHandler = (list) => {
    setListItems([...listItems, list]);
  };
  const addItemToCartHandler = (item) => {
    setTotalAmount(totalAmount + item.prise);
    const existingCartItemIndex1 = listItems.findIndex(
        (itm) => itm.id === item.id );
    const existingCartItemIndex = cartItems.findIndex(
        (itm) => itm.id === item.id && itm.size === item.size);
    const existingCartItem = cartItems[existingCartItemIndex];
    if(existingCartItem){
        if(item.size === "l" && item.large){
            cartItems[existingCartItemIndex].quantity += 1;
            cartItems[existingCartItemIndex].large -= 1;
            listItems[existingCartItemIndex1].large -= 1;
            setCartItems(cartItems);
            setListItems(listItems);
        }
        if(item.size === "m" && item.medium){
            cartItems[existingCartItemIndex].quantity += 1;
            cartItems[existingCartItemIndex].medium -= 1;
            listItems[existingCartItemIndex1].medium -= 1;
            setCartItems(cartItems);
            setListItems(listItems);
        }
        if(item.size === "s" && item.small){
            cartItems[existingCartItemIndex].quantity += 1;
            cartItems[existingCartItemIndex].small -= 1;
            listItems[existingCartItemIndex1].small -= 1;
            setCartItems(cartItems);
            setListItems(listItems);
        }
    }
    else{
        if(item.size === "l"){
            listItems[existingCartItemIndex1].large -= 1;
            item.large -=1;
            setListItems(listItems);
        }
        if(item.size === 'm'){
            listItems[existingCartItemIndex1].medium -= 1;
            item.medium -=1;
            setListItems(listItems);
        }
        if(item.size === 's'){
            listItems[existingCartItemIndex1].small -= 1;
            item.small -= 1;
            setListItems(listItems);
        }
        
        setCartItems([...cartItems,item])
    }
  };
  const removeItemFromCartHandler = (id,size) => {
    const existingCartItemIndex = cartItems.findIndex(
        (itm) => itm.id === id && itm.size === size);
    const existingCartItemIndex1 = listItems.findIndex(
            (itm) => itm.id === id );
    setTotalAmount(totalAmount - cartItems[existingCartItemIndex].prise);
    if(cartItems[existingCartItemIndex].quantity === 1){
        setCartItems(cartItems.filter((item) => item.id !== id || item.size !== size));
        if(size === 'l')
            listItems[existingCartItemIndex1].large += 1;
        else if(size === 'm')
            listItems[existingCartItemIndex1].medium += 1;
        else
            listItems[existingCartItemIndex1].small += 1;
    }
    else{
        cartItems[existingCartItemIndex].quantity -= 1;
        setCartItems(cartItems);
        if(size === 'l')
            listItems[existingCartItemIndex1].large += 1;
        else if(size === 'm')
            listItems[existingCartItemIndex1].medium += 1;
        else
            listItems[existingCartItemIndex1].small += 1
    }
  };

  const cartContext = {
    lists: listItems,
    items: cartItems,
    totalAmount: totalAmount,
    addProduct: addProductToListHandler,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return(<CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
  );
};

export default CartProvider;
