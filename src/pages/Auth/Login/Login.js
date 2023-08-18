import imageWelcome from "../../../assets/images/login.jpg";
import LoginForm from "./LoginForm";
import AuthImage from "../AuthImage";
const Login = () => {

  return (
    <section className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="card">
            <div className="card-body p-3">
              <div className="row justify-content-center align-items-center ">
                <div className="col-7 d-flex justify-content-center align-items-center order-1 order-lg-1">
                  <AuthImage img ={imageWelcome}/>
                </div>
                <div className="col-5 order-2 order-lg-2 p-5">
        <p className="text-center primary-text text h1 fw-bold mb-4 mx-1 mx-md-4 mt-4">Đăng nhập</p>
        <LoginForm />
                </div>

                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
