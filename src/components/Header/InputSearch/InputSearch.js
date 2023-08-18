import {  MDBIcon,  } from 'mdb-react-ui-kit';
import React, { useState } from 'react';

const  InputSearch = ({onSearch}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm);
  };
  return (
 
    <ul className="navbar-nav ml-auto">
    <li className="nav-item dropdown no-arrow">
        <form action="/search" method="POST" className="form-inline mr-auto w-100 navbar-search">
            <div className="d-flex" style={{width: "240px"}}>
                <input className="form-control me-2" type="search" placeholder="Tìm kiếm..." aria-label="Search"
                 value={searchTerm}
                 onChange={handleSearchChange}/>
                <button className="btn btn-outline-success" type="submit"><MDBIcon fas icon="search" /></button>
            </div>
        </form>
    </li>
</ul>
  );
}

export default InputSearch;