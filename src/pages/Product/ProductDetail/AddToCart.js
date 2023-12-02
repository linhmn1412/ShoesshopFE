import { useContext, useState } from "react";
import InputQuantity from "../../../components/InputQuantity/InputQuantity";
import { useNavigate } from "react-router";
import { CartContext } from "../../../contexts/CartContext";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MDBIcon } from "mdb-react-ui-kit";

const AddToCart = ({ data, variants }) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quantityStock, setQuantityStock] = useState(data.stock);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { createOrUpdateCartItem } = useContext(CartContext);
  const availableColors = data.colors.split(",");
  const availableSizes = data.sizes.split(",");

  const handleQuantityChange = (id, quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
    updateStockQuantity(selectedSize, color);
    // if selected size not exist with this color, reset size
    if (
      !variants.find(
        (variant) => variant.color === color && variant.size === selectedSize
      )
    ) {
      setSelectedSize("");
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    updateStockQuantity(size, selectedColor);
  };

  const updateStockQuantity = (size, color) => {
    const variant = variants.find(
      (variant) => variant.size === size && variant.color === color
    );
    if (variant) {
      setQuantityStock(variant.quantity_stock);
    } else {
      setQuantityStock(data.stock);
    }
  };

  const handleAddToCart = () => {
    // Find the variant based on the selected size and color
    const selectedVariant = variants.find(
      (variant) =>
        variant.size === selectedSize && variant.color === selectedColor
    );
    console.log(selectedVariant, selectedQuantity);
    createOrUpdateCartItem(selectedVariant, selectedQuantity);
  };

  // if(selectedSize && selectedColor){
  //   const selectedVariant = variants.find(
  //     (variant) => variant.size === selectedSize && variant.color === selectedColor
  //   );
  //   setSelectedProducts(selectedVariant.id_variant);
  // }
  return (
    <>
      <div className="row align-items-center mb-4">
        <p className="col-3 mb-2 primary-text ">Chọn màu:</p>
        <div className="col-9 d-flex justify-content-start align-items-center">
          {availableColors.map((color, index) => (
            <button
              key={index}
              className={` fs-6  mx-1 text-capitalize 
          ${
            selectedColor === color
              ? "btn btn-outline-primary"
              : "btn btn-link border border-1 primary-text"
          }`}
              onClick={() => handleColorClick(color)}
              disabled={!variants.some((variant) => variant.color === color)}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      <div className="row align-items-center mb-4">
        <p className="col-3 mb-2 primary-text ">Chọn size:</p>
        <div className="col-9 d-flex justify-content-start align-items-center">
          {availableSizes.map((size, index) => (
            <button
              key={index}
              className={` fs-6  mx-1 text-capitalize 
          ${
            selectedSize === size
              ? "btn btn-outline-primary"
              : "btn btn-link border border-1 primary-text"
          }`}
              onClick={() => handleSizeClick(size)}
              disabled={
                !variants.some(
                  (variant) =>
                    variant.color === selectedColor && variant.size === size
                )
              }
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="row align-items-center mb-4">
        <p className="col-3 mb-2 primary-text ">Số lượng:</p>
        <div className="col-9 d-flex align-items-center">
          <InputQuantity
            id={data.id_shoe}
            max={quantityStock}
            value={selectedQuantity}
            onChangeInput={handleQuantityChange}
          />
          &ensp;
          <span className="text-muted" style={{ fontSize: "13px" }}>
            ({quantityStock} sản phẩm có sẵn)
          </span>
        </div>
      </div>

      <div className="d-grid gap-2 mb-3">
        {Number(data.stock) !== 0 ? (
          <>
            <button
              className="btn btn-link border border-1 fs-6 text-start primary-text"
              type="button"
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor || quantityStock <= 0}
            >
              <span>Thêm vào giỏ hàng</span>
              <span className="float-end">
                <MDBIcon fas icon="shopping-cart" />
              </span>
            </button>
            <button
              className="btn btn-success fs-6 d-flex justify-content-between align-items-center primary-background"
              type="button"
              disabled={!selectedSize || !selectedColor || quantityStock <= 0}
            >
              Mua Ngay
            </button>
          </>
        ) : (
          <button
            className="btn btn-success fs-6 d-flex justify-content-between align-items-center primary-background disabled "
            type="button"
          >
            <span>Sản phẩm hết hàng</span>
          </button>
        )}
      </div>
    </>
  );
};

export default AddToCart;
