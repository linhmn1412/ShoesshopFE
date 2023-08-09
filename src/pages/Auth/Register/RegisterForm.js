import { Link } from "react-router-dom";

const RegisterForm = () => {
    return ( 
        <form method="POST" action="">
        <div className="d-flex flex-row align-items-center mt-4">
            <div className=" flex-fill mb-0">
                <input type="text" id="fullname" name="fullname" required autofocus placeholder="fullname" className="form-control" />
            </div>
        </div>

        <div className="d-flex flex-row align-items-center mt-4">
            <div className=" flex-fill mb-0">
                <input className="form-control" id="email" type="email" name="email" required placeholder="Email" />
            </div>
        </div>

        <div className="d-flex flex-row align-items-center mt-4">
            <div className="flex-fill mb-0">
                <input type="text" id="phone_number" name="phone_number" required autofocus placeholder="Số điện thoại" className="form-control" />
            </div>
        </div>
        <div className="d-flex flex-row align-items-center mt-4">
            <div className=" flex-fill mb-0">
                <input type="text" id="username" name="username" required autofocus placeholder="Tên đăng nhập" className="form-control" />
            </div>
        </div>
    

        <div className="d-flex flex-row align-items-center mt-4">
            <div className="flex-fill mb-0">
                <input className="form-control" id="password" type="password" name="password" required placeholder="Mật khẩu" />
            </div>
        </div>
    

        <div className="d-flex flex-row align-items-center mt-4">
            <div className=" flex-fill mb-0"> 
                <input id="password_confirmation" className="form-control" type="password" name="password_confirmation" required placeholder="Mật khẩu xác nhận" />
            </div>
        </div>
        

        <div className="d-flex justify-content-center mx mt-3 mb-lg-4">
            <button type="submit" className="btn btn-success btn-lg btn-block">Đăng ký</button>
        </div>
        <div className="text-center">
            <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
        </div>
        
    </form>
        
     );
}
 
export default RegisterForm;