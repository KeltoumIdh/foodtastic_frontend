import React, { useEffect, useState } from "react";
import { SectionTitle } from "../components";
import axios from "../lib/axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [id, setId] = useState(localStorage.getItem("id"));
  const [userData, setUserData] = useState({});
  const [cities, setCities] = useState([]);
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const wishItems = useSelector((state) => state.wishlist.wishItems);
  const [userFormData, setUserFormData] = useState({
    id: "",
    name: "",
    email: "",
    city: "",
    adress: "",
    password: "",
  });
  const navigate = useNavigate();

  const getUserData = async () => {
    try {
      const response = await axios.get(`/api/user/${id}`);
      const data = response.data;
      setUserFormData({
        name: data.name,
        city: data.city,
        email: data.email,
        adress: data.address,
        password: data.password,
      });
    } catch (error) {
      toast.error("Error: ", error.response);
    }
  };
  const fetchCities = async () => {
    try {
      const response = await axios.get("/api/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Failed to fetch cities", error);
    }
  };
  useEffect(() => {
    if (loginState) {
      getUserData();
      fetchCities();
    } else {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const getResponse = await axios.get(`/api/user/${id}`);
      const userObj = getResponse.data;
      const putResponse = await axios.put(`/api/user/${id}`, {
        id: id,
        name: userFormData.name,
        email: userFormData.email,
        city: userFormData.city,
        adress: userFormData.adress,
        password: userFormData.password,
        userWishlist: await userObj.userWishlist,
        //userWishlist treba da stoji ovde kako bi sacuvao stanje liste zelja
      });
      console.log('updated',putResponse.data);
      const putData = putResponse.data;
    } catch (error) {
      console.log(error.response);
    }
  };

  const deleteAccount = async () => {
    try {
      await axios.delete(`/api/user/${id}`);
      toast.success("Account deleted successfully");
      localStorage.removeItem("id");
      navigate("/");
    } catch (error) {
      console.error("Failed to delete account", error);
      toast.error("Failed to delete account");
    }
  };
  return (
    <>
      <SectionTitle title="User Profile" path="Home | User Profile" />
      <form
        className="max-w-7xl mx-auto text-center px-10"
        onSubmit={updateProfile}
      >
        <div className="grid grid-cols-3 max-lg:grid-cols-1">
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Name</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.name}
              onChange={(e) => {
                setUserFormData({ ...userFormData, name: e.target.value });
              }}
            />
          </div>

          {/* <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Lastname</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.lastname}
              onChange={(e) => {
                setUserFormData({ ...userFormData, lastname: e.target.value });
              }}
            />
          </div> */}

          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Email</span>
            </label>
            <input
              type="email"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.email}
              onChange={(e) => {
                setUserFormData({ ...userFormData, email: e.target.value });
              }}
            />
          </div>

          {/* <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Phone</span>
            </label>
            <input
              type="tel"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.phone}
              onChange={(e) => {
                setUserFormData({ ...userFormData, phone: e.target.value });
              }}
            />
          </div> */}

          {/* <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.city}
              onChange={(e) => {
                setUserFormData({ ...userFormData, city: e.target.value });
              }}
            />
          </div> */}
          <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your City</span>
            </label>
            <select
              className="select select-bordered w-full lg:max-w-xs"
              value={userFormData.adress}
              onChange={(e) => setUserFormData({ ...userFormData, adress: e.target.value })}
            >
              <option value="" disabled>
                Select your city
              </option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="form-control w-full lg:max-w-xs">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full lg:max-w-xs"
              value={userFormData.password}
              onChange={(e) => {
                setUserFormData({ ...userFormData, password: e.target.value });
              }}
            />
          </div> */}
        </div>
        <button
          className="btn btn-lg bg-blue-600 hover:bg-blue-500 text-white mt-10"
          type="submit"
        >
          Update Profile
        </button>
        <button
          type="button"
          className="btn btn-lg bg-red-600 hover:bg-red-500 text-white mt-10 ml-4"
          onClick={deleteAccount}
        >
          Delete Account
        </button>
      </form>
    </>
  );
};

export default Profile;
