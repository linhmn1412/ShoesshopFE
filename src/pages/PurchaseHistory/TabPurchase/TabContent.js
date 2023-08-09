import OrderItem from "./OrderItem";
import noOrderImage from "../../../assets/images/no-orderpng.png";
const TabContent = ({ type, orders, onCancelOrder }) => {
const typeOrders = orders.filter((item) => (type === "All" ? true : item.status === type));
  return (
    <div className="p-2">
      {typeOrders.length > 0 ? (
        typeOrders &&
        typeOrders.map((val) => (
          <div key={val.id_order}>
            <OrderItem order={val} onCancelOrder = {onCancelOrder}/>
          </div>
        ))
      ) : (
        <div
          className="d-flex justify-content-center align-items-center "
          style={{ height: "400px" }}
        >
          <div>
            <img src={noOrderImage} alt="" height="100px" />
            <p className="text-muted">Chưa có đơn hàng</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabContent;
