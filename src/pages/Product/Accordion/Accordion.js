import { formatMoney } from "../../../utils/formatMoney";

const Accordion = ({
  description,
  name,
  category,
  brand,
  discount,
  price,
  stock,
}) => {
  return (
    <div className="accordion accordion-flush" id="accordionFlushExample">
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingOne">
          <button
            className="accordion-button collapsed fw-bold primary-text"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#flush-collapseOne"
            aria-expanded="false"
            aria-controls="flush-collapseOne"
          >
            Mô tả sản phẩm
          </button>
        </h2>
        <div
          id="flush-collapseOne"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingOne"
          data-mdb-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            {description !== null ? (
              <p className="p-3">{description}</p>
            ) : (
              <p className="p-3">Sản phẩm chưa có mô tả!</p>
            )}
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingTwo">
          <button
            className="accordion-button collapsed fw-bold primary-text"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#flush-collapseTwo"
            aria-expanded="false"
            aria-controls="flush-collapseTwo"
          >
            Thông tin sản phẩm
          </button>
        </h2>
        <div
          id="flush-collapseTwo"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingTwo"
          data-mdb-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <p>
              <i className="fas fa-arrow-right-long"></i> <b>Tên sản phẩm: </b>
              {name}
            </p>
            <p>
              <i className="fas fa-arrow-right-long"></i> <b>Danh mục: </b>
              {category}
            </p>
            <p>
              <i className="fas fa-arrow-right-long"></i> <b>Thương hiệu: </b>
              {brand}
            </p>
            <p>
              <i className="fas fa-arrow-right-long"></i> <b>Giá gốc: </b>
              {formatMoney(price)}
            </p>
            <p>
              <i className="fas fa-arrow-right-long"></i> <b>Kho: </b>
              {stock}
            </p>
            {discount !== null ? (
                 <p>
                 <i className="fas fa-arrow-right-long"></i> <b>Khuyến mãi: </b>
                 {discount}%
               </p>
            ):(
                <p>
                <i className="fas fa-arrow-right-long"></i> <b>Khuyến mãi: </b>
                Chưa có khuyến mãi
              </p>
            )}
           
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header" id="flush-headingThree">
          <button
            className="accordion-button collapsed fw-bold primary-text"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#flush-collapseThree"
            aria-expanded="false"
            aria-controls="flush-collapseThree"
          >
            Chính sách đổi hàng
          </button>
        </h2>
        <div
          id="flush-collapseThree"
          className="accordion-collapse collapse"
          aria-labelledby="flush-headingThree"
          data-mdb-parent="#accordionFlushExample"
        >
          <div className="accordion-body">
            <p className="p-3">
              1. Liên hệ bộ phận CSKH qua hotline 0123.456.789 hoặc nhắn tin
              trực tiếp với tài khoản instagram @shoes.shop để được hướng dẫn
              chi tiết.
              <br />
              2. Lưu ý: Vui lòng không tự ý gửi trả sản phẩm khi chưa liên hệ bộ
              phận CSKH, Shoes Shop không chịu trách nhiệm khi xảy ra trường hợp
              mất mát hàng hoá.
              <br />
              Cảm ơn bạn đã tin chọn Shoes Shop, rất vui được giải đáp và hỗ trợ
              bạn!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
