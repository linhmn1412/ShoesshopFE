import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Accordion from "../Accordion/Accordion";
import BoxProduct from "../../../components/BoxProduct/BoxProduct";


const ListProductShop = ({...rest}) => {
    const breadcrumbItems = [
        { text: 'Trang Chủ', link: '/' },
        { text: 'Cửa Hàng', link: '/shop' },
      ];
    

    return ( 
      <div className="container">
        <Breadcrumb items={breadcrumbItems}/>
        <div className="row">
            <div className="col-3">
                <Accordion/>
            </div>
            <div className="col-9">
              <BoxProduct col="col-4" {...rest}/>
            </div>

        </div>
      </div>
     );
}
 
export default ListProductShop;