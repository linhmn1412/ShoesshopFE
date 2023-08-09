import { Link } from "react-router-dom";
import { BASE_URL } from "../../../services";
import { formatMoney } from "../../../utils/formatMoney";

const OrderDetail = ({ item }) => {
  return (
    <div className="row p-2 border-bottom border-1 mb-2">
      <div className="col-9">
        <div className="row">
          <div className="col-2">
            <img
              src={`${BASE_URL}/product/${item.shoe_variant.id_shoe}/image`}
              alt=""
              className="w-100"
            />
          </div>
          <div className="col-10 ">
            <Link className="primary-text fw-bold mb-3" to ={`/product/${item.shoe_variant.id_shoe}` }>{item.shoe_variant.shoe.name_shoe}</Link>
            <div className="text-muted " style={{ fontSize: "13px" }}>
                      Phân loại: {item.shoe_variant.color}, {item.shoe_variant.size}
                    </div>
            <p>x{item.quantity}</p>
          </div>
        </div>
      </div>
      <div className="col-3 d-flex align-items-center justify-content-end" style={{fontSize :"13px"}}>
        {Number(item.shoe_variant.shoe.price) !== Number(item.cur_price) ? (
            <>
             <span className="text-danger fw-bold">
            {formatMoney(item.cur_price)}
          </span>
          &ensp;
          <del style={{ color: "#7e7e7e", fontWeight: "500" }}>
            {formatMoney(item.shoe_variant.shoe.price)}
          </del></>
           
        ):(
            <span  className="fw-bold ">
            {formatMoney(item.cur_price)}
          </span>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
