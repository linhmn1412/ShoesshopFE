import { useEffect, useState } from "react";
import {  } from "../../../services/discountService";
import ManageForm from "../Component/ManageForm";
import { getAllBrands } from "../../../services/brandService";

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
    getBrands(currentPage);
  }, [currentPage]);
  const getBrands = (page) => {
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

  

  
  return (
  
    <ManageForm
    name="thương hiệu"
    loading={loading}
    allData={allBrands}
    totalPages={totalPages}
    currentPage={currentPage}
    onPageChange={(page) => setCurrentPage(page)}
    columnHeaders={columnHeaders}
  />  
  );
};

export default Discounts;
