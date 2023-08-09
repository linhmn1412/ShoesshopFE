import { useEffect, useState } from "react";
import { getDiscounts } from "../../services/discountService";
import { NavLink, useLocation } from "react-router-dom";

const ListDiscount = () => {
  const [discounts, setDiscounts] = useState([]);
  const location = useLocation();
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
    <div className="primary-background">
      <div className="container py-4">
        <ul className="d-flex justify-content-center align-items-center mb-0">
          {discounts &&
            discounts.map((val) => (
              <li className=" mx-1 " key={val.id_discount}>
                <NavLink
                  to={`/sale/${val.discount_value}`}
                  className="btn btn-outline-light active-button"
                  isActive={() => location.pathname === `/sale/${val.discount_value}`}
                >
                  {val.name_discount}
                </NavLink>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ListDiscount;
