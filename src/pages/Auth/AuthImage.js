import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
const AuthImage = ({img}) => {
    return ( 
        <div className="text-center h-100">
                    <img src={img} height={"500px"} width={"100%"} alt="" />
                    <p className="mt-1 mb-2 pb-1">
                      <Link className="" to="/"><img src={logo} height="45" width="100" alt="SHOES SHOP" loading="lazy"/></Link>
                      &ensp;<Link to="/" className="primary-text fw-bold">Shoes Shop</Link>
                      <span> hân hạnh đón tiếp bạn</span>
                    </p>
                  </div>
     );
}
 
export default AuthImage;