import { useEffect, useState } from "react";
import ManageForm from "../Component/ManageForm";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../../../services/categoryService";
import { toast } from "react-toastify";

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
    fetchCategories(currentPage);
  }, [currentPage]);
  const fetchCategories = (page) => {
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
  const handleAddData = (data) =>{
    createCategory(data)
    .then((response)=>{
      toast.success(response.message);
      fetchCategories(currentPage);
    });
  }
  const handleEditData = (data,id) =>{
    updateCategory(data, id)
    .then((response)=>{
      if(response.status === 200){
        toast.success(response.data.message);
        fetchCategories(currentPage);
      }
      else{
        toast.error("Cập nhật danh mục thất bại");
      }
    })
  }
  const handleRemoveData = (id) =>{
    deleteCategory(id)
  .then((response)=>{
    if(response.status === 200){
      toast.success(response.data.message);
      fetchCategories(currentPage);
    }
    else{
      toast.error(response.data.message);
    }
  })
  }

 

  return (

    <ManageForm
      name="danh mục"
      loading={loading}
      allData={allCategories}
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

export default Categories;
