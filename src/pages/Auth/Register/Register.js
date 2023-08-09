import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";
import imageRegister from "../../../assets/images/register.jpg";
import AuthImage from "../AuthImage";
const Register = () => {
    return ( <section className="vh-100" style={{ backgroundColor: "#eee" }}>
    <div className="container h-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="card">
          <div className="card-body p-3">
            <div className="row justify-content-center align-items-center ">
              <div className="col-7 d-flex justify-content-center align-items-center order-1 order-lg-1">
                <AuthImage img={imageRegister}/>
              </div>
              <div className="col-4 p-2 order-2 order-lg-2">
        <p className="text-center primary-text h1 fw-bold mb-3 mx-1 mx-md-4 mt-4">Đăng ký</p>
        <RegisterForm />
      
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section> );
}
 
export default Register;