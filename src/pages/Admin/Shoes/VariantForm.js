import { MDBIcon } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";

const VariantForm = ({
  icon,
  title,
  data,
  show,
  handleClose,
  handleAdd,
  handleEdit,
}) => {
    const [idVariant, setIdVariant] = useState(null);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState('');
  useEffect(() => {
    if (data) {
    setIdVariant(data.id_variant)
      setColor(data.color);
      setSize(data.size);
      setQuantity(data.quantity_stock);
    }
  }, [data]);

  const onSubmitAdd = () =>{
    const dataAdd = {
        color : color,
        size : size,
        quantity_stock : Number(quantity),
    }
    handleAdd(dataAdd);
    handleClose();
  };
  const onSubmitEdit = () =>{
    const dataEdit = {
        id_variant : idVariant,
        quantity_stock : Number(quantity),
    }
    handleEdit(dataEdit);
    handleClose();
  }
  return (
    <div
      className={`modal bg-none shadow-5 fade${
        show ? " show fullscreen-overlay" : ""
      }`}
      id="orderDetailsModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="orderDetailsModalLabel"
      style={{ display: show ? "block" : "none" }}
    >
      <div className="modal-dialog modal-dialog-scrollable" role="document">
        <div className="modal-content">
          <div className="modal-header primary-background text-white">
            <h5
              className="modal-title text-uppercase"
              id="orderDetailsModalLabel"
            >
              <MDBIcon far icon={icon} />
              &ensp;{title}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body p-4 primary-text fw-bold">
            <div className="row mb-3">
              {data ? (
                <>
                  <div className="col-3 ">Màu:&ensp;{color} </div>
                  <div className="col-3 ">Size:&ensp;{size} </div>
                  <div class="col-6 ">Số lượng tồn:
                    <input
                      type="text"
                      class="form-control rounded"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
          <div className="modal-footer">
            {data ? (
              <button
                type="submit"
                className="btn btn-success primary-background"
                onClick={onSubmitEdit}
              >
                Chỉnh sửa
              </button>
            ) : (
              <button
                type="submit"
                className="btn  btn-success primary-background"
                onClick={onSubmitAdd}
              >
                Thêm
              </button>
            )}

            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantForm;
