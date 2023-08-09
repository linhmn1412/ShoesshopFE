import { BASE_URL } from "../../../services";

const ProductImages = ({id, discount}) => {
    return ( 
        <div className="col-6 p-5 position-relative">
                    <img src={`${BASE_URL}/product/${id}/image_1`} alt="..." className="img-fluid rounded-start d-block w-100 rounded" />
                    <div className="row py-5">
                        <div className="col  ripple "><img src={`${BASE_URL}/product/${id}/image_1`} alt="..." className="img-fluid rounded-start rounded" /></div>
                        <div className="col  ripple mx-2"><img src={`${BASE_URL}/product/${id}/image_2`} alt="..." className="img-fluid rounded-start rounded" /></div>
                        <div className="col ripple "><img src={`${BASE_URL}/product/${id}/image_3`} alt="..." className="img-fluid rounded-start rounded" /></div>
                    </div>
                    {discount !== null ? ( 
                    <p className="position-absolute py-1 text-white rounded text-center box-discount" style={{top: '4rem',
                        right: '4rem'}} >
                         -{discount}%</p>) : <></>}
                </div>
     );
}
 
export default ProductImages;