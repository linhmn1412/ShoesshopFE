import Rating from "react-rating";
import imageUser from "../../../assets/images/user.jpg";
import { formatTime } from "../../../utils/formatTime";
const ReviewItem = ({val, username, color, size}) => {
    return ( 
        <>

            <div  className="row m-2">
            <div className="col-1 p-0">
                <center><img className="w-100" height="60" src={imageUser}/></center>
            </div>
            <div className="col-9">
                <p className="mb-0 fw-bold primary-text">{username}</p>
                <Rating
            initialRating={val.rated}
            emptySymbol={<i className="far fa-star color-star" />}
            fullSymbol={<i className="fas fa-star color-star" />}
            readonly
            fractions={2}
          />
          <p className="mb-1" style={{fontSize: "13px"}}>Phân loại: <span>{color}</span> - <span>{size}</span></p>
                
                <p className="m-0" style={{fontSize: "12px"}}>{formatTime(val.updated_at)}</p>
                <p className="my-2">{val.comment}</p>
            </div>
            <hr/>
        </div>
        </>
       
     );
}
 
export default ReviewItem;