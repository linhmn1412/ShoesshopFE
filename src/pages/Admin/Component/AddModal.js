import { MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";
import { useForm } from "react-hook-form";

const AddModal = ({ show, handleClose, handleSubmit, title }) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    handleSubmit(data);
    reset();
    handleClose();
  };



  return (
    <div
      className={`modal shadow-5 fade${show ? " show fullscreen-overlay" : ""}`}
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
              className="modal-title text-uppercase px-2"
              id="orderDetailsModalLabel"
            >
              <MDBIcon fas icon="plus" /> &ensp; Tạo {title} mới
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
         
            <div
              className="modal-body p-2 w-100 mb-4"
            >
               <form onSubmit={handleFormSubmit(onSubmit)}>
              <div className="form-group mx-5 px-2">
                <label className="mb-2 primary-text">
                  Nhập tên {title}:
                </label>
                <input
                  type="text"
                  className="form-control"
                 {...register("name", {
                  required : true
                 })}
                  
                />
              </div>
              {title === "khuyến mãi" && (
                <div className="form-group mx-5 px-2 mt-4">
                  <label className="mb-2 primary-text">
                    Nhập giá trị {title}:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("discount_value", {
                      required : true
                     })}
                  />
                </div>
              )}
               {title === "nhân viên" && (
                <>
                <div className="form-group mx-5 px-2 mt-4">
                  <label className="mb-2 primary-text">
                    Nhập số điện thoại:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    {...register("phone_number", {
                      required : true
                     })}
                  />
                </div>
                <div className="form-group mx-5 px-2 mt-4">
                <label className="mb-2 primary-text">
                  Nhập email:
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("email", {
                    required : true
                   })}
                />
              </div>
              <div className="form-group mx-5 px-2 mt-4">
                <label className="mb-2 primary-text">
                  Nhập tên đăng nhập:
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("username", {
                    required : true
                   })}
                />
              </div>
              <div className="form-group mx-5 px-2 mt-4">
                <label className="mb-2 primary-text">
                  Nhập mật khẩu:
                </label>
                <input
                  type="password"
                  className="form-control"
                  {...register("password", {
                    required : true
                   })}
                  
                />
              </div></>
                
                
              )}
                </form>
            </div>
            <div className="modal-footer w-100">
              <button
                type="submit"
                className="btn btn-success primary-background text-white"
                onClick={handleFormSubmit(onSubmit)}
              >
                Lưu
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

export default AddModal;
