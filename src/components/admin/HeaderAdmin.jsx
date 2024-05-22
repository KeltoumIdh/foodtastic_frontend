import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaHeadphones } from "react-icons/fa6";
import { FaRegEnvelope } from "react-icons/fa6";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa6";
import { AiFillShopping } from "react-icons/ai";
import { FaSun } from "react-icons/fa6";
import { FaMoon } from "react-icons/fa6";
import { FaWindowClose } from "react-icons/fa";

import "../../styles/Header.css";
import { useDispatch, useSelector } from "react-redux";
import { changeMode } from "../../features/auth/authSlice";
import { store } from "../../store";
import axios from "../../lib/axios";
import {
  clearWishlist,
  updateWishlist,
} from "../../features/wishlist/wishlistSlice";

const HeaderAdmin = () => {
  const { amount } = useSelector((state) => state.cart);
  const { total } = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [id, setId] = useState(localStorage.getItem("id"));
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.auth);
  const [user, setUser] = useState("");
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  console.log("id", localStorage.getItem("id"));
  console.log("authToken", localStorage.getItem("authToken"));

  const fetchWishlist = async () => {
    if (loginState) {
      try {
        const getResponse = await axios.get(
          `api/user/${localStorage.getItem("id")}`
        );
        const userObj = getResponse.data;
        console.log("userObj", userObj);
        setUser(userObj);
        store.dispatch(updateWishlist({ userObj }));
      } catch (error) {
        console.error(error);
      }
    } else {
      store.dispatch(clearWishlist());
    }
  };

  useEffect(() => {
    setIsLoggedIn(loginState);
    fetchWishlist();

    // Set initial theme
    const theme = darkMode ? "dark" : "light";
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [loginState, darkMode]);


  return (
    <>
      <div className="navbar bg-base-100 max-w-7xl mx-auto">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-black text-accent-content"
          >
            <AiFillShopping />
            Foodtastic
          </Link>
        </div>
        <div className="flex-none">
          <button
            className="text-accent-content btn btn-ghost btn-circle text-xl"
            onClick={() => dispatch(changeMode())}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {isLoggedIn && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://xsgames.co/randomusers/avatar.php?g=male" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                {/* <li>
                  <Link
                    to="/user-profile"
                    className="justify-between text-accent-content"
                  >
                    Profile
                  </Link>
                </li> */}
                <li>
                  <Link to="/login" className="text-accent-content">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="navbar-bottom-menu border-y border-gray-800">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn drawer-button">
              <HiMiniBars3BottomLeft className="text-4xl" />
            </label>
          </div>
          <div className="drawer-side z-10">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>

            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content mt-4">
              <label htmlFor="my-drawer" className="btn drawer-button">
                <FaWindowClose className="text-3xl ml-auto" />
              </label>
              {/* Sidebar content here */}
              <li className="text-sm">
                <NavLink className="text-accent-content" to="admin">
                  Dashboard
                </NavLink>
              </li>
              <li className="text-sm">
                <NavLink className="text-accent-content" to="products">
                  Products
                </NavLink>
              </li>
              <li className="text-sm">
                <NavLink className="text-accent-content" to="categories">
                  Categories
                </NavLink>
              </li>
              <li className="text-sm">
                <NavLink className="text-accent-content" to="producers">
                  Producers
                </NavLink>
              </li>
              <li className="text-sm">
                <NavLink className="text-accent-content" to="producers">
                  Cities
                </NavLink>
              </li>
              <li className="text-sm">
                <NavLink className="text-accent-content" to="admins">
                  Admins
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <div className="container text-md navlinks-container">
          <NavLink className="text-accent-content" to="admin">
            Dashboard
          </NavLink>
          <NavLink className="text-accent-content" to="products">
            Products
          </NavLink>
          <NavLink className="text-accent-content" to="categories">
            Categories
          </NavLink>
          <NavLink className="text-accent-content" to="producers">
            Producers
          </NavLink>
          <NavLink className="text-accent-content" to="cities">
            Cities
          </NavLink>
          <NavLink className="text-accent-content" to="admins">
            Admins
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default HeaderAdmin;
