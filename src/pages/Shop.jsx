/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Filters,
  Pagination,
  ProductElement,
  SectionTitle,
} from "../components";
import "../styles/Shop.css";
import axios from "../lib/axios";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";

export const shopLoader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // /posts?title=json-server&author=typicode
  // GET /posts?_sort=views&_order=asc
  // GET /posts/1/comments?_sort=votes&_order=asc

  let mydate = Date.parse(params.date);

  if (mydate && !isNaN(mydate)) {
    // The date is valid
    mydate = new Date(mydate).toISOString();
  } else {
    mydate = "";
  }

  const filterObj = {
    city: params.city ?? "all",
    category: params.category ?? "all",
    date: mydate ?? "",
    gender: params.gender ?? "all",
    order: params.order ?? "",
    price: params.price ?? "all",
    search: params.search ?? "",
    in_stock: params.stock === undefined ? false : true,
    current_page: Number(params.page) || 1,
  };

  // set params in get apis
  let parameter =
    `?_start=${(filterObj.current_page - 1) * 10}&_limit=10` + // pre defined that limit of response is 10 & page number count 1
    (filterObj.city !== "all" ? `&brandName=${filterObj.city}` : "") +
    (filterObj.category !== "all" ? `&category=${filterObj.category}` : "") +
    (filterObj.gender !== "all" ? `&gender=${filterObj.gender}` : ``) +
    (filterObj.search != ""
      ? `&q=${encodeURIComponent(filterObj.search)}`
      : ``) +
    (filterObj.order ? `&_sort=price.current.value` : "") + // Check if the order exists, then sort it in ascending order. After that, the API response will be modified if descending order or any other filter is selected.
    (filterObj.in_stock ? `&isInStock` : "") +
    (filterObj.price !== "all"
      ? `&price.current.value_lte=${filterObj.price}`
      : ``) +
    (filterObj.date ? `&productionDate=${filterObj.date}` : ``); // It only matched exact for the date and time.

  try {
    const response = await axios.get(`/api/products${parameter}`);
    let data = response?.data ?? [];

    // sorting in descending order
    if (
      filterObj.order &&
      !(filterObj.order === "asc" || filterObj.order === "price low")
    )
      data.sort((a, b) => b.price.current.value - a.price.current.value);
    return {
      productsData: data,
      productsLength: data?.length,
      page: filterObj.current_page,
    };
  } catch (error) {
    console.log(error.response);
  }
  // /posts?views_gte=10

  return null;
};

const Shop = () => {
  const productLoaderData = useLoaderData();
  const [filterCity, setFilterCity] = useState("");
  const [filterCateg, setFilterCateg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState([]);

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState("");
  const [city, setCity] = useState("");
  const [authCity, setAuthCity] = useState("");
  const [categories, setCategories] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    setSearch(queryParams.get("search") ?? "");
    setCity(queryParams.get("city") ?? "");
    setCategory(queryParams.get("category") ?? "");
    // setPrice(queryParams.get("price") ?? "");
  }, []);
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("/api/cities");
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  // useEffect(() => {
  //   const fetchcateg = async () => {
  //     try {
  //       const res = await axios.get("/api/categories");
  //       setCategories(res?.data ?? []); // Set categories to the array received from API or an empty array if response is falsy
  //     } catch (error) {
  //       console.error("Error fetching categories:", error);
  //     }
  //   };
  // }, [])

  const handleChangeValue = (name, value) => {
    switch (name) {
      case "search":
        return setSearch(value);
      case "city":
        return setCity(value);
      case "category":
        return setCategory(value);
      case "price":
        return setPrice(value);
    }
  };
  console.log(searchQuery);
  console.log(city);
  const getProducts = async () => {
    const queryParams = new URLSearchParams(location.search);
    try {
      const res = await axios.get("/api/products", {
        params: {
          search: searchQuery || "",
          city:
            // queryParams.get("city")
            //   ? queryParams.get("city")
            //   :
            filterCity || "",
          price: price || "",
        },
      });
      setProducts(res?.data?.data);
      console.log(res?.data?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [searchQuery, filterCity]);

  const handleChangeSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const loginState = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const getuser = async () => {
      if (loginState) {
        try {
          const getResponse = await axios.get(
            `/api/user/${localStorage.getItem("id")}`
          );
          const userObj = getResponse.data;
          console.log("userObj", userObj);
          setAuthCity(userObj.address);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getuser();
  }, [loginState]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const cityFromUrl = queryParams.get("city");

    if (loginState && authCity) {
      const authCityObj = cities.find((city) => city.name === authCity);
      if (authCityObj) {
        setFilterCity(authCityObj.id);
      }
    } else if (!loginState && cityFromUrl) {
      const urlCityObj = cities.find((city) => city.name === cityFromUrl);
      if (urlCityObj) {
        setFilterCity(urlCityObj.id);
      }
    }
  }, [loginState, authCity, cities, location.search]);
  return (
    <>
      <SectionTitle title="Shop" path="Home | Shop" />
      <div className="max-w-7xl mx-auto mt-5">
        {/* <Filters
          value={{
            search,
            city,
            category,
            price,
          }}
          handleChangeValue={handleChangeValue}
        /> */}
        <div className="flex p-2 justify-start space-x-2">
          <select
            value={filterCity}
            onChange={(e) => setFilterCity(e.target.value)}
            className="bg-gray-50 w-fit border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:p-2.5 p-1"
          >
            {loginState ? (
              <option value={filterCity}>{authCity}</option>
            ) : !loginState && filterCity ? (
              <option value={filterCity}>
                {cities.find((city) => city.id === filterCity)?.name}
              </option>
            ) : (
              <>
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </>
            )}
          </select>
          {/* <select
            value={filterCateg}
            onChange={(e) => setFilterCateg(e.target.value)}
            className="bg-gray-50 w-fit border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:p-2.5 p-1"
          >
            <option value="">All Categories</option>
            {categories?.map((categ) => (
              <option key={categ.id} value={categ.id}>
                {categ.name}
              </option>
            ))}
          </select> */}
          <select
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="bg-gray-50 w-fit border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block md:p-2.5 p-1"
          >
            <option value="">All Prices</option>
            <option value="100"> - $100</option>
            <option value="200"> - $200</option>
            <option value="300"> - $300</option>
            {/* Add more options as needed */}
          </select>

          <form className="lg:w-1/2 w-full ">
            {/* <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label> */}
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="md:w-4 md:h-4 h-3  text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                value={searchQuery}
                onChange={handleChangeSearch}
                type="search"
                id="default-search"
                className="block w-full px-4 md:py-3 p-2 ps-10 md:text-sm text-xs text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500  "
                placeholder="Recherche par nom du produit ou reference."
                required
              />
              {/* <button
                            onClick={handleSearch}
                            type="submit"
                            className="text-white font-sans uppercase  absolute end-2.5 bottom-2 bg-gray-900 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Search
                        </button> */}
            </div>
          </form>
        </div>
        {products?.length === 0 && (
          <h2 className="text-accent-content text-center text-4xl my-10">
            No products found for this filter
          </h2>
        )}
        <div className="py-8 grid grid-cols-4 px-2 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
          {products?.length !== 0 &&
            products?.map((product) => (
              <ProductElement
                key={`product_${product?.id}`}
                id={product?.id}
                title={product?.name}
                image={product?.image}
                rating={product?.rating}
                price={product?.price}
                brandName={product?.brandName}
              />
            ))}
        </div>
      </div>

      <Pagination />
    </>
  );
};

export default Shop;
