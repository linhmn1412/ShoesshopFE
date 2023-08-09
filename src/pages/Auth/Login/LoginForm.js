import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../../services/AuthSlice";
import { CartContext } from "../../../contexts/CartContext";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const successLogin = useSelector((state) => state.user.successLogin);
  const loading = useSelector((state) => state.user.loading);
  const {resetCart} = useContext(CartContext);
  const onSubmit = (data) => {
    dispatch(login(data))
    .then((response) => {
      if (response.payload) {
        
      }
    });
    if (data.usernameOrEmailOrPhone) {
      const loginData = {
        username: '',
        email: '',
        phone: ''
      };

      // Check login by username or email or phone 
      if (data.usernameOrEmailOrPhone.includes('@')) {
        loginData.email = data.usernameOrEmailOrPhone;
      } else if (!isNaN(data.usernameOrEmailOrPhone)) {
        loginData.phone = data.usernameOrEmailOrPhone;
      } else {
        loginData.username = data.usernameOrEmailOrPhone;
      }
    
    }
  };
  useEffect(() => {
    if (!loading && successLogin) {
      if(user){
        if ( user.id_role === 1 || user.id_role === 2) {
          navigate("/admin", { replace: true });
        } else {
         navigate("/", { replace: true });
        }
      }
      
    }
  }, [successLogin,user]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <input type="text" id="form2Example1" className="form-control" {...register("usernameOrEmailOrPhone", { required: true })} placeholder="Tên đăng nhập, Email hoặc Số điện thoại" />
        {errors.usernameOrEmailOrPhone && <span className="text-danger" style={{fontSize:'12px'}}>Bạn phải nhập Tên đăng nhập, Email hoặc Số điện thoại</span>}
      </div>

      <div className="mb-4">
        <div className="input-group position-relative ">
          <input type={showPassword ? "text" : "password"} id="form2Example2" className="form-control" {...register("password", { required: true })} placeholder="Mật khẩu" />
        </div>
        {errors.password && <span className="text-danger" style={{fontSize:'12px'}}>Bạn phải nhập mật khẩu</span>}
      </div>

      <div className="d-flex justify-content-end mb-4">
        <Link to="#">Quên mật khẩu?</Link>
      </div>

      <button type="submit" className="btn btn-success btn-block mb-4">Đăng nhập</button>

      <div className="text-center">
        <p>Chưa có tài khoản? <Link to="/register">Đăng ký</Link></p>
        <p>Hoặc đăng nhập với:</p>
        <button type="button" className="btn btn-secondary btn-floating mx-1">
          <i className="fab fa-facebook-f"></i>
        </button>

        <button type="button" className="btn btn-secondary btn-floating mx-1">
          <i className="fab fa-google"></i>
        </button>

        <button type="button" className="btn btn-secondary btn-floating mx-1">
          <i className="fab fa-twitter"></i>
        </button>

        <button type="button" className="btn btn-secondary btn-floating mx-1">
          <i className="fab fa-github"></i>
        </button>
      </div>
    </form>
);
};

export default LoginForm;
