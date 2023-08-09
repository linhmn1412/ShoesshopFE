import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import ListProductShop from "./ListProductShop/ListProductShop";
import Title from "../../components/Title/Title";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllProducts, getProductsBestSellers, getProductsByBrand, getProductsByPrice, getProductsNewArrivals } from "../../services/productService";
const 
Shop = () => {

    const { category, brand, price , newArrivals, bestSellers } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [allProducts, setAllProducts] = useState([]);
  

    const fetchProducts = (currentPage, setData, setTotalPages, apiFunction) => {
      apiFunction(currentPage)
        .then((data) => {
          setData(data.data);
          setTotalPages(data.last_page);
        })
        .catch((error) => {
          console.error("Error getting products:", error);
        });
    };
    const fetchProductsByFilter = (
      filter,
      currentPage,
      setData,
      setTotalPages,
      apiFunction
    ) => {
      apiFunction(filter, currentPage)
        .then((data) => {
          setData(data.data);
          setTotalPages(data.last_page);
        })
        .catch((error) => {
          console.error("Error getting products:", error);
        });
    };

    useEffect(() => {
      if (category) {
        fetchProductsByFilter(
          category,
          currentPage,
          setAllProducts,
          setTotalPages,
          getProductsByCategory
        );
      } else if (brand) {
        fetchProductsByFilter(
          brand,
          currentPage,
          setAllProducts,
          setTotalPages,
          getProductsByBrand
        );
      } else if (price) {
        fetchProductsByFilter(
          price,
          currentPage,
          setAllProducts,
          setTotalPages,
          getProductsByPrice
        );
      } else if(newArrivals) {
        fetchProducts(
          currentPage, setAllProducts, setTotalPages,
          getProductsNewArrivals
        );
      } else if(bestSellers) {
        fetchProducts(
          currentPage, setAllProducts, setTotalPages,
          getProductsBestSellers
        );
      }
      else {
        fetchProducts(currentPage, setAllProducts, setTotalPages, getAllProducts);
      }
    }, [category, brand, price, newArrivals, bestSellers ,currentPage]);
  
  
  
    return (
        <div>
             <Header/>
             <Title content={bestSellers ? 'Best Sellers' : newArrivals ? 'New Arrivals' : category ? category : brand ? brand : price ? price :'Cửa hàng'}/>
            <ListProductShop 
            products = {allProducts}
            currentPage = {currentPage}
            totalPages= {totalPages}
            onPageChange = {(page)=> setCurrentPage(page)}/>
            <Footer/>
        </div>
      );
}
 
export default Shop;