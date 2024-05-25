import React, { useState } from "react";
import { CartItemsList, CartTotals, SectionTitle } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { isNull } from "../lib/utils";
import axios from "../lib/axios";

const Cart = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const { cartItems } = useSelector((state) => state.cart);
  const CanOrder = !isNull(cartItems);

  const [finalPrice, setFinalPrice] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  // order
  const handleOrderButton = async (e) => {
    try {
      setIsLoading(true);

      const { data } = await axios.post("/api/new-order", {
        products: cartItems,
        total_ammount: finalPrice,
        auth_user: Number(localStorage.getItem("id")),
      });

      const url = "http://127.0.0.1:8000/" + data.file_path;

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target", `_blank`);
      document.body.appendChild(link);
      link.click();
      navigate("/thank-you");
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to order", error);
      setIsLoading(false);
    }

    // navigate("/thank-you");
  };

  return (
    <>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div className="mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10">
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals setFinalPrice={setFinalPrice} />
          {CanOrder &&
            (loginState ? (
              <button
                onClick={handleOrderButton}
                disabled={isLoading}
                className="btn bg-blue-600 hover:bg-blue-500 text-white btn-block mt-8"
              >
                {!isLoading ? `order now` : "wait..."}
              </button>
            ) : (
              <Link
                to="/login"
                className="btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8"
              >
                please login
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
