import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import { Button } from "../../../components/ui/button.jsx";
import { Loader } from "lucide-react";
import { useToast } from "../../../components/ui/use-toast.js";
import axios from "../../../lib/axios.jsx";
import ReturnBackBtn from "../../../components/Shared/ReturnBackBtn.jsx";

function ProducersAdd() {
  const { toast } = useToast();
  const [imageName, setImageName] = useState("");
  const [producers, setProducers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]); // Add state for cities

  const methods = useForm();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = methods;

  useEffect(() => {
    // Fetch producers, categories, and cities
    const fetchOptions = async () => {
      try {
        const [producerResponse, categoryResponse, cityResponse] =
          await Promise.all([
            axios.get("/api/producers"), // Adjust the endpoint accordingly
            axios.get("/api/categories"), // Adjust the endpoint accordingly
            axios.get("/api/cities"), // Adjust the endpoint accordingly
          ]);
        setProducers(producerResponse?.data ?? []);
        setCategories(categoryResponse?.data ?? []);
        setCities(cityResponse?.data ?? []); // Set cities data
      } catch (error) {
        console.error("Failed to fetch options", error);
      }
    };
    fetchOptions();
  }, []);

  const onSubmit = async (values) => {
    console.log("Form Values:", values); // Add this line
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("contact_info", values.contact_info);
    formData.append("city_id", values.city_id);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // Add this line
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


  return (
    <>
      <div className="flex items-center p-2">
        <ReturnBackBtn />
        <h4 className="lg:text-2xl text-lg font-semibold dark:text-gray-300">
          Ajouter producer
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
            <label htmlFor="contact_info" className="block mb-1 max-md:text-sm">
              Contact Info
            </label>
            <input
              placeholder="Contact Info"
              {...register("contact_info", {
                required: "Contact info is required",
              })}
              className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            />
            <span className="text-red-500">
              {errors.contact_info && errors.contact_info.message}
            </span>
          </div>

          <div className="mb-3">
            <label htmlFor="city_id" className="block mb-1 max-md:text-sm">
              City
            </label>
            <select
              {...register("city_id", { required: "City is required" })}
              className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            >
              <option value="">Select a city</option>
              {cities?.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            <span className="text-red-500">
              {errors.city_id && errors.city_id.message}
            </span>
          </div>

          <Button className="mt-3 max-md:text-sm max-md:p-2" type="submit">
            {isSubmitting && <Loader className={"m-2 animate-spin"} />} Create
          </Button>
        </form>
      </FormProvider>
    </>
  );
}

export default ProducersAdd;
