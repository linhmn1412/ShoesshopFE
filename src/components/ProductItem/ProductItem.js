import { BASE_URL } from "../../services";
import { formatMoney } from "../../utils/formatMoney";
import { Link } from "react-router-dom";
import { getPriceDiscount } from "../../utils/getPriceDiscount";
const ProductItem = ({ listProducts,col }) => {

  
 
  return (

    <>
      {listProducts && listProducts.map((val,index) => (
        <div key={index} className={`${col} `} >
          <div className=" mx-1 p-3 product-item position-relative position-relative-example">
            <Link to= {`/product/${val.id_shoe}`}>
              
                {(val.stock == 0) ? (
                  <div
                  className="bg-image hover-overlay ripple position-relative position-relative-example"
                  data-mdb-ripple-color="light"
                >
                  <img
                    src={`${BASE_URL}/product/${val.id_shoe}/image_1`}
                    className="w-100 rounded "
                    style={{ height: "250px", opacity :0.9 }}
                  />
              <div
                className="position-absolute top-50 start-50 translate-middle primary-text fw-bold btn btn-outline-dark my-3 "
              >
                Hết hàng
              </div>
              </div>
            ) : (
              <div
              className="bg-image hover-overlay ripple"
              data-mdb-ripple-color="light"
            >
              <img
                src={`${BASE_URL}/product/${val.id_shoe}/image_1`}
                className="w-100 rounded"
                style={{ height: "250px" }}
              />
          </div>
            )}
             
              <center className="py-2">
                <p
                  className="card-title py-3 fw-bold"
                  style={{ color: "#185137", fontSize: "14px" }}
                >
                  {val.name_shoe}
                </p>
                <p
                  className="card-text text-danger mb-1"
                  style={{ fontSize: "14px" }}
                >
                  {val.discount_value !== null? (
                    <>
                      <b>
                        {formatMoney(
                          getPriceDiscount(
                            val.price,
                            val.discount_value 
                          )
                        )}
                      </b>
                      &ensp;
                      <del style={{ color: "#7e7e7e", fontWeight: "500" }}>
                        {formatMoney(val.price)}
                      </del>
                    </>
                  ) : (
                    <b>{formatMoney(val.price)}</b>
                  )}
                </p>
              </center>
            </Link>
            {val.discount_value !== null ? (
              <p
                className="position-absolute py-1 text-white rounded text-center box-discount"
              style={{
                  top: "8%",
                  left: "10%",
                }}
              >
                -{val.discount_value}%
              </p>
            ) : (
              <></>
            )}
             
            
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductItem;
