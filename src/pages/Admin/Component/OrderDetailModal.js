import { toast } from "react-toastify";
import { confirmOrder } from "../../../services/orderService";
import { formatMoney } from "../../../utils/formatMoney";
import { useState } from "react";
import { formatTime } from "../../../utils/formatTime";

const OrderDetailModal = ({ selectedId, selectedOrder, showModal, handleClose, checkConfirm }) => {
  const [confirm , setConfirm] = useState(false);

    const handleConfirmOrder = () => {
      confirmOrder(selectedId)
      .then((data)=>{
        toast.success(data.message);
        setConfirm(true);
        if(confirm){
        handleClose(confirm);
        }
      })
      .catch((error)=>{
        console.log(error);
      })

    };
  return (
    <div
      className={`modal shadow-5 fade${showModal ? " show fullscreen-overlay" : ""}`}
      id="orderDetailsModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="orderDetailsModalLabel"
      dialogClassName="no-scroll-modal"
      style={{ display: showModal ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content h-100">
          <div className="modal-header primary-background text-white">
            <h5
              className="modal-title text-uppercase"
              id="orderDetailsModalLabel"
            >
              Chi tiết đơn hàng
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body p-2">
          <div>Mã đơn hàng:&ensp;<span className="primary-text fw-bold">{selectedOrder.id_order}</span></div>
            <div>Khách hàng:&ensp;<span className="primary-text fw-bold">{selectedOrder.name_buyer}</span></div>
            <div>Số điện thoại:&ensp;<span className="primary-text fw-bold">{selectedOrder.phone_number}</span></div>
            <div>Địa chỉ:&ensp;<span className="primary-text fw-bold">{selectedOrder.address}</span></div>
            <div>Ngày đặt hàng:&ensp;<span className="primary-text fw-bold">{formatTime(selectedOrder.created_at)}</span> </div>
            <div>Ghi chú:&ensp;<span className="primary-text fw-bold"> {selectedOrder.note}</span></div>
            <div>Tổng tiền:&ensp;<span className="primary-text fw-bold">{formatMoney(selectedOrder.total)}</span></div>
            <div>Trạng thái:&ensp;<span className="primary-text fw-bold"> {selectedOrder.status}</span></div>
            {selectedOrder.fullname ? (
            <div>Nhân viên xác nhận:&ensp;<span className="primary-text fw-bold"> {selectedOrder.fullname}</span></div>
            ) : (<></>)}
            <div>Chi tiết đơn đặt hàng: </div>
            <table
              className="table align-middle text-center"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr  className=" w-100">
                  <th scope="col" width="25%">
                    Mã sản phẩm
                  </th>
                  <th scope="col" width="25%">
                    Đơn giá
                  </th>
                  <th scope="col" width="25%">
                    Số lượng
                  </th>
                  <th scope="col" width="25%">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.order_details &&
                  selectedOrder.order_details.map((val) => (
                    <tr key={val.id_variant}>
                      <td>{val.id_variant}</td>
                      <td>{formatMoney(val.cur_price)}</td>
                      <td>{val.quantity}</td>
                      <td>{formatMoney(val.cur_price * val.quantity)}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            {checkConfirm ? (
               <button
               type="button"
               className="btn btn-success primary-background text-white"
               onClick={handleConfirmOrder}
             >
               Xác nhận đơn
             </button>
            ) : (<></>)}
         
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
};

export default OrderDetailModal;
