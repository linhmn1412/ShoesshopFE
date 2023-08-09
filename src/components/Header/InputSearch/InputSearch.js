import {  MDBIcon,  } from 'mdb-react-ui-kit';
import React from 'react';

const  InputSearch = () => {
  return (
 
    <ul className="navbar-nav ml-auto">
    <li className="nav-item dropdown no-arrow">
        <form action="/search" method="POST" className="form-inline mr-auto w-100 navbar-search">
            <div className="d-flex" style={{width: "240px"}}>
                <input className="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit"><MDBIcon fas icon="search" /></button>
            </div>
        </form>
    </li>
</ul>
  );
}

export default InputSearch;