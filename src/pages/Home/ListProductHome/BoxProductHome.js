import ProductItem from "../../../components/ProductItem/ProductItem";
import { Link } from "react-router-dom";
const BoxProductHome = ({content,products,link}) => {

  

  return (
    <div className="mb-3">
      <div className="card mb-3 shadow-1">
        <div className="card-body">
          <center>
            <h3 className="primary-text">{content}</h3>
          </center>
        </div>
      </div>
      <div className="row mx-auto mt-4">
        <ProductItem listProducts={products} col ="col-md-3"/>
      </div>
      <center>
        <Link to={link} className="btn btn-outline-dark my-3">
          Xem thêm
        </Link>
      </center>
    </div>
  );
};

export default BoxProductHome;
