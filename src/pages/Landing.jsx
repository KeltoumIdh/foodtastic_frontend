import React, { useEffect } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useLoaderData, useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { isNull } from "../lib/utils";

export const landingLoader = async () => {
  const response = await axios.get(`/api/products`);
  const data = response?.data?.data ?? [];
console.log('data',data);
  return { products: data };
};

const Landing = () => {
  const { products } = useLoaderData();
  const navigate = useNavigate();


  return (
    <main>
      <Hero />
      {/* <Stats /> */}

      <div className="selected-products">
        <h2 className="text-6xl text-green-700  font-bold text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
          {isNull(products)
            ? <>No products found!</>
            : products?.map((product) => (
                <ProductElement
                  key={product?.id}
                  id={product?.id}
                  title={product?.name}
                  image={product?.imageUrl}
                  rating={product?.rating}
                  price={product?.price}
                />
              ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
