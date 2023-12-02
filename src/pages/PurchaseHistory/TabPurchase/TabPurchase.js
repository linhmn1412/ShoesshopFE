import { Link } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import TabContent from "./TabContent";
import { useEffect, useState } from "react";
import {
  cancelOrder,
  getOrdersByUser,
  receiveOrder,
} from "../../../services/orderService";
import { toast } from "react-toastify";

const TabPurchase = () => {
  const breadcrumbItems = [
    { text: "Trang Chủ", link: "/" },
    { text: "Lịch sử mua hàng", link: "/purchase" },
  ];
  const [allOrders, setAllOrders] = useState([]);
  useEffect(() => {
    getOrdersByUser()
      .then((data) => {
        setAllOrders(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleCancelOrder = (id) => {
    const orderIndex = allOrders.findIndex((order) => order.id_order === id);

    if (orderIndex !== -1) {
      const updatedOrders = [...allOrders];
      updatedOrders[orderIndex].status = "Đã hủy";
      setAllOrders(updatedOrders);
    }

    cancelOrder(id)
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => {
        console.log(error);
        setAllOrders(allOrders);
        toast.error("Hủy đơn thành thất bại. Hãy thử lại sau!");
      });
  };

  const handleRecieveOrder = (id) => {
    console.log(id);
    const orderIndex = allOrders.findIndex((order) => order.id_order === id);

    if (orderIndex !== -1) {
      const updatedOrders = [...allOrders];
      updatedOrders[orderIndex].status = "Hoàn thành";
      setAllOrders(updatedOrders);
    }

    receiveOrder(id)
      .then((data) => {
        toast.success(data.message);
      })
      .catch((error) => {
        console.log(error);
        setAllOrders(allOrders);
        toast.error("Hủy đơn thành thất bại. Hãy thử lại sau!");
      });
  };
  return (
    <div className="container ">
      <Breadcrumb items={breadcrumbItems} />
      <div className="card p-4">
        <ul className="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link active"
              id="ex3-tab-1"
              data-mdb-toggle="tab"
              to="#ex3-tabs-1"
              role="tab"
              aria-controls="ex3-tabs-1"
              aria-selected="true"
            >
              Tất cả
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link"
              id="ex3-tab-2"
              data-mdb-toggle="tab"
              to="#ex3-tabs-2"
              role="tab"
              aria-controls="ex3-tabs-2"
              aria-selected="false"
            >
              Chờ xác nhận
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link"
              id="ex3-tab-3"
              data-mdb-toggle="tab"
              to="#ex3-tabs-3"
              role="tab"
              aria-controls="ex3-tabs-3"
              aria-selected="false"
            >
              Đã xác nhận
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link"
              id="ex3-tab-4"
              data-mdb-toggle="tab"
              to="#ex3-tabs-4"
              role="tab"
              aria-controls="ex3-tabs-4"
              aria-selected="false"
            >
              Hoàn thành
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <Link
              className="nav-link"
              id="ex3-tab-5"
              data-mdb-toggle="tab"
              to="#ex3-tabs-5"
              role="tab"
              aria-controls="ex3-tabs-5"
              aria-selected="false"
            >
              Đã hủy
            </Link>
          </li>
        </ul>

        <div className="tab-content" id="ex2-content">
          <div
            className="tab-pane fade show active"
            id="ex3-tabs-1"
            role="tabpanel"
            aria-labelledby="ex3-tab-1"
          >
            <TabContent
              type="All"
              type1=""
              orders={allOrders}
              onCancelOrder={handleCancelOrder}
              onReceiveOrder={handleRecieveOrder}
            />
          </div>
          <div
            className="tab-pane fade"
            id="ex3-tabs-2"
            role="tabpanel"
            aria-labelledby="ex3-tab-2"
          >
            <TabContent
              type="Chờ xác nhận"
              type1="Đã thanh toán"
              orders={allOrders}
              onCancelOrder={handleCancelOrder}
              onReceiveOrder={handleRecieveOrder}
            />
          </div>
          <div
            className="tab-pane fade"
            id="ex3-tabs-3"
            role="tabpanel"
            aria-labelledby="ex3-tab-3"
          >
            <TabContent
              type="Đã xác nhận"
              type1=""
              orders={allOrders}
              onCancelOrder={handleCancelOrder}
              onReceiveOrder={handleRecieveOrder}
            />
          </div>
          <div
            className="tab-pane fade"
            id="ex3-tabs-4"
            role="tabpanel"
            aria-labelledby="ex3-tab-4"
          >
            <TabContent
              type="Hoàn thành"
              type1=""
              orders={allOrders}
              onCancelOrder={handleCancelOrder}
              onReceiveOrder={handleRecieveOrder}
            />
          </div>
          <div
            className="tab-pane fade"
            id="ex3-tabs-5"
            role="tabpanel"
            aria-labelledby="ex3-tab-5"
          >
            <TabContent
              type="Đã hủy"
              type1=""
              orders={allOrders}
              onCancelOrder={handleCancelOrder}
              onReceiveOrder={handleRecieveOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabPurchase;
