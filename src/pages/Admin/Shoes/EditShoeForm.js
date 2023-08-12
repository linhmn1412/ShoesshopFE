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
  const [defaultImage, setDefaultImage] = useState("");
  const [valueImage, setValueImage] = useState("");
  const [initialData, setInitialData] = useState({});
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
      image : null
    });
  }, [data.id_shoe]);

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
    setInitialData({});
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
  if (!initialData.id_shoe) return <></>;
  return (
    <>
      <div className="modal-body">
        <div className="row p-3 primary-text fw-bold">
          <div className="col-7 px-3 ">
            <p className="primary-text fw-bold mb-1">
              Mã sản phẩm: {initialData.id_shoe}
            </p>
            <p className="text-muted" style={{ fontSize: "12px" }}>
              Nhân viên cập nhật gần nhất:&ensp;
              <span className="primary-text fw-bold">
                {initialData.name_staff}
              </span>{" "}
            </p>
            <div className="form-group my-4 ">
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

            <div className="form-group my-4">
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

            <div className="form-group my-4">
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

            <div className="form-group my-4">
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
            <div className="form-group my-4">
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
                className={`form-control`}
                id="inputImage"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e)}
              />
            </div>

            <div className="form-group my-4">
              <label htmlFor="description">Mô tả:</label>
              <textarea
                onChange={(e) => {
                  setInitialData({
                    ...initialData,
                    description: e.target.value,
                  });
                }}
                value={initialData.description}
                className={`form-control `}
                id="description"
                style={{ height: "120px", resize: "vertical" }}
              />
            </div>
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
        <button
          className="btn btn-success primary-background"
          onClick={onSubmit}
        >
          Lưu
        </button>
      </div>
    </>
  );
};

export default EditShoeForm;
