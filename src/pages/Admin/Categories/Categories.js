import { useEffect, useState } from "react";
import ManageForm from "../Component/ManageForm";
import { getAllCategories } from "../../../services/categoryService";
import AddModal from "../Component/AddModal";

const Categories = () => {
  const columnHeaders = [
    { key: "id_category", title: "Mã danh mục", width: "15%" },
    { key: "name_category", title: "Tên danh mục", width: "25%" },
    { key: "name_staff", title: "Nhân viên cập nhật", width: "40%" },
  ];
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategories(currentPage);
  }, [currentPage]);
  const getCategories = (page) => {
    getAllCategories(page)
      .then((data) => {
        setAllCategories(data.data);
        setTotalPages(data.last_page);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };


 

  return (

    <ManageForm
      name="danh mục"
      loading={loading}
      allData={allCategories}
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={(page) => setCurrentPage(page)}
      columnHeaders={columnHeaders}
    />  
  );
};

export default Categories;
