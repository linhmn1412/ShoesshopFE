import { useForm } from "react-hook-form";
import { createProduct } from "../../../services/productService";
import { toast } from "react-toastify";
import uploadImage from "../../../assets/images/download.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdb-react-ui-kit";

const AddShoeForm = ({
  handleClose,
  handleSubmit,
  categories,
  brands,
  discounts,
}) => {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [defaultImage, setDefaultImage] = useState(uploadImage);
  const [valueImage, setValueImage] = useState("");
  const [color, setColor] = useState("");
const [size, setSize] = useState("");
const [quantity, setQuantity] = useState("");
  const [listVariants, setListVariants] = useState([]);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setValueImage(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setDefaultImage(imageUrl);
    }
  };
  const handleUploadButtonClick = () => {
    // Triggers click event on the hidden input element
    document.getElementById("inputImage").click();
  };
  const handleAddVariant = ()=>{
    if(color && size && quantity){
    const newVariant = {
      color: color,
      size: size,
      quantity_stock: Number(quantity),
    };
  
    const existingVariantIndex = listVariants.findIndex(
    (variant) => variant.color === color && variant.size === size
  );

  if (existingVariantIndex !== -1) {

    const updatedVariants = [...listVariants];
    updatedVariants[existingVariantIndex].quantity_stock += Number(quantity);
    setListVariants(updatedVariants);
  } else {
    // Biến thể chưa tồn tại, thêm mới
    setListVariants((prevVariants) => [...prevVariants, newVariant]);
  }
    setColor("");
    setSize("");
    setQuantity("");
  }
}

  const handleDeleteVariant = (index) =>{
    const updatedVariants = listVariants.filter((_, i) => i !== index);
    setListVariants(updatedVariants);
  }

  const onSubmit = (data) => {
     console.log("data", JSON.stringify(listVariants));
    const formData = new FormData();
    formData.append("image", valueImage);
    formData.append("name_shoe", data.name);
    formData.append("id_category", data.category);
    formData.append("id_brand", data.brand);
    formData.append("id_discount", data.discount);
    formData.append("price", data.price);
    formData.append("description", description.value ? description.value : "");
    formData.append('data', JSON.stringify(listVariants));
    handleSubmit(formData);
    reset();
    handleClose();
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)} className="h-100">
      <div className="modal-body">
        <div className="row p-2 primary-text fw-bold">
          <div className="col-8 ">
            <div className="row ">
              <div className="form-group col-8 my-3">
                <label htmlFor="name">Tên sản phẩm:</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  {...register("name", {
                    required: "Vui lòng nhập tên sản phẩm",
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">*{errors.name.message}</div>
                )}
              </div>
              <div className="form-group col-4 my-3">
                <label htmlFor="price">Giá tiền:</label>
                <input
                  type="number"
                  className={`form-control ${errors.price ? "is-invalid" : ""}`}
                  id="price"
                  {...register("price", {
                    required: "Vui lòng nhập giá sản phẩm",
                    min: 0,
                  })}
                />
                {errors.price && (
                  <div className="invalid-feedback">
                    *{errors.price.message}
                  </div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="form-group col-4  my-3">
                <label htmlFor="category">Danh mục:</label>
                <select
                  className={`form-control  ${
                    errors.category ? "is-invalid" : ""
                  }`}
                  id="category"
                  {...register("category", {
                    required: "Vui lòng chọn danh mục",
                  })}
                >
                  <option value="">-Chọn danh mục-</option>
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
                {errors.category && (
                  <div className="invalid-feedback">
                    *{errors.category.message}
                  </div>
                )}
              </div>

              <div className="form-group col-4  my-3">
                <label htmlFor="brand">Thương hiệu:</label>
                <select
                  className={`form-control ${errors.brand ? "is-invalid" : ""}`}
                  id="brand"
                  {...register("brand", {
                    required: "Vui lòng chọn thương hiệu",
                  })}
                >
                  <option value="">-Chọn thương hiệu-</option>
                  {brands &&
                    brands.map((brand) => (
                      <option key={brand.id_brand} value={brand.id_brand}>
                        {brand.name_brand}
                      </option>
                    ))}
                </select>
                {errors.brand && (
                  <div className="invalid-feedback">
                    *{errors.brand.message}
                  </div>
                )}
              </div>

              <div className="form-group col-4  my-3">
                <label htmlFor="discount">Khuyến mãi:</label>
                <select
                  className={`form-control  ${
                    errors.discount ? "is-invalid" : ""
                  }`}
                  id="discount"
                  {...register("discount")}
                >
                  <option value="">-Chọn khuyến mãi-</option>
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
                  className={`form-control  ${
                    errors.image ? "is-invalid" : ""
                  }`}
                  id="inputImage"
                  {...register("image", {
                    required: " Vui lòng chọn hình ảnh",
                  })}
                  style={{ display: "none" }}
                  onChange={(e) => handleFileChange(e)}
                />
                {errors.image && (
                  <div className="invalid-feedback mt-2">{errors.image.message}</div>
                )}
              </div>

              <div className="form-group col-7  my-3">
                <label htmlFor="description">Mô tả:</label>
                <textarea
                  className={`form-control `}
                  id="description"
                  {...register("description")}
                  style={{ height: "200px", resize: "vertical" }}
                />
              </div>
            </div>
          </div>
          <div className="col-4 mt-3">
            <div className="row mb-3">
            <div className="form-group col-4">
                <label htmlFor="name">Màu:</label>
                <input
                  type="text"
                  value={color}
                  className={`form-control`}
                  id="color"
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="name">Size:</label>
                <input
                  type="text"
                  value={size}
                  className={`form-control`}
                  id="size"
                  onChange={(e) => setSize(e.target.value)}
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="name">Số lượng:</label>
                <input
                  type="text"
                  value={quantity}
                  className={`form-control`}
                  id="stock"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
            </div>
            <center>
            <span className="btn btn-success primary-background" onClick={()=>handleAddVariant()}>Thêm</span>
            </center>
            <p className="mt-3 text-muted">Danh sách các biến thể sản phẩm thêm vào</p>
            <table className="w-100 border border-1 table " style={{backgroundColor : "#fefefe", fontSize:"13px", height:"280px"}}>
              <thead>
                <tr  className=" w-100 text-center">
                  <th width= "30%" className="py-2 px-1">Màu</th>
                  <th width= "30%"className="py-2 px-1">Size</th>
                  <th width= "30%"className="py-2 px-1">Số lượng</th>
                  <th width= "10%"className="py-2 px-1">Xóa</th>
                </tr>
              </thead>
              <tbody>
                { listVariants.length === 0 ? (
                <tr className="text-center text-muted ">
                  <td colSpan='4' >Chưa có dữ liệu!</td>
                </tr>
                ):(
                  listVariants.map((val,index)=>(
                    <tr key={index}  className="text-center">
                      <td className="py-2 px-1">{val.color}</td>
                      <td className="py-2 px-1">{val.size}</td>
                      <td className="py-2 px-1">{val.quantity_stock}</td>
                      <td className="py-2 px-1">
                        <MDBIcon far icon="trash-alt " 
                       style={{ cursor: "pointer" }}
                       onClick={()=>handleDeleteVariant(index)} /></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="modal-footer ">
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={handleClose}
        >
          Đóng
        </button>
        <button type="submit" className="btn btn-success primary-background">
          Lưu
        </button>
      </div>
    </form>
  );
};

export default AddShoeForm;
