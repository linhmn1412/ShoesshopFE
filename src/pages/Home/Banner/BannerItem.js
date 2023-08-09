import { MDBIcon } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const BannerItem = ({link, img, content}) => {
    return ( 
        <div className="col-md p-3">
            <Link to={link}>
            <div className="bg-image hover-zoom">
                    <img src={img} alt="" className="w-100 h-auto rounded-top"/>
                </div>
                <div className="d-flex justify-content-between align-items-center py-4 px-5 fw-bold fs-4 rounded-bottom primary-background text-white">
                    <span>{content}</span>
                    <MDBIcon fas icon="arrow-right" />
                </div>
            </Link>
        </div>
     );
}
 
export default BannerItem;