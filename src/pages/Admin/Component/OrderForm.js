import React from "react";
import { formatTime } from "../../../utils/formatTime";
import { formatMoney } from "../../../utils/formatMoney";
import Pagination from "../../../components/Pagination/Pagination";
import OrderDetailModal from "./OrderDetailModal";
import InputSearch from "../../../components/Header/InputSearch/InputSearch";

const OrderForm = ({
  title,
  data,
  currentPage,
  totalPages,
  onPageChange,
  loading,
  handleShowModal,
  selectedOrder,
  checkConfirm,
  ...rest
}) => {
  return (
    <div className="p-3 ">
      <h5 className="text-uppercase primary-text mb-0 ">{title}</h5>
      <div className="float-end mx-2 mb-3"><InputSearch/></div>
      <table className="table align-middle text-center" width="100%" cellSpacing="0" style={{fontSize: "11px"}}>
        <thead>
          <tr scope="col" className="w-100 text-uppercase primary-text">
            <th scope="col" width="5%" className="p-1">
              Mã
            </th>
            <th scope="col" width="10%" className="p-1">
              Khách hàng
            </th>
            <th scope="col" width="12%" className="p-1">
              Địa chỉ
            </th>
            <th scope="col" width="10%" className="p-1">
              Số điện thoại
            </th>
            <th scope="col" width="13%" className="p-1">
              Ngày đặt
            </th>
            {checkConfirm ? (
                 <th scope="col" width="10%" className="p-1">
                 Ghi chú
               </th>
            ) : (
                <th scope="col" width="10%" className="p-1">
                Nhân viên duyệt
              </th>
            )}
           
            <th scope="col" width="10%" className="p-1">
              Tổng tiền
            </th>
            <th scope="col" width="10%" className="p-1">
              Trạng thái
            </th>
            <th scope="col" width="10%" className="p-1">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading && data.length === 0 ? (
            <tr>
              <td colSpan="8" className="fw-bold">
                Chưa có dữ liệu!
              </td>
            </tr>
          ) : (
            data &&
            data.map((val) => (
              <tr key={val.id_order}>
                <td>
                  <span>{val.id_order}</span>
                </td>
                <td>
                  <span className="fw-bold">{val.name_buyer}</span>
                </td>
                <td>{val.address}</td>
                <td>{val.phone_number}</td>
                <td>{formatTime(val.created_at)}</td>
                {checkConfirm ? (
                <td>{val.note}</td>
                ): (
                <td>{val.fullname}</td>
                )}
                <td>{formatMoney(val.total)}</td>
                <td>{val.status}</td>
                <td className="p-0">
                  <button
                    type="button"
                    className="btn btn-success primary-background text-white p-2"
                    onClick={() => handleShowModal(val.id_order, val)}
                  >
                    Xem đơn hàng
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
          onPageChange={onPageChange}
        />
      ) : (
        <></>
      )}
      {selectedOrder && (
        <OrderDetailModal     
        selectedOrder={selectedOrder}
        checkConfirm ={checkConfirm}
          {...rest}
        />
      )}
    </div>
  );
};

export default OrderForm;
