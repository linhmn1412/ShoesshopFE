import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/css/style.css';

export default function Footer() {
  return (
    
<footer className=" container text-center text-lg-start bg-light text-muted">
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    <div className="me-5 d-none d-lg-block">
      <span>Kết nối với chúng tôi trên các mạng xã hội:</span>
    </div>
    <div>
      <Link href="/" className="me-4 text-reset">
        <i className="fab fa-facebook-f"></i>
      </Link>
      <Link href="/" className="me-4 text-reset">
        <i className="fab fa-twitter"></i>
      </Link>
      <Link href="/" className="me-4 text-reset">
        <i className="fab fa-google"></i>
      </Link>
      <Link href="/" className="me-4 text-reset">
        <i className="fab fa-instagram"></i>
      </Link>
      <Link href="/" className="me-4 text-reset">
        <i className="fab fa-linkedin"></i>
      </Link>
      <Link href="/" className="me-4 text-reset">
        <i className="fab fa-github"></i>
      </Link>
    </div>
  </section>
  <section >
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3"></i>Shoes Shop
          </h6>
          <p>
            Cửa hàng chuyên kinh doanh các mặt hàng giày dép từ các thương hiệu nổi tiếng trên thế giới, cam đoan mang đến
            bạn trải nghiệm tốt nhất.
          </p>
        </div>


        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Danh Mục
          </h6>
          <p>
            <Link href="#!" className="text-reset">Sneaker</Link>
          </p>
          <p>
            <Link href="#!" className="text-reset">Sandal</Link>
          </p>
          <p>
            <Link href="#!" className="text-reset">Slide</Link>
          </p>
        </div>
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Chính sách
          </h6>
          <p>
            <Link href="#!" className="text-reset">Vận chuyển</Link>
          </p>
          <p>
            <Link href="#!" className="text-reset">Bảo hành</Link>
          </p>
          <p>
            <Link href="#!" className="text-reset">Thanh toán</Link>
          </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
          <p>
                        <i className="fas fa-envelope me-3"></i>
                        shoesshop@gmail.com
                    </p>
                    <p>
                        <i className="fas fa-phone me-3"></i>
                        +84 123456789
                    </p>
                    <p><i className="fas fa-home me-3"></i> Hồ Chí Minh, Việt Nam</p>
        </div>
      </div>

    </div>
  </section>



  <section className=" justify-content-center justify-content-lg-between p-4 border-top">
        <div className="text-center me-5 d-none d-lg-block">
            <span className="text-center" style={{color: "#185137"}}>© 2023<a className="primary-text" href="/">&ensp;<b>Shoes Shop</b>&ensp;</a>All Rights Reserved.
            </span>
        </div>
    </section>

</footer>
  );
}