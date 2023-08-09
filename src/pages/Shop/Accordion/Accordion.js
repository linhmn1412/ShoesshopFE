import { useEffect, useState } from "react";
import { getBrands } from "../../../services/brandService";
import { getCategories } from "../../../services/categoryService";
import { MDBAccordion, MDBAccordionItem } from "mdb-ui-kit";
import AccordionContent from "./AccordionContent";
import { Link } from "react-router-dom";
const Accordion = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const items = [
    { link:"0-1000000", text:"Dưới 1,000,000đ"},
    { link:"1000000-2000000", text:"1,000,000đ ~ 2,000,000đ"},
    {link:"2000000-3000000", text:"2,000,000đ ~ 3,000,000đ"},
    { link:"3000000-5000000", text:"3,000,000đ ~ 5,000,000đ"},
    { link:"5000000-8000000", text:"5,000,000đ ~ 8,000,000đ"}
  ]

  useEffect(() => {
    getBrands()
      .then((data) => {
        console.log(data);
        setBrands(data);
      })
      .catch((error) => {
        console.error("Error getting products:", error);
      });

    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error getting products:", error);
      });
  }, []);
  return (
  

    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Danh Mục
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-mdb-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <ul className="list-group list-group-flush">
              {categories &&
                categories.map((val,index) => (
                  <AccordionContent
                  key={index}

                    link={`/shop/category/${val.name_category}`}
                    name={val.name_category}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingTwo">
          <button
            className="accordion-button collapsed"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            Thương Hiệu
          </button>
        </h2>
        <div
          id="flush-collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-mdb-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <ul className="list-group list-group-flush">
            {brands &&
                brands.map((val,index ) => (
                  <AccordionContent
                    key={index}

                    link={`/shop/brand/${val.name_brand}`}
                    name={val.name_brand}
                  />
                ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingThree">
          <button
            className="accordion-button collapsed"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree"
          >
            Giá Tiền
          </button>
        </h2>
        <div
          id="flush-collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingThree"
          data-mdb-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <ul className="list-group list-group-flush">
              {items && items.map((val,index)=>(
                <li key={index} className="list-group-item">
                <Link to={`/shop/price/${val.link}`} className="text-dark">
                  {val.text}
                </Link>
              </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
