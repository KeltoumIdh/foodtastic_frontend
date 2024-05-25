import React from "react";
import { Link } from "react-router-dom";


const ProductElement = ({ id, title, image, rating, price, brandName }) => {

  return (
    <div className="max-w-2xl">
      <div className="shadow-md rounded-lg max-w-sm bg-base-100">
        <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            className="rounded-t-lg h-64 w-full"
            src={`${image}`}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
            <h3 className="font-semibold text-xl tracking-tight mt-2 mb-5 text-accent-content">
              {title}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-accent-content">MAD {price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductElement;
