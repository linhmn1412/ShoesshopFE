import { Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png"
import { logout } from "../../../services/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import InputSearch from "../../../components/Header/InputSearch/InputSearch";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user.user);
   const handleLogOut = () =>{
    dispatch(logout());
   }
    return ( 
        <nav className="navbar navbar-expand position-absolute top-0 navbar-light bg-white topbarstatic-top shadow w-100 " style={{zIndex: "200"}}>
            <div className="container ">
            <div className="navbar-brand">
            <img className="img-profile " height="50" src={logo}/>
            <Link className="sidebar-brand d-flex align-items-center justify-content-center primary-text fw-bold " to="/admin">
		<div className="sidebar-brand-text mx-3 py-1">SHOES SHOP</div>
	</Link>
            </div>

	

         <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
	<ul className="navbar-nav ml-auto d-flex align-items-center">

		<li className="nav-item dropdown no-arrow mx-1">
            <Link className="text-reset me-3 dropdown-toggle hidden-arrow" to ="/cart" title="Giỏ Hàng" data-mdb-toggle="tooltip" data-mdb-placement="bottom">
                    <i className="fas fa-bell fa-fw"></i>
                    <span className="badge rounded-pill badge-notification primary-background"  id="productCartCount">0</span>
                </Link>
                </li>
		<li className="nav-item dropdown no-arrow mx-1">

                <Link className="text-reset me-3 dropdown-toggle hidden-arrow" to ="/cart" title="Giỏ Hàng" data-mdb-toggle="tooltip" data-mdb-placement="bottom">
                <i className="fas fa-envelope fa-fw"></i>
                    <span className="badge rounded-pill badge-notification primary-background"  id="productCartCount">0</span>
                </Link>
			
                </li>
		
		<li className="dropdown nav-item">

                
                <Link className="text-reset dropdown-toggle hidden-arrow " to="#" id="navbarDropdownMenuLink" role="button" data-mdb-toggle="dropdown" aria-expanded="false">
                 <i className="fas fa-user primary-text p-1" ></i> 
                 <span className="primary-text">{user.username}</span>
                 </Link>
			<ul className="dropdown-menu dropdown-menu-end mt-2" aria-labelledby="navbarDropdownMenuLink">

					<li><Link className="dropdown-item primary-text" to="/">Cửa Hàng</Link></li>
					<li><Link className="dropdown-item primary-text" to="/login" onClick={() =>handleLogOut()}>Đăng Xuất</Link></li>
	
			</ul>
 
			
		</li>

	</ul>
            </div>
          

</nav>
     );
}
 
export default Header;