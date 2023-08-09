import { useState } from "react";
import { useForm } from "react-hook-form";

const EditShoeForm = ({
    data,
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

  const onSubmit = (data) => {
    // Call the handleSubmit function with the new product data
    handleSubmit(data);

    // Clear the form fields
    reset();

    // Close the modal  
    handleClose();
  };

  const handleFileChange = (fieldName, event) => {
    const selectedFile = event.target.files[0];
    setValue(fieldName, selectedFile); // Sử dụng hàm setValue từ useForm để cập nhật giá trị
    const defaultValue = data[fieldName]; // data là giá trị được truyền từ props
    if (!selectedFile && defaultValue) {
      setValue(fieldName, defaultValue);
    }
  };
  return (
    <form onSubmit={handleFormSubmit(onSubmit)}>
      <div className="row p-3 primary-text fw-bold">
        <div className="col-7 px-3 ">
        <p className="primary-text fw-bold mb-1">Mã sản phẩm: {data.id_shoe}</p>
        <p className="text-muted" style={{fontSize:"12px"}}>Nhân viên cập nhật gần nhất:&ensp;<span className="primary-text fw-bold">{data.name_staff}</span> </p>
          <div className="form-group mb-3 ">
            <label htmlFor="name">Tên sản phẩm:</label>
            <input
                defaultValue={data.name_shoe}
              type="text"
              className={`form-control mt-2  ${errors.name ? "is-invalid" : ""}`}
              id="name"
              {...register("name", { required: "Vui lòng nhập tên sản phẩm" })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="category">Danh mục:</label>
            <select
                defaultValue={data.id_category}
              className={`form-control mt-2 ${errors.category ? "is-invalid" : ""}`}
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
              <div className="invalid-feedback">{errors.category.message}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="brand">Thương hiệu:</label>
            <select
                defaultValue={data.id_brand}
              className={`form-control mt-2 ${errors.brand ? "is-invalid" : ""}`}
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
              <div className="invalid-feedback">{errors.brand.message}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="discount">Khuyến mãi:</label>
            <select
                defaultValue={data.id_discount}
              className={`form-control mt-2 ${errors.discount ? "is-invalid" : ""}`}
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
          <div className="form-group mb-3">
            <label htmlFor="price">Giá tiền:</label>
            <input
                defaultValue={data.price}
              type="number"
              className={`form-control mt-2 ${errors.price ? "is-invalid" : ""}`}
              id="price"
              {...register("price", {
                required: "Vui lòng nhập giá sản phẩm",
                min: 0,
              })}
            />
            {errors.price && (
              <div className="invalid-feedback">{errors.price.message}</div>
            )}
          </div>
        </div>

        <div className="col-5 px-3">
          <div className="form-group mb-3">
            <label htmlFor="image">Hình ảnh:</label>
            <input
              type="file"
              className={`form-control mt-2 ${errors.image ? "is-invalid" : ""}`}
              id="image"
              {...register("image", { required: "Vui lòng chọn hình ảnh" })}
              onChange={(e) => handleFileChange("image", e)}
            />
            {errors.image && (
              <div className="invalid-feedback">{errors.image.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả:</label>
            <textarea

                defaultValue={data.description}
              className={`form-control mt-2 ${
                errors.description ? "is-invalid" : ""
              }`}
              id="description"
              {...register("description")}
              style={{ height: "185px", resize: "vertical" }}
            />
          </div>
        </div>
      </div>

      <div className="modal-footer">
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

export default EditShoeForm;
