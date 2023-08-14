import { useEffect, useState } from "react";
import {  } from "../../../services/discountService";
import ManageForm from "../Component/ManageForm";
import { toast } from "react-toastify";
import { createBrand, deleteBrand, getAllBrands, updateBrand } from "../../../services/brandService";

const Discounts = () => {
  const columnHeaders = [
    { key: "id_brand", title: "Mã thương hiệu", width: "15%" },
    { key: "name_brand", title: "Tên thương hiệu", width: "25%" },
    { key: "name_staff", title: "Nhân viên cập nhật", width: "40%" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allBrands, setAllBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBrands(currentPage);
  }, [currentPage]);
  const fetchBrands = (page) => {
    getAllBrands(page)
      .then((data) => {
        setAllBrands(data.data);
        setTotalPages(data.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
const handleAddData = (data) =>{
  createBrand(data)
  .then((response)=>{
    toast.success(response.message);
    fetchBrands(currentPage);
  });
}
const handleEditData = (data, id) =>{
  updateBrand(data, id)
  .then((response)=>{
    if(response.status === 200){
      toast.success(response.data.message);
      fetchBrands(currentPage);
    }
    else{
      toast.error("Cập nhật thương hiệu thất bại");
    }
  })

};
const handleRemoveData = (id) =>{
  deleteBrand(id)
  .then((data)=>{
    if(data.status === 200){
      toast.success(data.data.message);
      fetchBrands(currentPage);
    }
    else{
      toast.error(data.data.message);
    }
  })
}
  
  return (
  
    <ManageForm
    name="thương hiệu"
    loading={loading}
    allData={allBrands}
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
