import { useEffect, useState } from "react";
import { createDiscount, deleteDiscount, getAllDiscounts, updateDiscount } from "../../../services/discountService";
import ManageForm from "../Component/ManageForm";
import { toast } from "react-toastify";

const Discounts = () => {
  const columnHeaders = [
    { key: "id_discount", title: "Mã KM", width: "10%" },
    { key: "name_discount", title: "Tên khuyến mãi", width: "25%" },
    { key: "discount_value", title: "Giá trị khuyến mãi", width: "20%" },
    { key: "name_staff", title: "Nhân viên cập nhật", width: "25%" },

  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscounts(currentPage);
  }, [currentPage]);
  const fetchDiscounts = (page) => {
    getAllDiscounts(page)
      .then((data) => {
        setAllDiscounts(data.data);
        setTotalPages(data.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddData = (data) =>{
    createDiscount(data)
    .then((response)=>{
      toast.success(response.message);
      fetchDiscounts(currentPage);
    });
  }
  const handleEditData = (data,id) =>{
    updateDiscount(data, id)
  .then((response)=>{
    if(response.status === 200){
      toast.success(response.data.message);
      fetchDiscounts(currentPage);
    }
    else{
      toast.error("Cập nhật khuyến mãi thất bại");
    }
  })
  }
  const handleRemoveData = (id) =>{
    deleteDiscount(id)
  .then((response)=>{
    if(response.status === 200){
      toast.success(response.data.message);
      fetchDiscounts(currentPage);
    }
    else{
      toast.error(response.data.message);
    }
  })
  }
  return (
  
    <ManageForm
      name = "khuyến mãi"
      loading={loading}
      allData={allDiscounts}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
      columnHeaders={columnHeaders}
      handleAddData={handleAddData}
      handleEditData={handleEditData}
      handleRemoveData={handleRemoveData}
    />  
  );
};

export default Discounts;
