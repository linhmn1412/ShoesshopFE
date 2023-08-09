import { MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";

const EditModal = ({ show, handleClose, handleEdit, data, title }) => {
  const [inputValue, setInputValue] = useState(data.discount_value ? data.discount_value : null);
  const [inputName, setInputName] = useState(data.name_category || data.name_brand || data.name_discount || "");

  const handleInputNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleEdit(inputName);
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
              <MDBIcon fas icon="edit" /> &ensp;
              Cập nhật {title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <form onSubmit={handleFormSubmit} className="h-100">
            <div className="modal-body p-2 mx-5 " style={{ marginTop: `${title}` === "khuyến mãi" ? "160px" : "200px", marginBottom: `${title}` === "khuyến mãi" ? "160px" : "200px" }}>
              <p className="primary-text fw-bold mb-1">Mã {title}: {data.id_category || data.id_brand || data.id_discount}</p>
              <p className="text-muted" style={{fontSize:"12px"}}>Nhân viên cập nhật gần nhất:&ensp;<span className="primary-text fw-bold">{data.name_staff}</span> </p>
              <div className="form-group  px-2">
                <label htmlFor="inputValue" className="mb-2 primary-text">Tên {title}:</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputValue"
                  value={inputName}
                  onChange={handleInputNameChange}
                  required
                />
              </div>
              {title === "khuyến mãi" && <div className="form-group  px-2 mt-4">
                <label htmlFor="inputValue" className="mb-2 primary-text">Giá trị {title}:</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputValue"
                  value={inputValue}
                  onChange={handleInputValueChange}
                  required
                />
              </div>}
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
}

export default EditModal;
