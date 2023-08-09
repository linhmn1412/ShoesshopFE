import { useEffect, useState } from "react";
import OrderForm from "../Component/OrderForm";
import { getAllOrders } from "../../../services/orderService";

const Orders = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [allOrders, setAllOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      getOrders(currentPage);
    },[currentPage]);
    const getOrders = (page)=>{
      getAllOrders(page)
      .then((data)=>{
        setAllOrders(data.data);
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
  };
    return ( 
      <OrderForm
      title="Quản lý đơn hàng"
      data={allOrders}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange = {(page)=>setCurrentPage(page)}
      loading={loading}
      handleShowModal={handleShowModal}
      handleClose={handleCloseModal}
      selectedOrder = {selectedOrder}
      selectedId = {selectedId}
      showModal = {showModal}
      checkConfirm = {false}
    />
     );
}
 
export default Orders;