
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import InputSearch from "../Header/InputSearch/InputSearch";
import Navigation from "./Navigation/Navigation";
const Header = ({onSearch}) => {
    return ( 
<nav className="navbar navbar-expand-lg navbar-light bg-light shadow-2 fixed-top">
    <div className="container">
        <Link className="navbar-brand me-2" to="/"><img src={logo} height="45" width="100" alt="SHOES SHOP" loading="lazy"/></Link>
        <InputSearch onSearch={onSearch}/>
        <Navigation />
    </div>
    
</nav>   
    );
}
 
export default Header;