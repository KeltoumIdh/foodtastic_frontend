import axios from "../lib/axios";
import React, { useEffect, useState } from "react";
import {
  QuantityInput,
  SectionTitle,
  SingleProductRating,
  SingleProductReviews,
} from "../components";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { useLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import {
  updateWishlist,
  removeFromWishlist,
} from "../features/wishlist/wishlistSlice";
import { toast } from "react-toastify";
import { store } from "../store";
import { isNull } from "../lib/utils";

export const singleProductLoader = async ({ params }) => {
  const { id } = params;

  return { product_id: id };
};

const SingleProduct = () => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [rating, setRating] = useState([
    "empty star",
    "empty star",
    "empty star",
    "empty star",
    "empty star",
  ]);

  const [productData, setProductData] = useState({});
  const [inProgress, setInProgress] = useState(false);

  const { product_id } = useLoaderData();

  const getProductData = async (_id) => {
    setInProgress(true);

    const response = !isNull(_id)
      ? await axios.get(`/api/products/${_id}`)
      : {};

    setProductData(response?.data?.product ?? []);

    setInProgress(false);
  };

  useEffect(() => {
    getProductData(product_id);
  }, [product_id]);

  const product = {
    id: productData?.id,
    title: productData?.name,
    image: productData?.image,
    rating: productData?.rating,
    price: productData?.price?.current?.value,
    brandName: productData?.brandName,
    amount: quantity,
    // selectedSize: size || productData?.availableSizes[0],
    // isInWishList: wishItems?.find((item) => item.id === productData?.id),
    isInWishList: false,
  };

  for (let i = 0; i < productData?.rating; i++) {
    rating[i] = "full star";
  }

  const addToWishlistHandler = async (product) => {
    try {
      const getResponse = await axios.get(
        `/api/user/${localStorage.getItem("id")}`
      );
      const userObj = getResponse.data;

      userObj.userWishlist = userObj.userWishlist || [];

      userObj.userWishlist.push(product);

      const postResponse = await axios.put(
        `/api/user/${localStorage.getItem("id")}`,
        userObj
      );

      store.dispatch(updateWishlist({ userObj }));
      toast.success("Product added to the wishlist!");
    } catch (error) {
      console.error(error);
    }
  };

  const removeFromWishlistHandler = async (product) => {
    const getResponse = await axios.get(
      `/api/user/${localStorage.getItem("id")}`
    );
    const userObj = getResponse.data;

    userObj.userWishlist = userObj.userWishlist || [];

    const newWishlist = userObj.userWishlist.filter(
      (item) => product.id !== item.id
    );

    userObj.userWishlist = newWishlist;

    const postResponse = await axios.put(
      `/api/user/${localStorage.getItem("id")}`,
      userObj
    );

    store.dispatch(removeFromWishlist({ userObj }));
    toast.success("Product removed from the wishlist!");
  };

  return inProgress ? (
    suspense()
  ) : (
    <>
      <SectionTitle title="Product page" path="Home | Shop | Product page" />
      <div className="grid grid-cols-2 gap-4 lg:gap-8 max-w-7xl mx-auto my-10 max-lg:grid-cols-1 px-2 lg:px-4 xl:px-6">
        <div className="product-images flex flex-col justify-center max-lg:justify-start bg-blue-300">
          <img
            src={`${productData?.image}`}
            className="w-full text-center border border-gray-600 cursor-pointer"
            alt={productData.name}
          />
        </div>
        <div className="single-product-content flex flex-col gap-y-5 max-lg:mt-2">
          <h2 className="text-5xl max-sm:text-3xl text-accent-content">
            {productData?.name}
          </h2>

          <SingleProductRating rating={rating} productData={productData} />

          <p className="text-3xl text-error">${productData?.price}</p>
          <div className="text-xl max-sm:text-lg text-accent-content">
            {productData?.description}
          </div>
          <div>
            <label htmlFor="Quantity" className="sr-only">
              {" "}
              Quantity{" "}
            </label>

            <div className="flex items-center gap-1">
              <QuantityInput
                quantity={quantity}
                setQuantity={setQuantity}
                max={productData?.quantity_available}
              />
            </div>
            {productData?.status}
          </div>
          <div className="flex flex-row gap-x-2 max-sm:flex-col max-sm:gap-x">
            <button
              className={`btn bg-blue-600 hover:bg-blue-500 text-white `}
              onClick={() => {
                if (loginState) {
                  dispatch(
                    addToCart({
                      id: productData?.id,
                      name: productData?.name,
                      price: productData?.price,
                      image: productData?.image,
                      quantity: quantity,
                    })
                  );
                } else {
                  toast.error(
                    "You must be logged in to add products to the cart"
                  );
                }
              }}
            >
              <FaCartShopping className="text-xl mr-1" />
              Add to cart
            </button>

            {product?.isInWishList ? (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    removeFromWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to remove products from the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                Remove from wishlist
              </button>
            ) : (
              <button
                className="btn bg-blue-600 hover:bg-blue-500 text-white"
                onClick={() => {
                  if (loginState) {
                    addToWishlistHandler(product);
                  } else {
                    toast.error(
                      "You must be logged in to add products to the wishlist"
                    );
                  }
                }}
              >
                <FaHeart className="text-xl mr-1" />
                Add to wishlist
              </button>
            )}
          </div>
        </div>
      </div>

      <SingleProductReviews rating={rating} productData={productData} />
    </>
  );
};

export default SingleProduct;

// suspense/loader
const suspense = () => {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center">
      <div className="animate-pulse">Wait...</div>
    </div>
  );
};
