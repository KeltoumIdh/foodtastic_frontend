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

function CitiesAdd() {
  const { toast } = useToast();
  const [imageName, setImageName] = useState("");
  const [producers, setProducers] = useState([]);
  const [cities, setCities] = useState([]);
  console.log(producers);
  console.log(cities);

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




  const onSubmit = async (values) => {
    console.log("values", values);
    const formData = new FormData();
    formData.append("name", values.name);


    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }
    try {
      const { status, data } = await axios.post("/api/cities/add", formData);
      console.log("data", data, "status", status);

      if (status === 201) {
        toast({
          title: "Success",
          description: "Product created successfully!",
        });
        reset();
        navigate("/dashboard/cities");
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
        <Link to={"/dashboard/cities"} className="mr-2">
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
          Ajouter city
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

          <Button className="mt-3 max-md:text-sm max-md:p-2" type="submit">
            {isSubmitting && <Loader className={"m-2 animate-spin"} />} Create
          </Button>
        </form>
      </FormProvider>
      {/* {showSuccessPopup && <SuccessPopup message="Product created successfully!" onClose={closeSuccessPopup} />} */}
    </>
  );
}
export default CitiesAdd;
