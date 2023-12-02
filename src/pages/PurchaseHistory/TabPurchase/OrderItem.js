import { MDBIcon } from "mdb-react-ui-kit";
import OrderDetail from "./OrderDetail";
import { formatMoney } from "../../../utils/formatMoney";
import { useEffect, useState } from "react";
import CreatedReviewsModal from "../Modal/CreatedReviewsModal";
import ReviewsModal from "../Modal/ReviewsModal";
import DeleteComfirm from "../../../components/DeleteConfirm/DeleteConfirm";

const OrderItem = ({ order, onCancelOrder, onReceiveOrder }) => {
  const [orderData, setOrderData] = useState(order);
  const [showCreatedReviewModal, setShowCreatedReviewModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isCheckReview, setIsCheckReview] = useState(false);
  const [showModalCancel, setShowModalCancel] = useState(false);
  const [idOrderCancel, setIdOrderCancel] = useState(null);
  const [confirm, setConfirm] = useState("");

  const handleShowModalCancel = (id) => {
    setShowModalCancel(true);
    setIdOrderCancel(id);
    setConfirm(`Bạn có chắc muốn hủy đơn hàng này không?`);
  };

  const handleCreatedReview = () => {
    setShowCreatedReviewModal(true);
  };
  const handleReview = () => {
    // console.log(orderData);
    setShowReviewModal(true);
  };
  const handleReviewSubmit = (newReview) => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      reviews: [...prevOrderData.reviews, ...newReview],
    }));
  };
  useEffect(() => {
    setIsCheckReview(order.reviews.length > 0 ? true : false);
  }, [order.reviews]);
  useEffect(() => {
    setOrderData(order);
  }, [order.status]);

  return (
    <div className="card mb-3">
      <div className="container">
        <div className="card-header">
          <span
            className={`card-title fw-bold text-uppercase px-2 ${
              orderData.status === "Đã hủy" ? "text-danger" : "primary-text"
            } ?`}
          >
            {orderData.status}
          </span>
        </div>
        <div className="card-body">
          {orderData.order_details &&
            orderData.order_details.map((val, index) => (
              <div key={index}>
                <OrderDetail item={val} />
              </div>
            ))}
          <div className="mt-2  mb-4 float-end ">
            <div className="p-3 ">
              <MDBIcon fas icon="file-invoice-dollar" />
              <span>
                &ensp;Thành tiền:{" "}
                <span className="fs-5 text-danger fw-bold mx-2">
                  {" "}
                  {formatMoney(order.total)}
                </span>
              </span>
            </div>
            <div className="float-end">
              {orderData.status === "Đã thanh toán" && (
                <button className="btn btn-success mx-2" disabled>
                  Đã Thanh Toán
                </button>
              )}
              {orderData.status === "Chờ xác nhận" && (
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => handleShowModalCancel(order.id_order)}
                >
                  Hủy đơn
                </button>
              )}
              {orderData.status === "Hoàn thành" && !isCheckReview && (
                <button
                  className="btn btn-warning mx-2"
                  onClick={handleCreatedReview}
                >
                  Đánh Giá
                </button>
              )}
              {orderData.status === "Hoàn thành" && isCheckReview && (
                <button className="btn btn-success mx-2" onClick={handleReview}>
                  Xem Đánh Giá
                </button>
              )}
              {orderData.status === "Đã xác nhận" && (
                <button
                  className="btn btn-success primary-background mx-2"
                  onClick={() => onReceiveOrder(order.id_order)}
                >
                  Đã nhận được hàng
                </button>
              )}

              <button className="btn btn-light ">Mua lại</button>
            </div>
            {showCreatedReviewModal && (
              <CreatedReviewsModal
                show={showCreatedReviewModal}
                onCheckReview={(check) => setIsCheckReview(check)}
                onReviewSubmit={(newReview) => handleReviewSubmit(newReview)}
                handleClose={() => setShowCreatedReviewModal(false)}
                orderDetails={orderData.order_details}
              />
            )}
            {showReviewModal && (
              <ReviewsModal
                show={showReviewModal}
                handleClose={() => setShowReviewModal(false)}
                order={orderData}
              />
            )}
            {showModalCancel && (
              <DeleteComfirm
                confirmContent={confirm}
                id={idOrderCancel}
                show={showModalCancel}
                handleClose={() => setShowModalCancel(false)}
                handleRemove={onCancelOrder}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
