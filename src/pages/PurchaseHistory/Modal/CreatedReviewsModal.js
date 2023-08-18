import { useState } from "react";
import Rating from "react-rating";
import { BASE_URL } from "../../../services";
import { createReviews } from "../../../services/reviewService";
import { toast } from "react-toastify";

const CreatedReviewsModal = ({ show,onCheckReview, handleClose, orderDetails, onReviewSubmit }) => {
  const [ratings, setRatings] = useState(orderDetails.map(() => 0));
  const [comments, setComments] = useState(orderDetails.map(() => ""));

  const handleRatingChange = (value,index) => {
    setRatings((prevRatings) => {
        const updatedRatings = [...prevRatings];
        updatedRatings[index] = value;
        return updatedRatings;
      });
  };

  const handleCommentChange = (e,index) => {
    const { value } = e.target;
    setComments((prevComments) => {
      const updatedComments = [...prevComments];
      updatedComments[index] = value;
      return updatedComments;
    });
  };

  const handleSubmit = () => {
    const reviewsData = orderDetails.map((val, index) => ({
      id_order: val.id_order, 
      id_variant: val.id_variant, 
      rated: ratings[index],
      comment: comments[index],
    }));
    //console.log("reviewsData",reviewsData);
    createReviews(reviewsData)
    .then((response) => {
        toast.success(response.message);
        onCheckReview(true);  
       // console.log(response);
        onReviewSubmit(response.reviews);
        handleClose();
      })
      .catch((error) => {
        console.error("Error creating reviews:", error);
      });
  };

  const handleCloseModal = () => {
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
          <div className="modal-body">
            {orderDetails &&
              orderDetails.map((val,index) => (
                <div key={index} className=" p-2 border-bottom border-1 mt-2 ">
                  <div className="row mb-3">
                    <div className="col-2"><img src={`${BASE_URL}/product/${val.shoe_variant.id_shoe}/image`} alt="" className="w-100" /></div>
                    <div className="col-10 primary-text fw-bold">{val.shoe_variant.shoe.name_shoe}</div>
                  </div>
                  <span className="text-muted">Chất lượng sản phẩm:&ensp;</span>
                  <Rating
                    initialRating={ratings[index]}
                    onChange={(value) => handleRatingChange(value, index)}
                    emptySymbol={<i className="far fa-star color-star" />}
                    fullSymbol={<i className="fas fa-star color-star" />}
                    fractions={2}
                  />
                  <textarea
                    className="form-control my-3"
                    placeholder="Nhận xét về sản phẩm..."
                    value={comments[index]}
                    onChange={(e) => handleCommentChange(e, index)}
                  />
                </div>
              ))}
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
            <button
              type="button"
              className="btn btn-success primary-background text-white"
              onClick={handleSubmit}
            >
              Hoàn thành
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatedReviewsModal;
