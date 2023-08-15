import React, { useState } from 'react';
const DeleteComfirm = ({show, id , handleClose, handleRemove, confirmContent}) => {
   const onRemove = () =>{
    handleRemove(id);
    handleClose();
   }
    return ( 

    <div
        className={`modal bg-none shadow-5 fade${show ? " show fullscreen-overlay" : ""}`}
        id="orderDetailsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="orderDetailsModalLabel"
         style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content">
              <div
                className="modal-body p-4 primary-text fw-bold">
              {confirmContent}
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-danger"
                  onClick={onRemove}
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
 
export default DeleteComfirm;