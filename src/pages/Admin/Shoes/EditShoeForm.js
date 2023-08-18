import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../services";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import { createVariant, deleteVariant, getVariantsByIdProduct, updateVariant } from "../../../services/productService";
import VariantForm from "./VariantForm";
import DeleteComfirm from "../../../components/DeleteConfirm/DeleteConfirm";
import { toast } from "react-toastify";
import { update } from "../../../services/cartItemService";

const EditShoeForm = ({
  data,
  handleClose,
  handleSubmit,
  categories,
  brands,
  discounts,
}) => {
  //product
  const [defaultImage, setDefaultImage] = useState("");
  const [initialData, setInitialData] = useState({});
  const [variants, setVariants] = useState([]);
  useEffect(() => {
    setDefaultImage(`${BASE_URL}/product/${data.id_shoe}/image`);
    setInitialData({
      id_shoe: data.id_shoe,
      name_shoe: data.name_shoe,
      id_category: data.id_category,
      id_brand: data.id_brand,
      id_discount: data.id_discount,
      price: data.price,
      description: data.description,
      name_staff: data.name_staff,
      image : null,
      status: data.status,
    });
    fetchVariants(data.id_shoe)
  }, [data.id_shoe]);

  useEffect (()=>{
    
  },[]);
  const fetchVariants = (id)=>{
    getVariantsByIdProduct(id)
    .then((data)=>{
      setVariants(data);
    })
  }
  const onSubmit = () => {
    const formData = new FormData();
    formData.append("image",initialData.image);
    formData.append("name_shoe", initialData.name_shoe);
    formData.append("id_category", initialData.id_category);
    formData.append("id_brand", initialData.id_brand);
    formData.append("id_discount", initialData.id_discount ? initialData.id_discount : '');
    formData.append("price",initialData.price);
    formData.append("description", initialData.description ? initialData.description : '');
    handleSubmit(formData, initialData.id_shoe);  
    handleClose();
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setInitialData({...initialData, image: selectedFile});
      const imageUrl = URL.createObjectURL(selectedFile);
      setDefaultImage(imageUrl);
    }
  };
  const handleUploadButtonClick = () => {
    document.getElementById("inputImage").click();
  };
  //variant
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [selected, setSelected] = useState(null);
  const [idRemove, setIdRemove] = useState(null);
  const [confirm, setConfirm] = useState('');
  const [dataEdit, setDataEdit] = useState(null);

  const handleCloseModalAdd = () => {
    setShowModalAdd(false);
  };

  const handleShowModalAdd= () => {
    setShowModalAdd(true);
  };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };

  const handleShowModalEdit= (variant, index) => {
    setShowModalEdit(true);
    setDataEdit(variant);
    setSelected(index);
  };

  const handleShowModalRemove= (variant , index) => {
    setShowModalRemove(true);
    setIdRemove(variant.id_variant);
    setSelected(index);
    setConfirm(`Bạn có chắc muốn xóa sản phẩm ${data.name_shoe} màu ${variant.color} size ${variant.size}?`)
  };
  const handleCloseModalRemove = () => {
    setShowModalRemove(false);
  };

  const handleAddData = (valueData) =>{
    createVariant(valueData,data.id_shoe)
    .then((response)=>{
      if(response.status === 200){
        toast.success(response.data.message);
        const existingVariantIndex = variants.findIndex(
          (variant) => variant.color === valueData.color && variant.size === valueData.size
        );
      
        if (existingVariantIndex !== -1) {
      
          const updatedVariants = [...variants];
          updatedVariants[existingVariantIndex].quantity_stock += valueData.quantity_stock;
          setVariants(updatedVariants);
        } else {
          // Biến thể chưa tồn tại, thêm mới
          setVariants((prevVariants) => [...prevVariants, {...valueData, quantity_sold : 0}]);
        }
      }
      else{
        toast.error('Thêm biến thể thất bại');
      }
    })

  };
  const handleEditData = (valueData) =>{

    updateVariant(valueData, valueData.id_variant)
    .then((response)=>{
     if(response.status === 200){
      toast.success(response.data.message);
      const updatedVariants = [...variants];
      updatedVariants[selected].quantity_stock = valueData.quantity_stock;
      setVariants(updatedVariants);
     }
    })
  };
  const handleRemoveData = (id) =>{
    deleteVariant(id)
    .then((response)=>{
      if(response.status === 200){
        toast.success(response.data.message);
        const updatedVariants = variants.filter((_, i) => i !== selected);
        setVariants(updatedVariants);

      }
      else {
        toast.error(response.data.message);   
      }
    })

  };
  if (!initialData.id_shoe) return <></>;
  return (
    <>
      <div className="modal-body">
         <div className="row px-2 primary-text fw-bold">
          <div className="col-8 ">
          <p className="primary-text fw-bold mb-1">
              Mã sản phẩm: {initialData.id_shoe}
            </p>
            <p className="text-muted" style={{ fontSize: "12px" }}>
              Nhân viên cập nhật gần nhất:&ensp;
              <span className="primary-text fw-bold">
                {initialData.name_staff}
              </span>
            </p>
            <div className="row ">
              <div className="form-group col-6 mb-3">
              <label htmlFor="name">Tên sản phẩm:</label>
              <input
                onChange={(e) => {
                  setInitialData({ ...initialData, name_shoe: e.target.value });
                }}
                value={initialData.name_shoe}
                type="text"
                className={`form-control`}
                id="name"
              />
              </div>
              <div className="form-group col-3 mb-3">
                <label className=" primary-text">
                Trạng thái
                </label>
                <select
                  className={`form-control `}
                  id="status"
                  value={initialData.status}
                  onChange={(e) => {
                    setInitialData({
                      ...initialData,
                      status: e.target.value,
                    });
                  }}
                >
                <option key='0' value= {false} className="option-custom">
                      Không hoạt động
                </option>
                <option key='1' value={true} className="option-custom">
                      Hoạt động
                </option>
      
                </select>
              </div>
              <div className="form-group col-3 mb-3">
              <label htmlFor="price">Giá tiền:</label>
              <input
                onChange={(e) => {
                  setInitialData({ ...initialData, price: e.target.value });
                }}
                value={initialData.price}
                type="number"
                className={`form-control`}
                id="price"
              />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-4  my-3">
              <label htmlFor="category">Danh mục:</label>
              <select
                onChange={(e) => {
                  setInitialData({
                    ...initialData,
                    id_category: e.target.value,
                  });
                }}
                value={initialData.id_category}
                className={`form-control `}
                id="category"
              >
                <option value="">-- Chọn danh mục --</option>
                {categories &&
                  categories.map((category) => (
                    <option
                      key={category.id_category}
                      value={category.id_category}
                    >
                      {category.name_category}
                    </option>
                  ))}
              </select>
              </div>

              <div className="form-group col-4  my-3">
              <label htmlFor="brand">Thương hiệu:</label>
              <select
                onChange={(e) => {
                  setInitialData({ ...initialData, id_brand: e.target.value });
                }}
                value={initialData.id_brand}
                className={`form-control`}
                id="brand"
              >
                <option value="">-- Chọn thương hiệu --</option>
                {brands &&
                  brands.map((brand) => (
                    <option key={brand.id_brand} value={brand.id_brand}>
                      {brand.name_brand}
                    </option>
                  ))}
              </select>
              </div>

              <div className="form-group col-4  my-3">
               <label htmlFor="discount">Khuyến mãi:</label>
              <select
                onChange={(e) => {
                  setInitialData({
                    ...initialData,
                    id_discount: e.target.value,
                  });
                }}
                value={initialData.id_discount ? initialData.id_discount : ""}
                className={`form-control `}
                id="discount"
              >
                <option value="">-- Chọn khuyến mãi --</option>
                {discounts &&
                  discounts.map((discount) => (
                    <option
                      key={discount.id_discount}
                      value={discount.id_discount}
                    >
                      {discount.name_discount}
                    </option>
                  ))}
              </select>
              </div>
            </div>

            <div className="row ">
              <div className="form-group col-5  my-3">
                <label htmlFor="image">Hình ảnh:</label>
                <div className=" ">
                  {defaultImage && (
                    <img
                      className="p-3 card mt-2"
                      src={defaultImage}
                      alt=""
                      style={{ width: "200px", height: "200px" }}
                    />
                  )}
                  <Link
                    onClick={handleUploadButtonClick}
                    to="#"
                    className="mx-5 primary-text"
                  >
                    Tải ảnh lên&ensp;
                    <MDBIcon fas icon="upload" />
                  </Link>
                </div>

                <input
                   type="file"
                   className={`form-control`}
                   id="inputImage"
                   style={{ display: "none" }}
                   onChange={(e) => handleFileChange(e)}
                />
              </div>

              <div className="form-group col-7  my-3">
                <label htmlFor="description">Mô tả:</label>
                <textarea
                  className={`form-control `}
                  id="description"
                  onChange={(e) => {
                    setInitialData({
                      ...initialData,
                      description: e.target.value,
                    });
                  }}
                  value={initialData.description}
                  style={{ height: "200px", resize: "vertical" }}
                />
              </div>
            </div>
          </div>
          <div className="col-4" style={{marginTop : "40px"}}>
                  <div className="row mb-2 align-items-center">
                  <p className="text-muted col-8">Các biến thể sản phẩm</p>
                  <div className="col-4">
                  <span className="btn btn-success primary-background float-end " onClick={handleShowModalAdd}> <MDBIcon fas icon="plus" /> &ensp;Thêm</span>
                  </div>
                  </div>
                  <div className="table-reponsive">
                  <table className="w-100 border border-1 table align-middle " style={{backgroundColor : "#fefefe", fontSize:"13px", }}>
              <thead>
                <tr  className=" w-100 text-center">
                  <th width= "20%" className="py-2 px-1">Màu</th>
                  <th width= "20%"className="py-2 px-1">Size</th>
                  <th width= "20%"className="py-2 px-1">Tồn kho</th>
                  <th width= "20%"className="py-2 px-1">Đã bán</th>
                  <th width= "0%"className="py-2 px-1">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                { variants.length === 0 ? (
                <tr className="text-center text-muted ">
                  <td colSpan='4' >Chưa có dữ liệu!</td>
                </tr>
                ):(
                  variants.map((val,index)=>(
                    <tr key={index}  className="text-center">
                      <td className="py-2 px-1">{val.color}</td>
                      <td className="py-2 px-1">{val.size}</td>
                      <td className="py-2 px-1">{val.quantity_stock}</td>
                      <td className="py-2 px-1">{val.quantity_sold}</td>
                      <td className="py-2 px-1">
                      <MDBIcon far icon="edit " 
                       style={{ cursor: "pointer" }}
                       title="Cập nhật"
                       onClick={()=>handleShowModalEdit(val,index)} /> 
                       &ensp;
                        <MDBIcon far icon="trash-alt " 
                       style={{ cursor: "pointer" }}
                       title="xóa"
                       onClick={()=>handleShowModalRemove(val,index)} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
                  </div>
            
          </div>
        </div>
      </div>

      <div className="modal-footer">
      <button
          className="btn btn-success primary-background"
          onClick={onSubmit}
        >
          Lưu
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={handleClose}
        >
          Đóng
        </button>
       
      </div>
      {showModalAdd && (
      <VariantForm
        icon = 'plus'
        title='Thêm biến thể'
        show={showModalAdd}
        handleClose={handleCloseModalAdd}
        data={undefined}
        handleAdd = {handleAddData}
      />
    )}
    {showModalEdit && (
      <VariantForm
      icon= 'edit'
        title='Chỉnh sửa biến thể'
        show={showModalEdit}
        data = {dataEdit}
        handleClose={handleCloseModalEdit}
        handleEdit={handleEditData}
      />
    )}
     {showModalRemove && (
      <DeleteComfirm
        
        confirmContent={confirm}
        id={idRemove}
        show={showModalRemove}
        handleClose={handleCloseModalRemove}
        handleRemove = {handleRemoveData}
      />
    )}
    </>
  );
};

export default EditShoeForm;
