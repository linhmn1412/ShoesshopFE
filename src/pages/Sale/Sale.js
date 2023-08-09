import { useParams } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import BannerSale from "./BannerSale";
import ListDiscount from "./ListDiscount";
import ListProductSale from "./ListProductSale";
import { useEffect, useState } from "react";
import { getProductsSale } from "../../services/productService";

const Sale = () => {
    const { sale } = useParams();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        getProductsSale(sale, currentPage)
            .then((data) => {
                setProducts(data.data);
                setTotalPages(data.last_page);
            })
            .catch((error) => {
                console.error("Error getting products:", error);
            });

    }, [sale, currentPage]);
    return (  
        <div>
            <Header />
            <BannerSale/>
            <ListDiscount/>
            <ListProductSale
             products={products}
             currentPage ={currentPage}
             totalPages = {totalPages}
             onPageChange = {(page) => setCurrentPage(page)}
             />
            <Footer/>
        </div>
    );
}
 
export default Sale;