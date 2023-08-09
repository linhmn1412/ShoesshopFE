import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Shop from "../pages/Shop/Shop";
import "../assets/css/style.css";
import Sale from "../pages/Sale/Sale";
import Product from "../pages/Product/Product";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import AdminLayout from "../pages/Admin/AdminLayout";
import { useSelector } from "react-redux";
import Cart from "../pages/Cart/Cart";
import Checkout from "../pages/Checkout/Checkout";
import Admin from "../pages/Admin/Admin";
import Categories from "../pages/Admin/Categories/Categories";
import Brands from "../pages/Admin/Brands/Brands";
import Shoes from "../pages/Admin/Shoes/Shoes";
import Discounts from "../pages/Admin/Discounts/Discounts";
import Accounts from "../pages/Admin/Account";
import Statistics from "../pages/Admin/Statistics";
import OrdersPending from "../pages/Admin/OrdersPending/OrdersPending";
import Orders from "../pages/Admin/Orders/Order";
import Account from "../pages/Account/Account";
import PurchaseHistory from "../pages/PurchaseHistory/PurchaseHistory";

const RoutesConfig = () => {
  const user = useSelector((state) => state.user.user);
  const ProtectedAdminRoute = ({ children }) => {
    if (localStorage.getItem("token")) {
      if (user) {
        if (user.id_role === 1 || user.id_role === 2) {
          return <AdminLayout>{children}</AdminLayout>;
        } else {
          return <Navigate to="/" />;
        }
      }
    } else {
      return <Navigate to="/login" />;
    }
  };

  const ProtectedCartRoute = () => {
    if (localStorage.getItem("token")) {
      if (user) {
        return <Cart />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  };
  const ProtectedCheckoutRoute = () => {
    if (localStorage.getItem("token")) {
      if (user) {
        return <Checkout />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  };
  const ProtectedAccountRoute = () => {
    if (localStorage.getItem("token")) {
      if (user) {
        return <Account />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  };

  const ProtectedPurchaseRoute = () => {
    if (localStorage.getItem("token")) {
      if (user) {
        return <PurchaseHistory />;
      }
    } else {
      return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="admin"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/home"
          element={
            <ProtectedAdminRoute>
              <Admin />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/categories"
          element={
            <ProtectedAdminRoute>
              <Categories />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/brands"
          element={
            <ProtectedAdminRoute>
              <Brands />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/confirm-orders"
          element={
            <ProtectedAdminRoute>
              <OrdersPending />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/shoes"
          element={
            <ProtectedAdminRoute>
              <Shoes />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/shoevariants"
          element={<ProtectedAdminRoute></ProtectedAdminRoute>}
        />
        <Route
          path="admin/discounts"
          element={
            <ProtectedAdminRoute>
              <Discounts />
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="admin/orders"
          element={
            <ProtectedAdminRoute>
              <Orders />
            </ProtectedAdminRoute>
          }
        />
        {user && user.id_role === 1 ? (
          <>
            <Route
              path="admin/accounts"
              element={
                <ProtectedAdminRoute>
                  <Accounts />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="admin/statistics"
              element={
                <ProtectedAdminRoute>
                  <Statistics />
                </ProtectedAdminRoute>
              }
            />
          </>
        ) : (
          <></>
        )}

        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:bestSellers" element={<Shop />} />
        <Route path="/shop/:newArrivals" element={<Shop />} />
        <Route path="/shop/category/:category" element={<Shop />} />
        <Route path="/shop/brand/:brand" element={<Shop />} />
        <Route path="/shop/price/:price" element={<Shop />} />
        <Route path="/sale/:sale" element={<Sale />} />

        <Route index path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<ProtectedCartRoute />} />
        <Route path="/checkout" element={<ProtectedCheckoutRoute />} />
        <Route path="/account" element={<ProtectedAccountRoute />} />
        <Route path="/purchase" element={<ProtectedPurchaseRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RoutesConfig;
