import { MDBIcon } from "mdb-react-ui-kit";
import NavItem from "./NavItem";
import '../../../assets/css/style.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/AuthSlice";
import { useContext } from "react";
import { CartContext } from "../../../contexts/CartContext";

const Navigation = () => {
    const dispatch = useDispatch();
    const { totalCartItems, setCartItems } = useContext(CartContext);
    const user = useSelector((state) => state.user.user);
    const handleLogOut = () =>{
      dispatch(logout()) 
    }

    return ( 
        <div className="collapse navbar-collapse" id="navbarButtons">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>

            <div className="d-flex align-items-center float-right">
                <NavItem  link="/" content="Trang chủ" />
                <NavItem  link="/shop" content="Cửa hàng" />
                <NavItem  link="/sale/10" content="Khuyến Mãi" />
                <NavItem  link="/blog" content="Bài viết" />
                  <Link className="text-reset me-3 dropdown-toggle hidden-arrow" to ="/cart" title="Giỏ Hàng" data-mdb-toggle="tooltip" data-mdb-placement="bottom">
                      <MDBIcon fas icon="shopping-cart" />
                      <span className="badge rounded-pill badge-notification primary-background"  id="productCartCount">{totalCartItems}</span>
                  </Link>
              {localStorage.getItem('token') ?(
                 <div className="dropdown">
                 <Link className="text-reset dropdown-toggle hidden-arrow " to="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                 <i className="fas fa-user primary-text p-1" ></i> 
                 <span className="primary-text">{user && user.username}</span>
                 </Link>
                 <ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="navbarDropdownMenuLink">
    
                         <li><Link className="dropdown-item primary-text" to="/account" >Tài Khoản</Link></li>
                         <li><Link className="dropdown-item primary-text" to="/purchase" >Đơn Mua</Link></li>
                         <li><Link className="dropdown-item primary-text" to="/login" onClick={ handleLogOut}>Đăng Xuất</Link></li>
                         {user && user.id_role === 1 || user && user.id_role === 2 ? (<li><Link className="dropdown-item primary-text" to="/admin">Quản lý</Link></li>):(<></>)}
                 </ul>
             </div> 
              ):(
                <>
                 <Link className="btn btn-outline-success " to="/login">Đăng nhập</Link>
                &ensp;
                <Link className="btn btn-success" to="/register">Đăng ký</Link></>
              )}
                

               

            </div>

        </div>
     );
              }
 
export default Navigation;