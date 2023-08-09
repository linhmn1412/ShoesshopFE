import Rating from "react-rating";
import { formatMoney } from "../../../utils/formatMoney";
import { getPriceDiscount } from "../../../utils/getPriceDiscount";
import Accordion from "../Accordion/Accordion";
import AddToCart from "./AddToCart";
const ProductInfor = ({ data,variants, reviews, avgRated}) => {
  const countReviews = reviews.length;
  return (
    <div className="col-md ">
      <div className="card-body mt-2 py-5">
        <div className="float-end">
          <div className=" text-info d-flex align-items-center">
            {avgRated !== null ? (
              <Rating
                initialRating={avgRated}
                emptySymbol={<i className="far fa-star color-star" />}
                fullSymbol={<i className="fas fa-star color-star" />}
                readonly
                fractions={2}
              />
            ) : (
              <></>
            )}
            <small className="text-muted float-end">
              ({countReviews} Đánh giá)
            </small>
          </div>
        </div>
        <h3 className="card-title mb-3 primary-text">{data.name_shoe}</h3>

        <h5 className="card-text text-danger mb-3 ">
          {data.discount_value !== null ? (
            <>
              <b>
                {formatMoney(getPriceDiscount(data.price, data.discount_value))}
              </b>
              &ensp;
              <del style={{ color: "#7e7e7e", fontWeight: "500" }}>
                {formatMoney(data.price)}
              </del>
            </>
          ) : (
            <b>{formatMoney(data.price)}</b>
          )}
          <p className="my-2 text-muted" style={{ fontSize: "13px" }}>
            Đã bán: {data.sold}
          </p>
        </h5>
        <AddToCart data = {data} variants = {variants} />
      

        <Accordion
          description={data.description}
          name={data.name_shoe}
          category={data.name_category}
          brand={data.name_brand}
          discount={data.discount_value}
          price={data.price}
          stock={data.stock}
        />
      </div>
    </div>
  );
};

export default ProductInfor;
