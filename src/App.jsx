import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  About,
  Cart,
  Contact,
  HomeLayout,
  Landing,
  Register,
  Shop,
  SingleProduct,
  Wishlist,
  Profile,
  Search,
  ThankYou,
  OrderHistory,
  Login,
} from "./pages";
import { singleProductLoader } from "./pages/SingleProduct";
import { shopLoader } from "./pages/Shop";
import { ToastContainer } from "react-toastify";
import DahboardLayout from "./pages/admin/DahboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/products/Products";
import ProductsAdd from "./pages/admin/products/ProductsAdd";
import ProductsEdit from "./pages/admin/products/ProductEdit";
import Categories from "./pages/admin/categories/Categories";
import CategoriesAdd from "./pages/admin/categories/CategoriesAdd";
import CategoryEdit from "./pages/admin/categories/CategoryEdit";
import Producers from "./pages/admin/producers/Producers";
import Cities from "./pages/admin/cities/Cities";
import CitiesAdd from "./pages/admin/cities/CitiesAdd";
import CityEdit from "./pages/admin/cities/CityEdit";
import ProducersAdd from "./pages/admin/producers/ProducersAdd";
import ProducerEdit from "./pages/admin/producers/ProducerEdit";
import { Admins } from "./pages/admin/users/Admins";
import AdminAdd from "./pages/admin/users/AdminAdd";
import AdminEdit from "./pages/admin/users/AdminEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "shop",
        element: <Shop />,
        loader: shopLoader,
      },
      {
        path: "shop/product/:id",
        element: <SingleProduct />,
        loader: singleProductLoader,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about-us",
        element: <About />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "user-profile",
        element: <Profile />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "thank-you",
        element: <ThankYou />,
      },
      {
        path: "order-history",
        element: <OrderHistory />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DahboardLayout />,
    children: [
      // {
      //   index: true,
      //   element: <Landing />,
      // },
      {
        path: "admin",
        element: <Dashboard />,
        loader: shopLoader,
      },
      {
        path: "products",
        element: <Products />,
        loader: shopLoader,
      },
      {
        path: "products/add",
        element: <ProductsAdd />,
        loader: shopLoader,
      },
      {
        path: "products/edit/:id",
        element: <ProductsEdit />,
        loader: shopLoader,
      },

      {
        path: "categories",
        element: <Categories />,
        loader: shopLoader,
      },
      {
        path: "categories/add",
        element: <CategoriesAdd />,
        loader: singleProductLoader,
      },
      {
        path: "categories/edit/:id",
        element: <CategoryEdit />,
        loader: singleProductLoader,
      },
      {
        path: "producers",
        element: <Producers />,
        loader: shopLoader,
      },
      {
        path: "producers/add",
        element: <ProducersAdd />,
        loader: singleProductLoader,
      },
      {
        path: "producers/edit/:id",
        element: <ProducerEdit />,
        loader: singleProductLoader,
      },
      {
        path: "cities",
        element: <Cities />,
        loader: singleProductLoader,
      },
      {
        path: "cities/add",
        element: <CitiesAdd />,
        loader: singleProductLoader,
      },
      {
        path: "cities/edit/:id",
        element: <CityEdit />,
        loader: singleProductLoader,
      },
      {
        path: "admins",
        element: <Admins />,
        loader: singleProductLoader,
      },
      {
        path: "admins/add",
        element: <AdminAdd />,
        loader: singleProductLoader,
      },
      {
        path: "admins/edit/:id",
        element: <AdminEdit />,
        loader: singleProductLoader,
      },

    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
