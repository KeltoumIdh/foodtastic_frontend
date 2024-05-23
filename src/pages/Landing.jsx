import React, { useEffect, useState } from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { isNull } from "../lib/utils";
import { useSelector } from "react-redux";

const predefinedCities = [
  {
    name: "Paris",
    imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
  },
  {
    name: "Casablanca",
    imageUrl: "https://www.leconomiste.com/sites/default/files/eco7/public/casablanca_budget_trt_bon.jpg",
  },
  {
    name: "Montreal",
    imageUrl: "https://www.montrealinternational.com/app/uploads/2019/03/montreal.jpg",
  },
  {
    name: "Berlin",
    imageUrl: "https://cdn-s-www.ledauphine.com/images/1C367972-1813-4CC1-B72B-B4C204CAB68E/NW_raw/appreciee-pour-son-ambiance-nocturne-et-underground-berlin-est-egalement-une-ville-d-histoire-ou-l-on-peut-remonter-le-fil-du-passe-entre-la-porte-de-brandebourg-le-memorial-aux-juifs-assassines-d-europe-et-les-vestiges-du-mur-de-berlin-a-decouvrir-lors-d-un-sejour-d-un-week-end-ou-plus-photo-s-widua-(unsplash)-1710171258.jpg",
  },
  {
    name: "Rome",
    imageUrl: "https://res.cloudinary.com/hello-tickets/image/upload/c_limit,f_auto,q_auto,w_1300/v1640835927/o3pfl41q7m5bj8jardk0.jpg",
  },
];

const Landing = () => {
  const navigate = useNavigate();
  const loginState = useSelector((state) => state.auth.isLoggedIn);
  const [city, setCity] = useState('');
  const [products, setProducts] = useState([]);
  const [cities, setCities] = useState(predefinedCities);

  useEffect(() => {
    const getuser = async () => {
      if (loginState) {
        try {
          const getResponse = await axios.get(`/api/user/${localStorage.getItem("id")}`);
          const userObj = getResponse.data;
          console.log("userObj", userObj);
          setCity(userObj.address);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getuser();
  }, [loginState]);

  useEffect(() => {
    const fetchProductsByCity = async () => {
      try {
        const response = await axios.get(`/api/productsByCity`, { params: { city } });
        const data = response?.data?.data ?? [];
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (city) {
      fetchProductsByCity();
    }
  }, [city]);

  const randomPhotos = [
    "https://www.mckinsey.com/~/media/mckinsey/industries/public%20and%20social%20sector/our%20insights/how%20to%20make%20a%20city%20great/citiesnew_largefeature_1536x1152.jpg",
    "https://t4.ftcdn.net/jpg/01/81/07/91/360_F_181079136_irl2A25Clc5Bi2Lwa3Q9kJvF0RlFv8tU.jpg",
  ];

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get("/api/cities"); // Assuming you have an endpoint to fetch cities
        const fetchedCities = response?.data ?? [];

        const mergedCities = fetchedCities.map((city) => {
          const predefinedCity = predefinedCities.find((c) => c.name === city.name);
          return predefinedCity
            ? predefinedCity
            : {
                name: city.name,
                imageUrl: randomPhotos[Math.floor(Math.random() * randomPhotos.length)],
              };
        });

        const uniqueCities = [
          ...predefinedCities,
          ...mergedCities.filter((city) => !predefinedCities.some((c) => c.name === city.name)),
        ];
        setCities(uniqueCities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <main>
      <Hero />
      {!loginState ? (
        <div className="selected-products">
          <h2 className="text-6xl text-green-700 font-bold text-center my-12 max-md:text-4xl text-accent-content">
            Shop in your City
          </h2>
          <div className={`${cities.length > 5 ? "lg:grid-cols-3" : "lg:grid-cols-5"} grid grid-cols-3 gap-10 max-w-7xl mx-auto`}>
            {cities.map((city) => (
              <article
                key={city.name}
                className="relative isolate flex flex-col cursor-pointer justify-end w-full overflow-hidden rounded-2xl px-8 pb-8 pt-40 max-w-sm mx-auto"
              >
                <img
                  src={city.imageUrl}
                  alt={city.name}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-2xl font-bold text-white">
                  {city.name}
                </h3>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="selected-products">
          <h2 className="text-6xl text-green-700 font-bold text-center my-12 max-md:text-4xl text-accent-content">
            Trending Products
          </h2>
          <div className="selected-products-grid max-w-7xl mx-auto">
            {isNull(products) ? (
              <>No products found In your city!</>
            ) : (
              products.map((product) => (
                <ProductElement
                  key={product.id}
                  id={product.id}
                  title={product.name}
                  image={product.imageUrl}
                  rating={product.rating}
                  price={product.price}
                />
              ))
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default Landing;
