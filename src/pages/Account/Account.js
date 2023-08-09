import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Title from "../../components/Title/Title";
import AccountProfile from "./AccountProfile";
const Account = () => {
    return ( <div>
        <Header/>
        <Title content= "Tài khoản"/>
        <AccountProfile />
        <Footer />
    </div> );
}
 
export default Account;