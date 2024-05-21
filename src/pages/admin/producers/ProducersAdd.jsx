import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form.jsx";
import { Input } from "../../../components/ui/input.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { Loader } from "lucide-react";
import { useToast } from "../../../components/ui/use-toast.js";
import { Label } from "../../../components/ui/label.jsx";
// import SuccessPopup from '../../components/Popups/SuccessPopup.jsx'; // Import your success popup component
import axios from "../../../lib/axios.jsx";

function ProducersAdd() {
  const { toast } = useToast();
  const [imageName, setImageName] = useState("");
  const [producers, setProducers] = useState([]);
  const [categories, setCategories] = useState([]);
  console.log(producers);
  console.log(categories);

  const methods = useForm();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = methods;
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    // Fetch producers and categories
    const fetchOptions = async () => {
      try {
        const [producerResponse, categoryResponse] = await Promise.all([
          axios.get("/api/producers"), // Adjust the endpoint accordingly
          axios.get("/api/categories"), // Adjust the endpoint accordingly
        ]);
        setProducers(producerResponse?.data ?? []);
        setCategories(categoryResponse?.data ?? []);
      } catch (error) {
        console.error("Failed to fetch options", error);
      }
    };
    fetchOptions();
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const firstFile = files[0];
      setImageName(firstFile.name);
    }
  };
  const onSubmit = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("categorie", parseInt(values.categorie, 10));
    formData.append("producer", parseInt(values.producer, 10));
    formData.append("quantity", parseInt(values.quantity, 10));
    formData.append("price", parseFloat(values.price)); // Convert to float
    if (values.image && values.image.length > 0) {
      formData.append("image", values.image[0].name);
      console.log("img", values.image[0].name);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const { status, data } = await axios.post("/api/producers/add", formData);
      console.log("data", data, "status", status);

      if (status === 201) {
        toast({
          title: "Success",
          description: "Producer created successfully!",
        });
        reset();
        navigate("/dashboard/producers");
      }
    } catch (error) {
      console.error("Request failed:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        console.log("Validation errors:", errors);
        Object.entries(errors).forEach(([fieldName, errorMessages]) => {
          console.log(
            `Field: ${fieldName}, Errors: ${errorMessages.join(", ")}`
          );
          setError(fieldName, { message: errorMessages.join(", ") });
        });
      }
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <>
      <div className="flex items-center p-2">
        <Link to={"/producers"} className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 max-md:w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <h4 className="lg:text-2xl text-lg font-semibold dark:text-gray-300">
          Ajouter produit
        </h4>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-2">
          <div className="mb-3">
            <label htmlFor="name" className="block mb-1 max-md:text-sm">
              Nom
            </label>
            <input
              placeholder="Nom"
              {...register("name", { required: "Name is required" })}
              className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            />
            <span className="text-red-500">
              {errors.name && errors.name.message}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="block mb-1 max-md:text-sm">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: "Price is required" })}
              className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            />
            <span className="text-red-500">
              {errors.price && errors.price.message}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="quantity" className="block mb-1 max-md:text-sm">
              Quantity KG
            </label>
            <input
              placeholder="Quantity"
              {...register("quantity", { required: "Quantity is required" })}
              className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            />
            <span className="text-red-500">
              {errors.quantity && errors.quantity.message}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="categorie" className="block mb-1 max-md:text-sm">
              Categorie
            </label>
            <select
              {...register("categorie", { required: "Categorie is required" })}
              className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <span className="text-red-500">
              {errors.categorie && errors.categorie.message}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="producer" className="block mb-1 max-md:text-sm">
              Producer
            </label>
            <select
              {...register("producer", { required: "Producer is required" })}
              className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            >
              <option value="">Select a producer</option>
              {producers?.map((producer) => (
                <option key={producer.id} value={producer.id}>
                  {producer.name}
                </option>
              ))}
            </select>
            <span className="text-red-500">
              {errors.producer && errors.producer.message}
            </span>
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <label htmlFor="image" className="block mb-1 max-md:text-sm">
              Image
            </label>
            <input
              {...register("image")}
              name="image"
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            />
          </div>

          <Button className="mt-3 max-md:text-sm max-md:p-2" type="submit">
            {isSubmitting && <Loader className={"m-2 animate-spin"} />} Create
          </Button>
        </form>
      </FormProvider>
      {/* {showSuccessPopup && <SuccessPopup message="Producer created successfully!" onClose={closeSuccessPopup} />} */}
    </>
  );
}
export default ProducersAdd;
