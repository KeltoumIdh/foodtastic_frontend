import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import { Form, Link, useNavigate } from "react-router-dom";
import FormRange from "./FormRange";
import FormSelect from "./FormSelect";
import FormDatePicker from "./FormDatePicker";
import FormCheckbox from "./FormCheckbox";
import axios from "../lib/axios";

const Filters = ({ value, handleChangeValue }) => {
  const [cities, setCities] = useState([]);
  const [selectCategoryList, setSelectCategoryList] = useState([]);
  // console.log(cities);
  // console.log(selectCategoryList);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/api/cities");
        const cityNames = response.data.map((city) => city.name);
        setCities(cityNames);
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchCities();
  }, []);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        const categNames = response.data.map((city) => city.name);

        setSelectCategoryList(categNames);
      } catch (error) {
        console.error("Failed to fetch Categories", error);
      }
    };
    fetchCategories();
  });
  const handleSubmit = (event) => {
    event.preventDefault();

    const query = new URLSearchParams({
      search: value.search,
      category: value.category,
      city: value.city,
      price: value.price,
    }).toString();

    navigate(`/shop?${query}`);
  };
  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4  gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
    >
      {/* SEARCH */}
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue=""
        value={value.search}
        handleChangeValue={handleChangeValue}
      />
      {/* CATEGORIES */}
      <FormSelect
        label="select category"
        name="category"
        list={selectCategoryList}
        size="select-sm"
        defaultValue="all"
        value={value.category}
        handleChangeValue={handleChangeValue}
      />
      {/* Cities */}
      <FormSelect
        label="select city"
        name="city"
        list={cities}
        size="select-sm"
        defaultValue="all"
        value={value.city}
        handleChangeValue={handleChangeValue}
      />

      {/* PRICE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        value={value.price}
        handleChangeValue={handleChangeValue}
      />

      {/* BUTTONS */}

      <button
        type="submit"
        className="btn bg-blue-600 hover:bg-blue-500 text-white btn-sm"
      >
        search
      </button>
      <Link to="/shop?page=1" className="btn btn-primary btn-sm">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
