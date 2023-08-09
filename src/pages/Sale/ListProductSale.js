import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BoxProduct from "../../components/BoxProduct/BoxProduct";

const ListProductSale = ({products, currentPage, totalPages,onPageChange}) => {
    const breadcrumbItems = [
        { text: 'Home', link: '/' },
        { text: 'Sale', link: '/sale' },
      ];
    return ( 
        <div className="container mt-2">
        <Breadcrumb items={breadcrumbItems}/>
        <div className="row">
            <BoxProduct products = {products} col="col-3" currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange}/>
        </div>
      </div>
     );
}
 
export default ListProductSale;