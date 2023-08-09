import React from 'react';

const Breadcrumb = ({ items }) => {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        { items && items.map((item, index) => (
          <li className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`} key={index}>
            {index !== items.length - 1 ? (
              <a href={item.link} className="primary-text">{item.text}</a>
            ) : (
              <span >{item.text}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;