import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import { useEffect, useState } from "react";
import { getProductDetail } from "../../../services/productService";
import ProductImages from "./ProductImages";
import ProductInfor from "./ProductInfo";
import Reviews from "../Reviews/Reviews";
import { getReviewsProduct } from "../../../services/reviewService";
import BoxProductHome from "../../Home/ListProductHome/BoxProductHome";
import { getDiscounts } from "../../../services/discountService";

const ProductDetail = () => {
  const [data, setData] = useState({});
  const [variants, setVariants] = useState([]);
  const [similars, setSimilars] = useState([]);
  const [discounts, setDiscounts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [avgRated, setAvgRated] = useState(0.0);

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(()=>{
    getDiscounts()
      .then((data) => {
        setDiscounts(data);
      })
      .catch((error) => {
        console.error("Error getting discount:", error);
      });
  },[]);

  useEffect(()=>{
    getProductDetail(id)
    .then((data) => {
      setData(data.data);
      setVariants(data.variants);
      setSimilars(data.similarShoes);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
  },[id]);
  useEffect(() => {
   
    getReviewsProduct(id, currentPage)
      .then((data) => {
        setReviews(data.reviews.data);
        setTotalPages(data.reviews.last_page);
        setAvgRated(data.avgRated);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ currentPage]);

  if (loading) {
    return <div style={{ height: "100vh" }}></div>;
  }

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const firstFourSimilar = similars.slice(0, 4);

  const breadcrumbItems = [
    { text: "Trang Chủ", link: "/" },
    { text: "Cửa Hàng", link: "/shop" },
    { text: `${data.name_shoe}`, link: `/product/${id}` },
  ];

  return (
    <div className="container ">
      <div className="pt-3">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="card mb-3">
        <div className="row">
          <ProductImages id={data.id_shoe} discount={data.discount_value} />
          <ProductInfor
            data={data}
            variants={variants}
            reviews={reviews}
            avgRated={avgRated}
          />
        </div>
        <Reviews
          reviews={reviews}
          avgRated={avgRated}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="mt-5">
        <BoxProductHome
          content="Sản Phẩm Tương Tự"
          products={firstFourSimilar}
          discounts={discounts}
          link={"/shop"}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
