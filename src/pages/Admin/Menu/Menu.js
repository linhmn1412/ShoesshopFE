import { MDBIcon } from "mdb-react-ui-kit";
import MenuItem from "./MenuItem";
import { Link } from "react-router-dom";
import { logout } from "../../../services/AuthSlice";
import { useDispatch, useSelector } from "react-redux";


const Menu = () => {
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user.user);
  return (
    <div
      className=" primary-background text-white position-absolute top-0 left-0 bottom-0 "
      style={{
        height: "100vh",
        width: "100%",
        paddingTop: "80px",
        zIndex: "100",
      }}
    >
      <div className="text-center text-uppercase border-bottom border-1 py-3">
        Chức năng
      </div>
      <ul className="navbar-nav p-2 ">
        <MenuItem
          id="1"
          link={"/admin/home"}
          icon={"fas fa-home"}
          text={"Trang chủ"}
        />
        <MenuItem
          id="2"
          link={"/admin/confirm-orders"}
          icon={"fas fa-cart-arrow-down"}
          text={"Xét duyệt Đơn hàng"}
        />
        <MenuItem
          id="3"
          link={"/admin/categories"}
          icon={"fas fa-list"}
          text={"Quản lý Danh mục giày"}
        />
        <MenuItem
          id="4"
          link={"/admin/brands"}
          icon={"fas fa-trademark"}
          text={"Quản lý Thương hiệu"}
        />
        <MenuItem
          id="5"
          link={"/admin/shoes"}
          icon={"fas fa-shoe-prints"}
          text={"Quản lý Giày Dép"}
        />
        <MenuItem
          id="6"
          link={"/admin/shoevariants"}
          icon={"fas fa-palette"}
          text={"Quản lý Size và Màu"}
        />
        <MenuItem
          id="7"
          link={"/admin/discounts"}
          icon={"fas fa-hand-holding-usd"}
          text={"Quản lý Khuyến mãi"}
        />
         <MenuItem
          id="8"
          link={"/admin/orders"}
          icon={"fas fa-clipboard-list"}
          text={"Quản lý Đơn hàng"}
        />
        {user.id_role === 1 ? (
          <>
            <MenuItem
           id="9"
           link={"/admin/accounts"}
           icon={"fas fa-user"}
           text={"Quản lý Nhân viên"}
         />
         <MenuItem
           id="10"
           link={"/admin/statistics"}
           icon={"far fa-bookmark"}
           text={"Thống kê"}/>
           </>
        ) : (<></>)}
       
      </ul>
      <div className="text-center border-top border-1    position-absolute bottom-0 w-100">
        <Link to="/login" className=" menu-item nav-link  py-3  text-white fw-bold" onClick={() => dispatch(logout())}>
          <MDBIcon fas icon="sign-out-alt" />
          &ensp;
          <span>Đăng Xuất</span>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
