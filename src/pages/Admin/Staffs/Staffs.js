import { useEffect, useState } from "react";
import {  } from "../../../services/discountService";
import ManageForm from "../Component/ManageForm";
import { createStaff, getAllStaffs, registerAccount, updateStaff } from "../../../services/AuthSlice";
import { toast } from "react-toastify";

const Staffs = () => {

  const columnHeaders = [
    { key: "id_staff", title: "Mã NV", width: "5%" },
    { key: "fullname", title: "Họ tên", width: "15%" },
    { key: "email", title: "Email", width: "15%" },
    { key: "phone_number", title: "Số điện thoại", width: "10%" },
    { key: "address", title: "Địa chỉ", width: "15%" },
    { key: "salary", title: "Lương", width: "10%" },
    { key: "status", title: "Trạng thái", width: "15%" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allStaffs, setAllStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchStaffs(currentPage);
  }, [currentPage]);
  const fetchStaffs = (page) => {
    getAllStaffs(page)
      .then((data) => {
        setAllStaffs(data.data);
        setTotalPages(data.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  const handleAddData = (data) =>{
    createStaff(data)
    .then((respone)=>{
      if(respone.status === 200){
        toast.success(respone.data.message);
        fetchStaffs(currentPage);
      }
      else{
        toast.error("Đăng ký tài khoản thất bại")
      }
    })
  }
  const handleEditData = (data,id) =>{
    updateStaff(data, id)
    .then((response)=>{
      if(response.status === 200){
        toast.success(response.data.message);
        fetchStaffs(currentPage);
      }
      else{
        toast.error("Cập nhật khuyến mãi thất bại");
      }
    })
  }
  
  return (
  
    <ManageForm
    name="nhân viên"
    loading={loading}
    allData={allStaffs}
    totalPages={totalPages}
    currentPage={currentPage}
    onPageChange={(page) => setCurrentPage(page)}
    columnHeaders={columnHeaders}
    handleAddData={handleAddData}
    handleEditData={handleEditData}
    handleRemoveData={''}
  />  
  );
};

export default Staffs;
