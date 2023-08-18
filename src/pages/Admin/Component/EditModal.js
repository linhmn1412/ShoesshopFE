import { MDBIcon } from "mdb-react-ui-kit";
import { useState } from "react";
import { useForm } from "react-hook-form";

const EditModal = ({ show, handleClose, handleEdit, data, title }) => {
  const [inputValue, setInputValue] = useState(data.discount_value ? data.discount_value : null);
  const [inputName, setInputName] = useState(data.name_category || data.name_brand || data.name_discount || data.fullname || "");
  const [salary, setSalary] = useState(data.salary ? data.salary : null);
  const [status, setStatus] = useState(data.status ? data.status : null);
  const handleInputNameChange = (e) => {
    setInputName(e.target.value);
  };

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = () => {
    const value = {
      name : inputName,
      discount_value : inputValue,
      salary : salary,
      status : Number(status),
    }
    handleEdit(value, data.id_discount|| data.id_category|| data.id_brand || data.id_staff );
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
            <div className="modal-body p-2 m-5 w-100 " 
           >
             
              <p className="primary-text fw-bold mb-1">Mã {title}: {data.id_category || data.id_brand || data.id_discount || data.id_staff}</p>
              {title !== 'nhân viên' && (<>
              <p className="text-muted" style={{fontSize:"12px"}}>Nhân viên cập nhật gần nhất:&ensp;<span className="primary-text fw-bold">{data.name_staff}</span> </p></>)}
              <div className="form-group  px-2">
                <label htmlFor="inputValue" className="mb-2 primary-text">Tên {title}:</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputValue"
                  value={inputName}
                  onChange={(e) => setInputName(e.target.value)}
                />
              </div>
              {title === "khuyến mãi" && <div className="form-group  px-2 mt-4">
                <label htmlFor="inputValue" className="mb-2 primary-text">Giá trị {title}:</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputValue"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>}
              {title === "nhân viên" && (
                <>
                
                <div className="form-group  px-2 mt-4">
                <label className="mb-2 primary-text">
                  Lương:
                </label>
                <input
                  type="text"
                  className="form-control"
                  value= {salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>
              <div className="form-group px-2 mt-4">
                <label className="mb-2 primary-text">
                Trạng thái
                </label>
                <select
                  className={`form-control`}
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                <option key='0' value= '0'>
                      Đã nghỉ
                </option>
                <option key='1' value='1'>
                      Hoạt động
                </option>
      
                </select>
              </div>
              </>
                
                
              )}
            </div>
            <div className="modal-footer w-100">
              <button
                type="submit"
                className="btn btn-success primary-background text-white"
                onClick={ handleFormSubmit}
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

        </div>
      </div>
    </div>
  );
}

export default EditModal;
