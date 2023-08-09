import { useLocation } from "react-router";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import Title from "../../components/Title/Title";
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { useSelector } from "react-redux";
import { formatMoney } from "../../utils/formatMoney";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CheckoutDetail from "./CheckoutDetail";

const Checkout = () => {
    const breadcrumbItems = [
        { text: "Trang Chủ", link: "/" },
        { text: "Giỏ hàng", link: "/cart" },
        { text: "Đặt hàng", link: "/checkout" },
      ];
  
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const selectedProductsString = queryParams.get("selectedProducts");
    const selectedProducts = selectedProductsString ? selectedProductsString.split(",") : [];
    
    
    return ( 
        <div className="container">
            <Header/>
            <Title content="Đặt hàng"/>
            <Breadcrumb items={breadcrumbItems} />
            <CheckoutDetail selectedProducts = {selectedProducts}/>
        <Footer/>
        </div>
     );
}
 
export default Checkout;