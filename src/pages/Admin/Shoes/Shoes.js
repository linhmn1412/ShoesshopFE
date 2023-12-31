import { useEffect, useState } from "react";
import Pagination from "../../../components/Pagination/Pagination";
import { BASE_URL } from "../../../services";
import { createProduct, deleteProduct, getAllProducts, getProductsAdmin, updateProduct } from "../../../services/productService";
import { formatMoney } from "../../../utils/formatMoney";
import { MDBIcon } from "mdb-react-ui-kit";
import InputSearch from "../../../components/Header/InputSearch/InputSearch";
import AddShoeModal from "./AddShoeModal";
import { getAllCategories } from "../../../services/categoryService";
import { getAllBrands } from "../../../services/brandService";
import { getAllDiscounts } from "../../../services/discountService";
import EditShoeModal from "./EditShoeModal";
import { toast } from "react-toastify";
import DeleteComfirm from "../../../components/DeleteConfirm/DeleteConfirm";

const Shoes = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allBrands, setAllBrands] = useState([]);
    const [allDiscounts, setAllDiscounts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
      const fetchData = async () => {
        try {
          const [categoriesResponse, brandsResponse, discountsResponse] = await Promise.all([
            getAllCategories(),
            getAllBrands(),
            getAllDiscounts(),
          ]);
          setAllCategories(categoriesResponse.dataTotal);
          setAllBrands(brandsResponse.dataTotal);
          setAllDiscounts(discountsResponse.dataTotal);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchData();
    },[]);
  useEffect(()=>{
   

    fetchDataProduct();
  }, [currentPage]);

  const fetchDataProduct = async () => {
    try {
      const [productsResponse] = await Promise.all([
        getProductsAdmin(currentPage),
      ]);
      setAllProducts(productsResponse.data);
      setTotalPages(productsResponse.last_page);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
    
    const getDescription = (text) => {
        if (text && text.length > 40) {
          return text.slice(0, 40) + "...";
        }
        return text;
      };

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [showModalRemove, setShowModalRemove] = useState(false);
    const [idRemove, setIdRemove] = useState(null);
    const [confirm, setConfirm] = useState('');

  const handleShowModalAdd = () => {
    setShowModalAdd(true);
  };

  const handleCloseModalAdd = () => {
    setShowModalAdd(false);
    
  };
  const handleAddProduct = (formData)=>{
    createProduct(formData)
    .then((data)=>{
        toast.success(data.message);
        fetchDataProduct();
    })
    .catch((error)=>{
      toast.error("Tao san pham that bai");
      console.log(error);
    });
  };

  const handleShowModalEdit = (data) => {
    setShowModalEdit(true);
    setEditData(data);
  };

  const handleShowModalRemove = (data) => {
    setShowModalRemove(true);
    setIdRemove(data.id_shoe);
    setConfirm(`Bạn có chắc sẽ xóa sản phẩm ${data.name_shoe} không?`)
   };

  const handleCloseModalEdit = () => {
    setShowModalEdit(false);
  };
  const handleEditProduct = (formData, id)=>{ 
  updateProduct(formData, id)
    .then((data)=>{
        toast.success(data.message);
        fetchDataProduct();
    })
    .catch((error)=>{
      toast.error("Cap nhat san pham that bai");
      console.log(error);
    });
  };

  const handleDelete = (id) =>[
    deleteProduct(id)
    .then((data)=>{
      if(data.status === 200){
    setShowModalRemove(false);
        toast.success(data.data.message);
        fetchDataProduct();
      }
      else {
        toast.error(data.data.message);
      }
    })
  ]
    return ( 
        <div className="pt-2 px-3 ">
              <h5 className="text-uppercase primary-text pt-2  px-2">Quản lý giày dép</h5>
              <div className="mb-3">
        <button
          className="btn btn-success primary-background"
          onClick={handleShowModalAdd}
        >
          Thêm sản phẩm
        </button>
        <div className="float-end mx-2 "><InputSearch/></div>
      </div>

             <table
          className="table align-middle text-center "
          width="100%"
          cellSpacing="0"
          style={{fontSize: "11px"}}
        >
          <thead>
            <tr scope="col" className=" w-100 text-uppercase" >
              <th scope="col" width="3%" className="p-1">
                Mã
              </th>
              <th scope="col" width="10%" className="p-1">
                Hình ảnh
              </th>
              <th scope="col" width="12%" className="p-1">
               Tên sản phẩm
              </th>
              <th scope="col" width="8%" className="p-1">
               Danh mục
              </th>
              <th scope="col" width="9%" className="p-1">
                Thương hiệu
              </th>
              <th scope="col" width="8%" className="p-1">
                Giá tiền
              </th>
              <th scope="col" width="8%" className="p-1">
                Khuyến mãi
              </th>
              <th scope="col" width="10%" className="p-1">
                Trạng thái
              </th>
              <th scope="col" width="5%" className="p-1">
                Kho
              </th>
              <th scope="col" width="5%" className="p-1">
                Đã bán
              </th>
              <th scope="col" width="9%" className="p-1">
                Nhân viên
              </th>
              <th scope="col" width="12%" className="p-1">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading && allProducts.length === 0 ? (
              <tr>
                <td colSpan="12" className=" fw-bold">
                  Chưa có sản phẩm nào nào!
                </td>
              </tr>
            ) : (
                allProducts &&
                allProducts.map((val) => (
                <tr key={val.id_shoe}>
                  <td className="p-2">
                    <span>{val.id_shoe}</span>
                  </td>
                  <td className="p-2">
                  <img
                      src={`${BASE_URL}/product/${val.id_shoe}/image`}
                      alt="..."
                      className="img-fluid rounded-start"
                      width="60px"
                      height="60px"
                    />
                  </td >
                  <td className="p-2">
                    <span className="fw-bold">
                      {val.name_shoe}
                    </span>
                  </td >
                  <td className="p-2">
                      {val.name_category}
                  </td>
                  <td className="p-2">{val.name_brand}</td>
                  <td className="p-2">
                    <span>{formatMoney(val.price)}</span>
                  </td>
                  <td className="p-2">
                    <span>{val.discount_value ? val.discount_value : 0 }%</span>
                  </td>
                  <td className="p-2">
                    <span>{val.status === true ? "Hoạt động" : "Không hoạt động" }</span>
                  </td>
                  <td className="p-2">
                    <span>{val.stock ? val.stock : 0 }</span>
                  </td>
                  <td className="p-2">
                    <span>{val.sold ? val.sold : 0 }</span>
                  </td>
                  <td className="p-2">
                      {val.name_staff}
                  </td>
                  <td className="p-0">
                  <button
                      type="button"
                      className="btn btn-info mx-1 py-2 px-3"
                      title="Cập nhật"
                      onClick={()=>handleShowModalEdit(val)}
                    >
                      <MDBIcon fas icon="edit" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger py-2 px-3"
                      title="Xóa"
                      onClick={()=>handleShowModalRemove(val)}
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
        {showModalAdd && (
        <AddShoeModal
          discounts = {allDiscounts}
          categories = {allCategories}
          brands = {allBrands}
          showModal={showModalAdd}
          handleClose={handleCloseModalAdd}
          handleSubmit = {handleAddProduct}
        />
        
      )}
      {editData && (
        <EditShoeModal
          data ={editData}
          discounts = {allDiscounts}
          categories = {allCategories}
          brands = {allBrands}
          showModal={showModalEdit}
          handleClose={handleCloseModalEdit}
          handleSubmit = {handleEditProduct}
        />
      )}
      {showModalRemove && (
      <DeleteComfirm
        
        confirmContent={confirm}
        id={idRemove}
        show={showModalRemove}
        handleClose={() => setShowModalRemove(false)}
        handleRemove = {handleDelete}
      />
    )}
      </div>
     );
}
 
export default Shoes;