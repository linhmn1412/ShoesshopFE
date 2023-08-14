import { useSelector } from "react-redux";
import { BASE_URL } from "../../../services";
import ReviewItem from "../../Product/Reviews/ReviewItem";

const ReviewsModal = ({ show, handleClose, order }) => {
    const user = useSelector((state)=>state.user.user);
    const handleCloseModal = () => {
    handleClose();
  };
  const renderOrderDetailsWithReviews = () => {
    return order.order_details.map((orderDetail) => {
      const review = order.reviews.find(
        (review) =>
          review.id_variant === orderDetail.id_variant &&
          review.id_order === orderDetail.id_order
      );
      return (
        <div key={orderDetail.id_variant}>
             <div className="row mb-2">
                      <div className="col-2"> <img
              src={`${BASE_URL}/product/${orderDetail.shoe_variant.id_shoe}/image`}
              alt=""
              className="w-100"
            /></div>
                      <div className="col-10 primary-text fw-bold">{orderDetail.shoe_variant.shoe.name_shoe}</div>
                    </div>
          <div>
            {review && (
              <ReviewItem val ={review} username= {user?user.username:''} color={orderDetail.shoe_variant.color} size={orderDetail.shoe_variant.size}/>
            )}
          </div>
        </div>
      );
    });
  };
    return (  
        <div
        className={`modal shadow-5 fade${show ? " show" : ""}`}
        id="orderDetailsModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="orderDetailsModalLabel"
        style={{ display: show ? "block" : "none" }}
      >
        <div className="modal-dialog modal-dialog-scrollable" role="document">
          <div className="modal-content h-100" >
            <div className="modal-header primary-background text-white">
              <h5
                className="modal-title text-uppercase"
                id="orderDetailsModalLabel"
              >
                Đánh giá sản phẩm
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body px-4 py-2">

              {renderOrderDetailsWithReviews()}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    );
}
 
export default ReviewsModal;