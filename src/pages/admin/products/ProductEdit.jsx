import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button.jsx";
import { Loader } from "lucide-react";
import { useToast } from "../../../components/ui/use-toast.js";
import axios from "../../../lib/axios.jsx";
import { isNull } from "../../../lib/utils.js";
import ReturnBackBtn from "../../../components/Shared/ReturnBackBtn.jsx";

export default function ProductEdit() {

    const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    category_id: "",
    producer_id: "",
    price: "",
    quantity_available: "",
    city_id: "",
    image: "",
  });


  const [cities, setCities] = useState([]);
  const fetchCities = async () => {
    try {
      const response = await axios.get("/api/cities");
      setCities(response.data);
    } catch (error) {
      console.error("Failed to fetch cities", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  
  const [categories, setCategories] = useState([]);
  const [producers, setProducers] = useState([]);
  const [newImage, setNewImage] = useState({});
  const [isProgress, setInProgress] = useState(false);

  const { register, handleSubmit } = useForm();


  const fetchProduct = async () => {
    try {
      // const response = await axios.post(`/api/products/edit/${id}`);
      const response = !isNull(id) ? await axios.post(`/api/products/edit/${id}`) : {};
      console.log('response.data', response.data)
      if (response.status === 200) {
        setProduct(response.data);
      } else {
        throw new Error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };


  const fetchOptions = async () => {
    try {
      const [categoriesResponse, producersResponse] = await Promise.all([
        axios.get("/api/categories"),
        axios.get("/api/producers"),
      ]);
      setCategories(categoriesResponse.data);
      setProducers(producersResponse.data);
    } catch (error) {
      console.error("Failed to fetch options", error);
    }
  };


  useEffect(() => {
    fetchProduct();
    fetchOptions();
  }, [id]);

  const handleFileChange = (event) => {
    const newImage = event.target.files[0];
    if (newImage) setNewImage(newImage);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };
  
  const handleChangeCity = (e) => {
    setProduct({...product, city_id: e.target.value });
  };

  const onSubmit = async (data) => {
    try {
      setInProgress(true);

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category_id", product.category_id);
      formData.append("producer_id", product.producer_id);
      formData.append("price", product.price);
      formData.append("city_id", product.city_id);
      formData.append("quantity_available", product.quantity_available);
      formData.append("image", newImage);

      const response = !isNull(id) ? await axios.post(`/api/products/update/${id}`, formData) : {};
    //   const response = await axios.post(`/api/products/update/${id}`, formData);

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Product updated successfully!",
        });
        navigate("/dashboard/products");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        status: "error",
      });
    } finally {
      setInProgress(false);
    }
  };

  return (
    <>
      <div className="flex items-center p-2">
        <ReturnBackBtn />
        <h4 className="lg:text-2xl text-lg font-semibold ">
          Modifier produit
        </h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-2">
        <div className="mb-3">
          <label htmlFor="name" className="block mb-1 max-md:text-sm">
            Nom *
          </label>
          <input
            placeholder="Nom"
            value={product.name}
            onChange={handleChange}
            name="name"
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="categorie" className="block mb-1 max-md:text-sm">
            Categorie
          </label>
          <select
            value={product.category_id}
            onChange={handleChange}
            name="categorie"
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="producer" className="block mb-1 max-md:text-sm">
            Producer
          </label>
          <select
            value={product.producer_id}
            onChange={handleChange}
            name="producer"
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
          >
            <option value="">Select a producer</option>
            {producers.map((producer) => (
              <option key={producer.id} value={producer.id}>
                {producer.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="block mb-1 max-md:text-sm">
            Price *
          </label>
          <input
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            name="price"
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity_available" className="block mb-1 max-md:text-sm">
            Quantity *
          </label>
          <input
            placeholder="Quantity"
            value={product.quantity_available}
            onChange={handleChange}
            name="quantity_available"
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
          />
        </div>

        <div className="mb-3">
            <label htmlFor="city" className="block mb-1 max-md:text-sm">
              Available in
            </label>
            <select
              value={product.city_id}
              onChange={handleChangeCity}
              className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            >
              <option value="">Select a city</option>
              {cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label htmlFor="image" className="block mb-1 max-md:text-sm">
            Image
          </label>
          <input
            name="image"
            type="file"
            onChange={handleFileChange}
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            accept="image/png,image/jpeg,image/jpg"
          />
        </div>

        <Button className="mt-3 max-md:text-sm max-md:p-2" type="submit">
          {isProgress && <Loader className={"mx-2 my-2 animate-spin"} />}
          modifier
        </Button>
      </form>
    </>
  );
}
