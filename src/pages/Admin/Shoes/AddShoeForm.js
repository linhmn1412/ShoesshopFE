import { useForm } from "react-hook-form";
import { createProduct } from "../../../services/productService";
import { toast } from "react-toastify";
import uploadImage from '../../../assets/images/download.png';
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
  const handleFileChange = ( e) => {
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

  const onSubmit = (data) => {
    console.log("data",data);
    const formData = new FormData();
    formData.append("image",valueImage);
    formData.append("name_shoe", data.name);
    formData.append("id_category", data.category);
    formData.append("id_brand", data.brand);
    formData.append("id_discount", data.discount);
    formData.append("price",data.price);
    formData.append("description", description.value);
    handleSubmit(formData);
   
   
    reset();
    handleClose();
  };

  return (
    <form onSubmit={handleFormSubmit(onSubmit)} className="h-100">
      <div className="modal-body">
      <div className="row p-4 primary-text fw-bold">
        <div className="col-7 px-1 ">
          <div className="form-group my-4 ">
            <label htmlFor="name">Tên sản phẩm:</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              {...register("name", { required: "Vui lòng nhập tên sản phẩm" })}
            />
            {errors.name && (
              <div className="invalid-feedback">*{errors.name.message}</div>
            )}
          </div>

          <div className="form-group my-4">
            <label htmlFor="category">Danh mục:</label>
            <select
              className={`form-control  ${errors.category ? "is-invalid" : ""}`}
              id="category"
              {...register("category", { required: "Vui lòng chọn danh mục" })}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories && categories.map((category) => (
                <option key={category.id_category} value={category.id_category}>
                  {category.name_category}
                </option>
              ))}
            </select>
            {errors.category && (
              <div className="invalid-feedback">*{errors.category.message}</div>
            )}
          </div>

          <div className="form-group my-4">
            <label htmlFor="brand">Thương hiệu:</label>
            <select
              className={`form-control ${errors.brand ? "is-invalid" : ""}`}
              id="brand"
              {...register("brand", { required: "Vui lòng chọn thương hiệu" })}
            >
              <option value="">-- Chọn thương hiệu --</option>
              {brands && brands.map((brand) => (
                <option key={brand.id_brand} value={brand.id_brand}>
                  {brand.name_brand}
                </option>
              ))}
            </select>
            {errors.brand && (
              <div className="invalid-feedback">*{errors.brand.message}</div>
            )}
          </div>

          <div className="form-group my-4">
            <label htmlFor="discount">Khuyến mãi:</label>
            <select
              className={`form-control  ${errors.discount ? "is-invalid" : ""}`}
              id="discount"
              {...register("discount")}
            >
              <option value="">-- Chọn khuyến mãi --</option>
              {discounts && discounts.map((discount) => (
                <option key={discount.id_discount} value={discount.id_discount}>
                  {discount.name_discount}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group my-4">
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
              <div className="invalid-feedback">*{errors.price.message}</div>
            )}
          </div>
        </div>

        <div className="col-5 px-3">
        <div className="form-group my-4" >
          <label htmlFor="image">Hình ảnh:</label>
            <div className=" d-flex align-items-center">
              {defaultImage && (
                <img
                className="p-3 card mt-2"
                  src={defaultImage}
                  alt=""
                  style={{ width: "200px", height: "200px" }}
                />
              )}
              <Link onClick={handleUploadButtonClick} to="#" className="mx-3 primary-text">
              Tải ảnh lên&ensp;
              <MDBIcon fas icon="upload" />
            </Link>
            </div>
            
            <input
              type="file"
              className={`form-control  ${errors.image ? "is-invalid" : ""}`}
              id="inputImage"
              {...register("image", {
                required : " Vui lòng chọn hình ảnh"
              })}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange( e)}
            />
            {errors.image && (
              <div className="invalid-feedback">{errors.image.message}</div>
            )}
          </div>

          <div className="form-group my-4">
            <label htmlFor="description">Mô tả:</label>
            <textarea
              className={`form-control `}
              id="description"
              {...register("description")}
              style={{ height: "120px", resize: "vertical" }}
            />
          </div>
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
