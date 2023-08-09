import { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { getDiscounts } from "../../services/discountService";
import ProductItem from "../ProductItem/ProductItem";

const BoxProduct = ({ col, products , totalPages ,...rest}) => {
    const [discounts, setDiscounts]= useState([]);
    useEffect(() => {
        getDiscounts()
        .then((data) => {
          setDiscounts(data);
        })
        .catch((error) => {
          console.error("Error getting discount:", error);
        });
      }, []);
    return ( 
        <div className="row mb-3">
              
            <ProductItem listProducts={products} listDiscounts={discounts} col ={col}/>

            {totalPages > 1 ? (
            <Pagination totalPages={totalPages} {...rest} />
            ):<></>}
            </div>
     );
}
 
export default BoxProduct;