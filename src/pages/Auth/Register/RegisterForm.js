import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerAccount } from "../../../services/AuthSlice";
import { useEffect } from "react";

const RegisterForm = () => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.user);
    const navigate = useNavigate();
    const {
        register ,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState : {errors}
    } = useForm();
    useEffect(() => {
        if (auth.successRegister) {
            reset();
            toast.success("Đăng ký tài khoản thành công");
        } else if (auth.notiErrors) {
            Object.keys(auth.notiErrors).forEach(fieldName => {
                setError(fieldName, {
                    type: 'manual',
                    message: auth.notiErrors[fieldName][0] // get noti from api
                });
            });
        }
    }, [auth, navigate]);
    const onSubmit = (data)=>{
        clearErrors();
        if (data.password !== data.passwordConfirm) {
            setError("passwordConfirm", {
                type: "manual",
                message: "Mật khẩu xác nhận không hợp lệ",
            });
        } else {
           dispatch(registerAccount(data));
        }
    }
    
    return ( 
        <form onSubmit={handleSubmit(onSubmit)} className="fw-bold">
            <div className=" form-group my-4">
                <input type="text"  autoFocus placeholder="Họ tên" 
                className={`form-control  ${errors.fullname ? "is-invalid" : ""}`}
                 {...register("fullname", {required :"Vui lòng nhập đầy đủ họ tên"})}/>
                {errors.fullname && (
            <div className="invalid-feedback">*{errors.fullname.message}</div>
            )}
            </div>
   


            <div className=" form-group my-4 ">
                <input className={`form-control  ${errors.email ? "is-invalid" : ""}`} type="email" placeholder="Email"
                {...register('email', {
                    required: "Vui lòng nhập email.", 
                    pattern: {
                    value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Vui lòng nhập email hợp lệ.",
                  },})} />
                {errors.email && (
              <div className="invalid-feedback">{errors.email.message}</div>)}
            </div>



            <div className=" form-group my-4 ">
                <input type="text" placeholder="Số điện thoại" className={`form-control  ${errors.phone_number ? "is-invalid" : ""}`} {...register ("phone_number",  {
              required: {
                value: "Số điện thoại không được bỏ trống!",
              },
              pattern: {
                value: /((09|03|07|08|05)+([0-9]{8})\b)/,
                message: "Vui lòng nhập số di động hợp lệ.",
              },
            })} />
             {errors.phone_number && (
              <div className="invalid-feedback">{errors.phone_number.message}</div>
            )}
            </div>


            <div className=" form-group my-4 ">
                <input type="text" placeholder="Tên đăng nhập" autoComplete="username"
                className={`form-control  ${errors.username ? "is-invalid" : ""}`} {...register("username", {
                    required : "Vui lòng nhập tên đăng nhập"
                })}/>
                 {errors.username && (
              <div className="invalid-feedback">{errors.username.message}</div>)}
            </div>

    


            <div className="form-group my-4 ">
                <input className={`form-control  ${errors.password ? "is-invalid" : ""}`} type="password" 
                placeholder="Mật khẩu" autoComplete="new-password"
                {...register("password", {
                    required : "Mật khẩu không được để trống",
                    minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 kí tự",
                    },
                })}/>
                {errors.password && (
              <div className="invalid-feedback">{errors.password.message}</div>)}
            </div>

    


            <div className=" form-group my-4 "> 
                <input  className={`form-control  ${errors.passwordConfirm ? "is-invalid" : ""}`} type="password"
                 placeholder="Mật khẩu xác nhận" autoComplete="new-password"
                {...register("passwordConfirm", {required : "Mật khẩu xác nhận không được để trống"})}/>
                {errors.passwordConfirm && (
              <div className="invalid-feedback">{errors.passwordConfirm.message}</div>)}
            </div>
   
        

        <div className="d-flex justify-content-center  my-4 ">
            <button type="submit" className="btn btn-success primary-background btn-block">Đăng ký</button>
        </div>
        <div className="text-center">
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </div>
        
    </form>
        
     );
}
 
export default RegisterForm;