import { useEffect, useState } from "react";
import { getAllDiscounts } from "../../../services/discountService";
import ManageForm from "../Component/ManageForm";

const Discounts = () => {
  const columnHeaders = [
    { key: "id_discount", title: "Mã KM", width: "10%" },
    { key: "name_discount", title: "Tên khuyến mãi", width: "25%" },
    { key: "discount_value", title: "Giá trị khuyến mãi(%)", width: "20%" },
    { key: "name_staff", title: "Nhân viên cập nhật", width: "25%" },

  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allDiscounts, setAllDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDiscounts(currentPage);
  }, [currentPage]);
  const getDiscounts = (page) => {
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


  return (
  
    <ManageForm
      name = "khuyến mãi"
      loading={loading}
      allData={allDiscounts}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
      columnHeaders={columnHeaders}
    />  
  );
};

export default Discounts;
