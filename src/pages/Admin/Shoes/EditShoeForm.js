import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BASE_URL } from "../../../services";
import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

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
  const [defaultImage, setDefaultImage] = useState("");

  useEffect(() => {
    setDefaultImage(`${BASE_URL}/product/${data.id_shoe}/image`);
  }, [data]);

  const onSubmit = (data) => {
    // Call the handleSubmit function with the new product data
    handleSubmit(data);

    // Clear the form fields
    reset();

    // Close the modal
    handleClose();
  };

  const handleFileChange = (fieldName, event) => {
    // const selectedFile = event.target.files[0];
    // setValue(fieldName, selectedFile); // Sử dụng hàm setValue từ useForm để cập nhật giá trị
    // const defaultValue = data[fieldName]; // data là giá trị được truyền từ props
    // if (!selectedFile && defaultValue) {
    //   setValue(fieldName, defaultValue);
    // }
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setDefaultImage(imageUrl);
    }
  };
  const handleUploadButtonClick = () => {
    // Triggers click event on the hidden input element
    document.getElementById("inputImage").click();
  };
  return (
    <form onSubmit={handleFormSubmit(onSubmit)}>
      <div className="row p-3 primary-text fw-bold">
        <div className="col-7 px-3 ">
          <p className="primary-text fw-bold mb-1">
            Mã sản phẩm: {data.id_shoe}
          </p>
          <p className="text-muted" style={{ fontSize: "12px" }}>
            Nhân viên cập nhật gần nhất:&ensp;
            <span className="primary-text fw-bold">{data.name_staff}</span>{" "}
          </p>
          <div className="form-group my-4 ">
            <label htmlFor="name">Tên sản phẩm:</label>
            <input
              defaultValue={data.name_shoe}
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              {...register("name", { required: "Vui lòng nhập tên sản phẩm" })}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name.message}</div>
            )}
          </div>

          <div className="form-group my-4">
            <label htmlFor="category">Danh mục:</label>
            <select
              defaultValue={data.id_category}
              className={`form-control  ${errors.category ? "is-invalid" : ""}`}
              id="category"
              {...register("category", { required: "Vui lòng chọn danh mục" })}
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
            {errors.category && (
              <div className="invalid-feedback">{errors.category.message}</div>
            )}
          </div>

          <div className="form-group my-4">
            <label htmlFor="brand">Thương hiệu:</label>
            <select
              defaultValue={data.id_brand}
              className={`form-control ${errors.brand ? "is-invalid" : ""}`}
              id="brand"
              {...register("brand", { required: "Vui lòng chọn thương hiệu" })}
            >
              <option value="">-- Chọn thương hiệu --</option>
              {brands &&
                brands.map((brand) => (
                  <option key={brand.id_brand} value={brand.id_brand}>
                    {brand.name_brand}
                  </option>
                ))}
            </select>
            {errors.brand && (
              <div className="invalid-feedback">{errors.brand.message}</div>
            )}
          </div>

          <div className="form-group my-4">
            <label htmlFor="discount">Khuyến mãi:</label>
            <select
              defaultValue={data.id_discount}
              className={`form-control ${errors.discount ? "is-invalid" : ""}`}
              id="discount"
              {...register("discount")}
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
          <div className="form-group my-4">
            <label htmlFor="price">Giá tiền:</label>
            <input
              defaultValue={data.price}
              type="number"
              className={`form-control  ${errors.price ? "is-invalid" : ""}`}
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
          <div className="form-group mb-4" style={{ marginTop: "70px" }}>
          <label htmlFor="image">Hình ảnh:</label>
            <div className=" d-flex align-items-center">
              {defaultImage && (
                <img
                className="p-3 card mt-2"
                  src={defaultImage}
                  alt=""
                  style={{ maxWidth: "100%", height: "200px" }}
                />
              )}
              <Link onClick={handleUploadButtonClick} to="#" className="mx-3">
              Tải ảnh lên&ensp;
              <MDBIcon fas icon="upload" />
            </Link>
            </div>
            
            <input
              type="file"
              className={`form-control  ${errors.image ? "is-invalid" : ""}`}
              id="inputImage"
              {...register("image", { required: "Vui lòng chọn hình ảnh" })}
              style={{ display: "none" }}
              onChange={(e) => handleFileChange("image", e)}
            />
            {errors.image && (
              <div className="invalid-feedback">{errors.image.message}</div>
            )}
          </div>

          <div className="form-group my-4">
            <label htmlFor="description">Mô tả:</label>
            <textarea
              defaultValue={data.description}
              className={`form-control `}
              id="description"
              {...register("description")}
              style={{ height: "120px", resize: "vertical" }}
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
