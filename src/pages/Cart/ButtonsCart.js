import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import { formatMoney } from "../../utils/formatMoney";

const ButtonsCart = ({selectedProducts}) => {
    const {cartItems} = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(()=>{
        calculateTotalPrice();
    }, [selectedProducts, cartItems]);
    const calculateTotalPrice = ()=>{
        const total = cartItems.filter((item)=> selectedProducts.includes(item.id_variant))
        .reduce((acc, val)=>acc+(val.price - (val.price * val.discount_value * 0.01)) * val.quantity,0);
        setTotalPrice(total);
    }
   // console.log(totalPrice);
    return ( 
        <>
         <center>
        <Link to="/shop" className=" btn btn-success text-white primary-background" style={{width: "300px"}}>Xem thêm sản phẩm</Link>
    </center>
    <div className="card my-3">
        <div className="card-header">
            <div className="float-start">
                <p className="card-title fw-bold mt-2 primary-text" >Tổng tiền: <span className="fs-4">{formatMoney(totalPrice)}</span>
                </p>
            </div>
            <div className="float-end">
                {selectedProducts.length > 0 ?(
                     <Link className="btn btn-success  text-white m-2 primary-background" 
                     to={{ pathname: "/checkout", search: `?selectedProducts=${selectedProducts.join(",")}` }}
                     >Đặt hàng</Link>
                ):(
                    <button  className="btn btn-success  text-white m-2 primary-background" disabled>Đặt hàng</button>
                )}
               
            </div>
        </div>
    </div>
        </>
     );
}
 
export default ButtonsCart;