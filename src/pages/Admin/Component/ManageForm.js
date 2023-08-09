import { MDBIcon } from "mdb-react-ui-kit";
import Pagination from "../../../components/Pagination/Pagination";
import InputSearch from "../../../components/Header/InputSearch/InputSearch";
import AddModal from "./AddModal";
import { useState } from "react";
import EditModal from "./EditModal";

const ManageForm = ({
  name,
  loading,
  allData,
  totalPages,
  currentPage,
  onPageChange,
  columnHeaders,

}) => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);

  const [modalData, setModalData] = useState([]);
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

  const handleAddData = () => {
    // Here, you can implement the logic to add the new data (brand, category, or discount)
    // based on the modalType and the name provided
    // For example, you can update your state or make an API call to save the new data
    // After adding the data, you can update the modalData state with the new data
    // const newData = { id: modalData.length + 1, name };
    // setModalData([...modalData, newData]);
  };

  const handleEditData = () => {
   
  };
 
  const handleRemove = () => {
   
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
              <td colSpan="8" className="fw-bold">
                Chưa có dữ liệu nào!
              </td>
            </tr>
          ) : (
            allData &&
            allData.map((val,index) => (
              <tr key={index}>
               {columnHeaders.map((column,index) => (
                  <td key={index}>
                    <span className="fw-bold">{val[column.key]}</span>
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
                  <button
                    type="button"
                    className="btn btn-danger"
                    title="Xóa"
                    onClick={ handleRemove(val)}
                  >
                    <MDBIcon far icon="trash-alt" />
                  </button>
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
    </div>
  );
};

export default ManageForm;
