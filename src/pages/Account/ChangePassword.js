import { MDBIcon } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";

const ChangePassword = ({error , show, handleChangePassword, handleClose}) => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();
    const onSubmit = (data) =>{
        clearErrors();
        if (data.new_password !== data.confirm_password) {
            setError("confirm_password", {
                type: "manual",
                message: "Mật khẩu xác nhận không hợp lệ",
            });
        } else {
            handleChangePassword(data);
        }
        
    }
    return (  
        <div
      className={`modal bg-none shadow-5 fade${
        show ? " show fullscreen-overlay" : ""
      }`}
      id="orderDetailsModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="orderDetailsModalLabel"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content custom-modal">
          <div className="modal-header primary-background text-white w-100">
            <h5
              className="modal-title text-uppercase"
              id="orderDetailsModalLabel"
            >
             <MDBIcon fas icon="key" />
              &ensp;Đổi mật khẩu
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body p-4 primary-text fw-bold w-100">

          <form onSubmit = {handleSubmit(onSubmit)} className="primary-text fw-bold">
          <div className="form-group my-4 ">
                <label>Mật khẩu hiện tại:</label>
                <input className={`form-control  ${errors.current_password ? "is-invalid" : ""}`} type="password"  autoComplete="new-password"
                {...register("current_password", {
                    required : "Mật khẩu không được để trống",
                    minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 kí tự",
                    },
                })}/>
                {errors.current_password && (
              <div className="invalid-feedback">{errors.current_password.message}</div>)}
            </div>
          <div className="form-group my-4 ">
          <label>Mật khẩu mới:</label>
                <input className={`form-control  ${errors.new_password ? "is-invalid" : ""}`} type="password"  autoComplete="new-password"
                {...register("new_password", {
                    required : "Mật khẩu không được để trống",
                    minLength: {
                        value: 6,
                        message: "Mật khẩu phải có ít nhất 6 kí tự",
                    },
                })}/>
                {errors.new_password && (
              <div className="invalid-feedback">{errors.new_password.message}</div>)}
            </div>

    


            <div className=" form-group my-4 "> 
            <label>Mật khẩu xác nhận:</label>
                <input  className={`form-control  ${errors.confirm_password ? "is-invalid" : ""}`} type="password" autoComplete="new-password"
                {...register("confirm_password", {required : "Mật khẩu xác nhận không được để trống"})}/>
                {errors.confirm_password && (
              <div className="invalid-feedback">{errors.confirm_password.message}</div>)}
            </div>
          </form>
                  
            </div>
          
          <div className="modal-footer w-100">
 
              <button
                type="submit"
                className="btn  btn-success primary-background"
                onClick={handleSubmit(onSubmit)}
              >
                Xác nhận
              </button>

            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>
          </div>
        </div>
      </div>

    );
}
 
export default ChangePassword;