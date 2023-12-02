import { MDBIcon } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";

const ForgotPassword = ({ error, show, handleForgotPassword, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    handleForgotPassword(data);
  };
  return (
    <div
      className={`modal  bg-none shadow-5 fade${
        show ? " show fullscreen-overlay" : ""
      }`}
      id="orderDetailsModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="orderDetailsModalLabel"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable " role="document">
        <div className="modal-content custom-modal">
          <div className="modal-header primary-background text-white w-100">
            <h5
              className="modal-title text-uppercase"
              id="orderDetailsModalLabel"
            >
              <MDBIcon fas icon="key" />
              &ensp;Quên mật khẩu
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group my-4 ">
                <label>Nhập email:</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("email", {
                    required: "Vui lòng nhập email.",
                  })}
                />
              </div>
            </form>
          </div>

          <div className="modal-footer w-100">
            <button
              type="submit"
              className="btn  btn-success primary-background"
              onClick={handleSubmit(onSubmit)}
            >
              Gửi
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
};

export default ForgotPassword;
