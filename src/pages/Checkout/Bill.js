import { Link } from "react-router-dom";
import { formatTime } from "../../utils/formatTime";
import { formatMoney } from "../../utils/formatMoney";

const Bill = ({ order, show }) => {
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
          <div className="modal-content h-100">
            <div className="modal-header primary-background text-white">
              <h5
                className="modal-title text-uppercase"
                id="orderDetailsModalLabel"
              >
                Đặt hàng hoàn tất
              </h5>
            </div>
            <div className="modal-body">
            <p>Mã đơn hàng:&ensp;<span className="primary-text fw-bold">{order.id_order}</span></p>
            <p>Khách hàng:&ensp;<span className="primary-text fw-bold">{order.name_buyer}</span></p>
            <p>Số điện thoại:&ensp;<span className="primary-text fw-bold">{order.phone_number}</span></p>
            <p>Địa chỉ:&ensp;<span className="primary-text fw-bold">{order.address}</span></p>
            <p>Ngày đặt hàng:&ensp;<span className="primary-text fw-bold">{formatTime(order.created_at)}</span> </p>
            <p>Ghi chú:&ensp;<span className="primary-text fw-bold"> {order.note}</span></p>
            <p>Tổng tiền:&ensp;<span className="primary-text fw-bold">{formatMoney(order.total+20000)}</span></p>
            <p>Chi tiết đơn đặt hàng: </p>
              <table
                className="table align-middle text-center"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr  className=" w-100">
                    <th scope="col" width="25%">
                      Tên sản phẩm
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
                  {order.orderItems &&
                    order.orderItems.map((val) => (
                      <tr key={val.id_variant}>
                        <td>{val.name_shoe}</td>
                        <td>{formatMoney(val.cur_price)}</td>
                        <td>{val.quantity}</td>
                        <td>{formatMoney(val.cur_price * val.quantity)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
            <Link
                to="/"
                className="btn btn-success primary-background text-white"
              >
                Trang chủ
              </Link>
              <Link
                to = "/cart"
                className="btn btn-secondary"
              >
                Giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      </div> );
}
 
export default Bill;