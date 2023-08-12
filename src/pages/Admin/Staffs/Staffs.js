import { useEffect, useState } from "react";
import {  } from "../../../services/discountService";
import ManageForm from "../Component/ManageForm";
import { getAllStaffs } from "../../../services/AuthSlice";

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
    getStaffs(currentPage);
  }, [currentPage]);
  const getStaffs = (page) => {
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

  

  
  return (
  
    <ManageForm
    name="nhân viên"
    loading={loading}
    allData={allStaffs}
    totalPages={totalPages}
    currentPage={currentPage}
    onPageChange={(page) => setCurrentPage(page)}
    columnHeaders={columnHeaders}
  />  
  );
};

export default Staffs;
