import { useEffect, useState } from "react";
import { getOrdersPending } from "../../../services/orderService";
import { formatTime } from "../../../utils/formatTime";
import { formatMoney } from "../../../utils/formatMoney";
import Pagination from "../../../components/Pagination/Pagination";
import OrderDetail from "../Component/OrderDetailModal";
import OrderDetailModal from "../Component/OrderDetailModal";
import OrderForm from "../Component/OrderForm";

const OrdersPending = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [allOrdersPending, setAllOrdersPending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      getOrders(currentPage);
    },[currentPage]);
    const getOrders = (page)=>{
      getOrdersPending(page)
      .then((data)=>{
          setAllOrdersPending(data.data);
          setTotalPages(data.last_page);
          setLoading(false);
      })
      .catch((error)=>{
          console.log(error);
      });
    };
    
    const [selectedId, setSelectedId] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showModal, setShowModal] = useState(false);

  const handleShowModal = (id,order) => {
    setSelectedId(id);
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = (confirm) => {
    setShowModal(false);
    if(confirm){
      getOrders(currentPage);
    }
  };
    return ( 
      <OrderForm
      title="Đơn hàng chờ duyệt"
      data={allOrdersPending}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange = {(page)=>setCurrentPage(page)}
      loading={loading}
      handleShowModal={handleShowModal}
      handleClose={handleCloseModal}
      selectedOrder = {selectedOrder}
      selectedId = {selectedId}
      showModal = {showModal}
      checkConfirm = {true}
    />
     );
}
 
export default OrdersPending;