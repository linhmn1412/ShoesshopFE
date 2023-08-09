import React, { createContext, useCallback, useEffect, useState } from "react";
import { getCartItemByUser, remove, update } from "../services/cartItemService";
import { addToCart } from "../services/cartItemService";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const user = useSelector((state)=>state.user.user);
     
        useEffect(() => {
          if(user){
            getCartItems(currentPage);
          }
          else{
            setCartItems([]);
            setCurrentPage(1);
            setTotalPages(1);
            setTotalCartItems(0);
          }
        }, [currentPage, user]);

      const getCartItems = (page ) =>{
        
        getCartItemByUser(page)
            .then((data)=>{
              setCartItems(data.data);
              setTotalPages(data.last_page);
              setTotalCartItems(data.total);
            })
            .catch((error)=>{
              console.log('Error getting cart items:',error);
            })
       };

  // Function to add an item to the cart
  const createOrUpdateCartItem = (product, quantity) => {
    addToCart(product, quantity)
    .then((response) => { 
      getCartItems(currentPage);
      toast.success(response.message);
    })
    .catch((error) => {
      console.error("Error adding variant to cart:", error);
    });
  };


   const updateCartItem = (id, quantity) => {
    update(id, quantity)
    .then((response) => { 
      getCartItems(currentPage);
      toast.success(response.message);
    })
    .catch((error) => {
      console.error("Error adding variant to cart:", error);
    });
  };

  const removeCartItem = (id) => {
    remove(id)
    .then((response) => { 
      getCartItems(currentPage);
      toast.success(response.message);
    })
    .catch((error) => {
      console.error("Error adding variant to cart:", error);
    });
  };

  const cartContextValue = {
    cartItems,
    getCartItems,
    setCartItems,
    createOrUpdateCartItem,
    updateCartItem,
    removeCartItem,
    currentPage,
    totalPages,
    setCurrentPage,
    totalCartItems,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
