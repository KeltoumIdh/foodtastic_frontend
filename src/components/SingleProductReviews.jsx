import React, { useEffect, useState } from "react";
import SingleReview from "./SingleReview";
import RatingPercentage from "./RatingPercentage";
import { nanoid } from "nanoid";
import ProductElement from "./ProductElement";
import { isNull } from "../lib/utils";
import axios from "../lib/axios";

const SingleProductReviews = ({ rating, productData }) => {
  console.log("productData", productData);

  const [products, setProducts] = useState([]);
  console.log("city", productData?.city_id);
  console.log("category", productData?.city_id);
  useEffect(() => {
    const fetchProductsByCateg = async () => {
      try {
        const response = await axios.get(`/api/productsByCateg`, {
          params: {
            category: productData.category_id,
            city: productData.city_id,
          },
        });
        const data = response?.data?.data ?? [];
        console.log("data", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProductsByCateg();
  }, [productData]); // Add city to the dependency array

  return (
    <div className="product-reviews max-w-7xl mt-10 mx-auto">
      <div className="py-8">
        <RatingPercentage rating={rating} productData={productData} />
      </div>

      <div className="product-reviews-comments mt-20 px-10">
        <h2 className="text-4xl text-accent-content text-center mb-5 max-sm:text-2xl">
          Similar products
        </h2>

        <div className="selected-products-grid max-w-7xl mx-auto">
          {isNull(products) ? (
            <>No similar products !</>
          ) : (
            products.map((product) => (
              <ProductElement
                key={product.id}
                id={product.id}
                title={product.name}
                image={product.image}
                rating={product.rating}
                price={product.price}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductReviews;
