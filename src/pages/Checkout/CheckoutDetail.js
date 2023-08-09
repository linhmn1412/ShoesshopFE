import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CartContext } from "../../contexts/CartContext";
import { formatMoney } from "../../utils/formatMoney";
import { useForm } from "react-hook-form";
import { createOrder } from "../../services/orderService";
import Bill from "./Bill";

const CheckoutDetail = ({ selectedProducts }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.user.user);
  const { cartItems , getCartItems, currentPage } = useContext(CartContext);
  const [checkCreated, setCheckCreated] = useState(false);
  const [isModalBillOpen, setIsModalBillOpen] = useState(false);
  const [dataBill, setDataBill] = useState({});
  const checkout = cartItems.filter((item) =>
    selectedProducts.includes(String(item.id_variant))
  );
  const totalPrice = checkout.reduce(
    (acc, val) =>
      acc + (val.price - val.price * val.discount_value * 0.01) * val.quantity,
    0
  );
  const priceDiscountProduct = (price, discount) => {
    if (discount) {
      return price - price * discount * 0.01;
    } else {
      return price;
    }
  };

  const onSubmit = (data) => {
    const orderData = { 
      name_buyer: data.name_buyer,
      phone_number: data.phone_number,
      address: data.address,
      note: data.note,
      total:totalPrice ,
      payment: data.payment,
      orderItems: checkout.map((item) => ({
        id_variant: item.id_variant,
        name_shoe : item.name_shoe,
        quantity: item.quantity,
        cur_price:priceDiscountProduct(item.price, item.discount_value),
      })),
    };

        createOrder(orderData)
        .then((data)=>{
            getCartItems(currentPage);
            setDataBill({...orderData, id_order: data.id_order});
            setCheckCreated(true);
           
        })
        .then((error)=>{
            console.log("create order failed ",error);
        });
   
  };
  useEffect(()=>{
    if(checkCreated){
      setIsModalBillOpen(true);
      }  
  }, [checkCreated])
 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-7">
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="card-title text-uppercase primary-text mt-2">
                Thông tin đặt hàng
              </h5>
            </div>

            <div className="card-body">
              <div className="form-group">
                <label>Phương thức thanh toán:</label>

                <input
                  type="text"
                  className="form-control"
                  value="Trả tiền khi nhận hàng"
                  {...register("payment", { required: true })}
                />
              </div>
              <br />

              <div>
                <label className="form-label">Tên người nhận:</label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue={user.fullname}
                  {...register("name_buyer", { required: true })}
                />
                {errors.name_buyer && (
                  <span className="text-danger">Tên người nhận không được để trống!</span>
                )}
              </div>
              <br />
              <div>
                <label className="form-label">Số điện thoại:</label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue={user.phone_number}
                  {...register("phone_number",{
                    required: "Số điện thoại không được để trống!",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Số điện thoại phải có đúng 10 chữ số!",
                    },})}
                />
                {errors.phone_number && (
                  <span className="text-danger">{errors.phone_number.message}</span>
                )}
              </div>
              <br />

              <div>
                <label className="form-label">Địa chỉ:</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={user.address}
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-danger">Địa chỉ không được để trống!</span>
                )}
              </div>
              <br />

              <div className=" mb-3">
                <label className="form-label">Ghi chú:</label>

                <textarea
                  type="text"
                  className="form-control"
                  {...register("note", { required: false })}
                ></textarea>
              </div>
            </div>
          </div>
        </div>
        <div className="col-5">
          <div className="card mb-3">
            <div className="card-header">
              <h5 className="card-title mt-2 text-uppercase primary-text">Chi tiết đơn hàng</h5>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr className="primary-text fw-bold">
                    <th className="p-0" scope="col" width="35%">
                      Sản phẩm
                    </th>
                    <th className="p-0" scope="col" width="25%">
                      Giá tiền
                    </th>
                    <th className="p-0" scope="col" width="15%">
                      Số lượng
                    </th>
                    <th className="p-0" scope="col" width="25%">
                      Thành tiền
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {checkout &&
                    checkout.map((val) => (
                      <tr key={val.id_variant}>
                        <td className="p-2">{val.name_shoe}</td>
                        <td className="p-2">
                          {formatMoney(
                            priceDiscountProduct(val.price, val.discount_value)
                          )}
                        </td>
                        <td className="p-2">{val.quantity}</td>
                        <td className="p-2">
                          {formatMoney(
                            priceDiscountProduct(
                              val.price,
                              val.discount_value
                            ) * val.quantity
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="fw-bold mx-2">
                <span style={{ fontSize: "12px" }}>Tạm tính:</span>
                <span className="float-end">{formatMoney(totalPrice)}</span>
              </div>
              <div className="fw-bold mx-2">
                <span style={{ fontSize: "12px" }}>Phí ship:</span>
                <span className="float-end">{formatMoney(20000)}</span>
              </div>

              <div className="fw-bold mx-2 mb-3">
                <span style={{ fontSize: "12px" }}>Tổng tiền: </span>
                <span className="float-end">
                  {formatMoney(totalPrice + 20000)}
                </span>
              </div>

              <center>
                <button
                  type="submit"
                  className="btn btn-success text-white primary-background"
                >
                  Đặt hàng ngay
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
      {dataBill && (
        <Bill
          order={dataBill}
          show={isModalBillOpen}
        />
      )}
    </form>
  );
};

export default CheckoutDetail;
