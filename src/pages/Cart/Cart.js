
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import TableCart from "./TableCart";


const Cart = () => {

        return ( 
            <div>
                <Header />
                <Title content = "Giỏ hàng"/>   
                <TableCart />
                
                <Footer/>
            </div>
         );
    
}

 
export default Cart;