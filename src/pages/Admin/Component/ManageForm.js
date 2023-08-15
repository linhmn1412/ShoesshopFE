import { MDBIcon } from "mdb-react-ui-kit";
import Pagination from "../../../components/Pagination/Pagination";
import InputSearch from "../../../components/Header/InputSearch/InputSearch";
import AddModal from "./AddModal";
import { useState } from "react";
import EditModal from "./EditModal";
import { formatMoney } from "../../../utils/formatMoney";
import DeleteComfirm from "../../../components/DeleteConfirm/DeleteConfirm";

const ManageForm = ({
  name,
  loading,
  allData,
  totalPages,
  currentPage,
  onPageChange,
  columnHeaders,
  handleAddData,
  handleEditData,
  handleRemoveData
}) => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);
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

  const handleShowModalEdit= (data) => {
    setShowModalEdit(true);
    setDataEdit(data);
  };

  const handleShowModalRemove= (data) => {
    setShowModalRemove(true);
    setIdRemove(data.id_discount || data.id_category || data.id_brand );
    setConfirm(`Bạn có chắc muốn xóa ${name} ${data.name_discount || data.name_brand || data.name_category  || '' }`)
  };
  const handleCloseModalRemove = () => {
    setShowModalRemove(false);
  };


  return (
    <div className="p-4">
      <h4 className="text-uppercase primary-text pt-4 pb-2">Quản lý {name}</h4>
      <div className="mb-4">
        <button
          className="btn btn-success primary-background"
          onClick={handleShowModalAdd}
        >
          Thêm {name}
        </button>
        <div className="float-end mx-2 "><InputSearch/></div>
      </div>

      <table
        className="table align-middle text-center"
        width="100%"
        cellSpacing="0"
      >
        <thead>
          <tr
            scope="col"
            className="w-100 text-uppercase"
            style={{ fontSize: "13px" }}
          >
            {columnHeaders.map((header,index) => (
              <th key={index} scope="col" width={header.width} className="p-1">
                {header.title}
              </th>
            ))}
             <th scope="col" width="20%" className="p-1">
              Thao tác
            </th>
          </tr>
        </thead>
        <tbody>
          {!loading && allData.length === 0 ? (
            <tr>
              <td colSpan={columnHeaders.length} className="fw-bold">
                Chưa có dữ liệu nào!
              </td>
            </tr>
          ) : (
            allData &&
            allData.map((val,index) => (
              <tr key={index}>
               {columnHeaders.map((column,index) => (
                  <td key={index}>
                    {column.key === 'status' && <span>{val[column.key] === 0 ? "Đã nghỉ" : "Hoạt động"}</span> ||
                    column.key === 'salary' && <span>{formatMoney(val[column.key]) }</span> ||
                    column.key === "fullname" && <span className="fw-bold">{val[column.key]}</span>  ||
                     column.key === "name_category" && <span className="fw-bold">{val[column.key]}</span> ||
                     column.key === "brand" && <span className="fw-bold">{val[column.key]}</span> ||
                     column.key === "name_discount" && <span className="fw-bold">{val[column.key]}</span> ||
                     column.key === "discount_value" && <span>{val[column.key]}%</span> ||
                    <span>{val[column.key]}</span> }
                  </td>
                ))}
                <td className="p-0">
                  <button
                    type="button"
                    className="btn btn-info mx-1"
                    title="Chỉnh sửa"
                    onClick={()=>handleShowModalEdit(val)}
                  >
                    <MDBIcon fas icon="edit" />
                  </button>
                  {name !== 'nhân viên' && (
                     <button
                     type="button"
                     className="btn btn-danger"
                     title="Xóa"
                     onClick={()=> handleShowModalRemove(val)}
                   >
                     <MDBIcon far icon="trash-alt" />
                   </button>
                  )}
                 
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
      {showModalAdd && (
      <AddModal
        title={name}
        show={showModalAdd}
        handleClose={handleCloseModalAdd}
        handleSubmit={handleAddData}
      />
    )}
    {showModalEdit && (
      <EditModal
        title={name}
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
    </div>
  );
};

export default ManageForm;
