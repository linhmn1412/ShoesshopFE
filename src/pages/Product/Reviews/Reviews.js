import Rating from "react-rating";
import Pagination from "../../../components/Pagination/Pagination";
import ReviewItem from "./ReviewItem"

const Reviews = ({reviews, avgRated,totalPages, ...rest}) => {
    return ( 

        <div>
            <h5 className="card-title mb-4 primary-text" >&ensp;Đánh giá&ensp;
            {avgRated !== null ?(
               <>
                <span className="primary-text" style={{fontSize : "14px"}}>({avgRated}/5
                <Rating
                    initialRating={avgRated}
                    emptySymbol={<i className="far fa-star color-star" />}
                    fullSymbol={<i className="fas fa-star color-star" />}
                    readonly
                    fractions={2}
                  />)</span>
                </>
            ):(<></>)}
            
            </h5>
            {reviews.length !== 0 ? (   
                <div className="p-4">
               
                {reviews && reviews.map((val,index)=>(
                    <div key={index}>
                        <ReviewItem val={val} username= {val.username} color={val.color} size={val.size}/>
                    </div>
                ))}
                
                </div>
               
            ) : (<p className="text-dark px-2">Sản phẩm chưa có đánh giá nào!</p>)}
             {totalPages > 1 ? (
            <Pagination totalPages={totalPages} {...rest} />
            ):<></>}
            </div>
     );
}
 
export default Reviews;