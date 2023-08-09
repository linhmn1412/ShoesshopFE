import {getProductsBestSellers, getProductsNewArrivals} from "../../../services/productService";
import { getDiscounts } from "../../../services/discountService";
import { useEffect, useState } from "react";
import BoxProductHome from "./BoxProductHome";
const ListProductHome = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [discounts, setDiscounts] = useState([]);
  
    useEffect(() => {
      getProductsNewArrivals()
        .then((data) => {
            setNewArrivals(data.data);
        })
        .catch((error) => {
          console.error("Error getting products:", error);
        });

        getProductsBestSellers()
        .then((data) => {
          console.log(data);
            setBestSellers(data.data);
        })
        .catch((error) => {
          console.error("Error getting products:", error);
        });
  
     
    }, []);
    const firstFourNewArrivals = newArrivals.slice(0, 4);
    const firstFourBestSellers = bestSellers.slice(0, 4);
  
    return ( 
         <div className="container my-5">
            <BoxProductHome content="New Arrivals" products = {firstFourNewArrivals}  link={"/shop/newArrivals"}/>
            <BoxProductHome content="Best Sellers" products = {firstFourBestSellers}  link={"/shop/bestSellers"}/>
        </div>
     );
}
 
export default ListProductHome;