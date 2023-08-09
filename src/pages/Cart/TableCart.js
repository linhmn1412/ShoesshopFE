import { BASE_URL } from "../../services";
import InputQuantity from "../../components/InputQuantity/InputQuantity";
import { formatMoney } from "../../utils/formatMoney";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { useContext, useState } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import Pagination from "../../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { CartContext } from "../../contexts/CartContext";
import ButtonsCart from "./ButtonsCart";
const TableCart = () => {
  const {
    cartItems,
    totalPages,
    currentPage,
    setCurrentPage,
    updateCartItem,
    removeCartItem,
  } = useContext(CartContext);
  const breadcrumbItems = [
    { text: "Trang Chủ", link: "/" },
    { text: "Giỏ hàng", link: "/cart" },
  ];
  //console.log("cartItems", cartItems);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const handleQuantityChange = (id, newQuantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  };
  const handleUpdateCartItem = (id) => {
    if (selectedQuantities[id]) {
      updateCartItem(id, selectedQuantities[id]);
    }
  };

  const handleRemoveCartItem = (id) => {
    removeCartItem(id);
  };

  const handleSelectProduct = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((productId) => productId !== id)
        : [...prevSelected, id]
    );
  };
  const handleSelectAll = () => {
    setAllChecked(!allChecked);
    setSelectedProducts(allChecked ? [] : cartItems.map((item) => item.id_variant));
  };
  return (
    <div className="container">
      <Breadcrumb items={breadcrumbItems} />
      <div className="table-responsive">
        <table
          className="table align-middle text-center"
          width="100%"
          cellSpacing="0"
        >
          <thead>
            <tr scope="col" className=" w-100">
              <th scope="col" width="5%">
              <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={allChecked}
                        onChange={handleSelectAll}
                      />
              </th>
              <th scope="col" width="10%">
                Hình ảnh
              </th>
              <th scope="col" width="20%">
                Tên sản phẩm
              </th>
              <th scope="col" width="10%">
                Đơn giá
              </th>
              <th scope="col" width="10%">
                Khuyến mãi
              </th>
              <th scope="col" width="15%">
                Số lượng
              </th>
              <th scope="col" width="10%">
                Thành tiền
              </th>
              <th scope="col" width="20%">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="8" className=" fw-bold">
                  Chưa có sản phẩm nào trong giỏ hàng!
                </td>
              </tr>
            ) : (
              cartItems &&
              cartItems.map((val, index) => (
                <tr key={index}>
                  <td>
                    <div className="form-check info">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={selectedProducts.includes(val.id_variant)}
                        onChange={() => handleSelectProduct(val.id_variant)}
                      />
                    </div>
                  </td>
                  <td>
                    <img
                      src={`${BASE_URL}/product/${val.id_shoe}/image`}
                      alt="..."
                      className="img-fluid rounded-start"
                      width="80px"
                      height="80px"
                    />
                  </td>
                  <td>
                    <Link
                      to={`/product/${val.id_shoe}`}
                      className="primary-text fw-bold"
                    >
                      {val.name_shoe}
                    </Link>
                    <p className="text-muted" style={{ fontSize: "13px" }}>
                      Phân loại: {val.color}, {val.size}
                    </p>
                  </td>
                  <td>{formatMoney(val.price)}</td>
                  <td>{val.discount_value ? val.discount_value : 0}%</td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-link primary-text border border-1 px-3"
                        disabled={val.quantity <= 1}
                        onClick={() =>
                          handleQuantityChange(
                            val.id_variant,
                            selectedQuantities[val.id_variant] - 1 ||
                              val.quantity - 1
                          )
                        }
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <div
                        className="form-outline border border-1 mx-1"
                        style={{ width: "50px" }}
                      >
                        <input
                          type="number"
                          className="form-control text-center primary-text"
                          value={
                            selectedQuantities[val.id_variant] !== undefined
                              ? selectedQuantities[val.id_variant]
                              : val.quantity
                          }
                          min={1}
                          max={val.quantity_stock}
                          onChange={(e) =>
                            handleQuantityChange(
                              val.id_variant,
                              parseInt(e.target.value, 10)
                            )
                          }
                        />
                      </div>
                      <button
                        className="btn btn-link primary-text border border-1 px-3"
                        disabled={val.quantity >= val.quantity_stock}
                        onClick={() =>
                          handleQuantityChange(
                            val.id_variant,
                            selectedQuantities[val.id_variant] + 1 ||
                              val.quantity + 1
                          )
                        }
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>
                  <td>
                    {formatMoney(
                      (val.price - val.price * val.discount_value * 0.01) *
                        val.quantity
                    )}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-info mx-1"
                      title="Chỉnh sửa"
                      onClick={() => handleUpdateCartItem(val.id_variant)}
                    >
                      <MDBIcon fas icon="edit" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      title="Xóa"
                      onClick={() => handleRemoveCartItem(val.id_variant)}
                    >
                      <MDBIcon far icon="trash-alt" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        ) : (
          <></>
        )}
      </div>
      <ButtonsCart selectedProducts={selectedProducts} />
    </div>
  );
};

export default TableCart;
