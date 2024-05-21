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
import { landingLoader } from "./pages/Landing";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
        loader: landingLoader,
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
      //   loader: landingLoader,
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
        element: <producersAdd />,
        loader: singleProductLoader,
      },
      {
        path: "producers/edit/:id",
        element: <CategoryEdit />,
        loader: singleProductLoader,
      },
      // {
      //   path: "about",
      //   element: <About />,
      // },
      // {
      //   path: "login",
      //   element: <Login />,
      // },
      // {
      //   path: "register",
      //   element: <Register />,
      // },
      // {
      //   path: "contact",
      //   element: <Contact />,
      // },
      // {
      //   path: "about-us",
      //   element: <About />,
      // },
      // {
      //   path: "cart",
      //   element: <Cart />,
      // },
      // {
      //   path: "wishlist",
      //   element: <Wishlist />,
      // },
      // {
      //   path: "user-profile",
      //   element: <Profile />,
      // },
      // {
      //   path: "search",
      //   element: <Search />,
      // },
      // {
      //   path: "thank-you",
      //   element: <ThankYou />,
      // },
      // {
      //   path: "order-history",
      //   element: <OrderHistory />,
      // },
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
