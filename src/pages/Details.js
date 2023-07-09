import React from 'react';
import { Link } from 'react-router-dom';

const Details = ({ product, isLoading }) => {
  return (
    <>
      <ul style={{ display: 'flex', justifyContent: "center" }}>
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-circle"></div>
          </div>
        ) : (
          <li className="cards_item">
            <div className="card">
              <div className="card_image">
                <img className='productImg' src={product?.image} alt='productImage' />
              </div>
              <div className="card_content">
                <h3 className="card_title mb-2"><span className="span-desc">title:</span> {product?.title}</h3>
                <p className="card_text"><span className="span-desc">category:</span> {product?.category}</p>
                <p className="card_text"><span className="span-desc">description:</span> {product?.description}</p>
                <div className="d-flex justify-content-between">
                  <p className="card_text"><span className="span-desc">rating:</span> {product?.rating?.rate || "Not sold yet"}</p>
                  <p className="card_text"><span className="span-desc">count:</span> {product?.rating?.count}{product?.count}</p>
                </div>
                <p className="card_text"><span className="span-desc">price:</span> {product?.price} $</p>
                <div className='links'>
                  <Link to='/' className="btn card_btn">Return Home</Link>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </>
  );
}

export default Details;
