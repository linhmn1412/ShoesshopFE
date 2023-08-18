import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword, login } from "../../../services/AuthSlice";
import ForgotPassword from "./ForgotPassword";
import { toast } from "react-toastify";
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit,setError,clearErrors, formState: { errors }} = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const successLogin = useSelector((state) => state.user.successLogin);
  const errorLogin = useSelector((state) => state.user.errorLogin);
  const [showModalForgotPassword, setShowModalForgotPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const onSubmit = (data) => {
    clearErrors();
    dispatch(login(data))
  

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
    if ( successLogin) {
      if(user){
        if ( user.id_role === 1 || user.id_role === 2) {
          navigate("/admin", { replace: true });
        } else {
         navigate("/", { replace: true });
        }
      }
    }
    else{
      if(errorLogin){
        console.log("error",errorLogin),
        Object.keys(errorLogin).forEach(fieldName => {
          setError(fieldName, {
              type: 'manual',
              message: errorLogin[fieldName] // get noti from api
          });
      });
      }
    }
  }, [successLogin,user,errorLogin]);

  const handleForgotPassword = (data) => {
    //console.log(data);
    forgotPassword(data)
    .then((response)=>{
      if(response.status === 200){
        toast.success(response.data.message);
        setShowModalForgotPassword(false);
      }else {
        // setErrorEmail(response.data.message);
        toast.error("Email chưa được đăng ký.");
      }
    })
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group my-4">
        <input type="text" id="form2Example1" className={`form-control  ${errors.password ? "is-invalid" : ""}`}
         {...register("usernameOrEmailOrPhone", { required: "Tên đăng nhập, Email hoặc Số điện thoại không được để trống" })} placeholder="Tên đăng nhập, Email hoặc Số điện thoại" />
        {errors.usernameOrEmailOrPhone && <div className="text-danger fw-bold" style={{fontSize:'12px'}}>{errors.usernameOrEmailOrPhone.message}</div>}
      </div>


        <div className="form-group my-4">
          <input type= "password" id="form2Example2" autoComplete="current-password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          {...register("password", { 
            required: "Mật khẩu không được để trống",
            minLength: {
            value: 6,
            message: "Mật khẩu phải có ít nhất 6 kí tự",
        }, })} placeholder="Mật khẩu" />
{errors.password && <div className="text-danger fw-bold" style={{fontSize:'12px'}}>{errors.password.message}</div>}
        </div>
        


      <div className="d-flex justify-content-end mb-4">
        <Link to="#" onClick={ ()=> setShowModalForgotPassword(true)}>Quên mật khẩu?</Link>
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
    {showModalForgotPassword && (
      <ForgotPassword
        error = {errorEmail}
        show={showModalForgotPassword}
        handleClose={()=>setShowModalForgotPassword(false)}
        handleForgotPassword = {handleForgotPassword}
      />
    )}
    </>
  
);
};

export default LoginForm;
