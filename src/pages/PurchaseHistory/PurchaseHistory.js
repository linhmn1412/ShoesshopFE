import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import TabPurchase from "./TabPurchase/TabPurchase";

const PurchaseHistory = () => {
    return ( 
        <div>
            <Header/>
            <Title content="lịch sử mua hàng"/>
            <TabPurchase/>
            <Footer/>
        </div>
     );
}
 
export default PurchaseHistory;