import OrderItem from "./OrderItem";
import noOrderImage from "../../../assets/images/no-orderpng.png";
const TabContent = ({ type, orders, ...rest }) => {
const typeOrders = orders.filter((item) => (type === "All" ? true : item.status === type));
if(type === "All")
console.log(typeOrders);
  return (  
    <div className="p-2">
      {typeOrders.length > 0 ? (
        typeOrders.map((val) => (
          <div key={val.id_order}>
            <OrderItem order={val} {...rest}/>
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
