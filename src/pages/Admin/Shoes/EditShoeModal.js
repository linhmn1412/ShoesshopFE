import { MDBIcon } from "mdb-react-ui-kit";
import EditShoeForm from "./EditShoeForm";

const EditShoeModal = ({showModal,handleClose, ...rest}) => {
    return ( 
            <div
            className={`modal shadow-5 fade${showModal ? " show" : ""}`}
            id="orderDetailsModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="orderDetailsModalLabel"
            dialogClassName="no-scroll-modal"
            style={{ display: showModal ? "block" : "none" }}
          >
            <div className="modal-dialog modal-dialog-scrollable set-width-960 "  role="document">
              <div className="modal-content h-100" >
                <div className="modal-header primary-background text-white">
                  <h5
                    className="modal-title text-uppercase"
                    id="orderDetailsModalLabel"
                  >
                     <MDBIcon fas icon="edit" /> &ensp;
                    Chỉnh sửa sản phẩm
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={handleClose}
                  ></button>
                </div>
                <div className="modal-body h-100">
              <EditShoeForm handleClose= {handleClose} {...rest}/>
                </div>
              </div>
            </div>
          </div>
         );

}
 
export default EditShoeModal;