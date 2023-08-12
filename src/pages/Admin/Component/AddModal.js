import { MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";

const AddModal = ({ show, handleClose, handleSubmit, title }) => {
  const [inputValue, setInputValue] = useState("");
  const [inputName, setInputName] = useState("");

  const handleInputNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(inputValue);
    handleClose();
  };

  return (
    <div
      className={`modal shadow-5 fade${show ? " show" : ""}`}
      id="orderDetailsModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="orderDetailsModalLabel"
      dialogClassName="no-scroll-modal"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content h-100">
          <div className="modal-header primary-background text-white">
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
          <form onSubmit={handleFormSubmit} className="">
            <div
              className="modal-body p-2 "
              style={{
                marginTop: `${title}` === "khuyến mãi" && "180px" || `${title}` === "nhân viên" && "40px" || "230px",
                marginBottom: `${title}` === "khuyến mãi" && "180px" || `${title}` === "nhân viên" &&"40px" || "230px"
              }}
            >
              <div className="form-group mx-5 px-2">
                <label htmlFor="inputValue" className="mb-2 primary-text">
                  Nhập tên {title}:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputValue"
                  value={inputName}
                  onChange={handleInputNameChange}
                  required
                />
              </div>
              {title === "khuyến mãi" && (
                <div className="form-group mx-5 px-2 mt-4">
                  <label htmlFor="inputValue" className="mb-2 primary-text">
                    Nhập giá trị {title}:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputValue"
                    value={inputValue}
                    onChange={handleInputValueChange}
                    required
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
                  />
                </div>
                <div className="form-group mx-5 px-2 mt-4">
                <label className="mb-2 primary-text">
                  Nhập email:
                </label>
                <input
                  type="text"
                  className="form-control"
                 
                />
              </div>
              <div className="form-group mx-5 px-2 mt-4">
                <label className="mb-2 primary-text">
                  Nhập tên đăng nhập:
                </label>
                <input
                  type="text"
                  className="form-control"
                 
                />
              </div>
              <div className="form-group mx-5 px-2 mt-4">
                <label className="mb-2 primary-text">
                  Nhập mật khẩu:
                </label>
                <input
                  type="password"
                  className="form-control"
            
                  
                />
              </div></>
                
                
              )}
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-success primary-background text-white"
              >
                Lưu
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Đóng
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddModal;
