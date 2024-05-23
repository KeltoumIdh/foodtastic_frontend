import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button.jsx";
import { Loader } from "lucide-react";
import { useToast } from "../../../components/ui/use-toast.js";
import axios from "../../../lib/axios.jsx";
import ReturnBackBtn from "../../../components/Shared/ReturnBackBtn.jsx";

export default function ProducerEdit() {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [producer, setProducer] = useState({
    id: "",
    name: "",
    contact_info: "",
    city_id: "",
  });
  const [cities, setCities] = useState([]);
  const [isProgress, setInProgress] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchProducer = async () => {
      try {
        const response = await axios.get(`/api/producers/edit/${id}`);
        if (response.status === 200) {
          setProducer(response.data);
        } else {
          throw new Error("Failed to fetch producer data");
        }
      } catch (error) {
        console.error("Error fetching producer data:", error);
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

    fetchProducer();
    fetchCities();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducer((prevProducer) => ({
      ...prevProducer,
      [name]: value,
    }));
  };

  const onSubmit = async (data) => {
    try {
      setInProgress(true);

      const formData = new FormData();
      formData.append("name", producer.name);
      formData.append("contact_info", producer.contact_info);
      formData.append("city_id", producer.city_id);

      const response = await axios.put(`/api/producers/update/${id}`, formData);

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Producer updated successfully!",
        });
        navigate(-1);
      }
    } catch (error) {
      console.error("Error updating producer:", error);
      toast({
        title: "Error",
        description: "Failed to update producer. Please try again.",
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
          Modifier producer
        </h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-2">
        <div className="mb-3">
          <label htmlFor="name" className="block mb-1 max-md:text-sm">
            Nom *
          </label>
          <input
            placeholder="Nom"
            value={producer.name}
            onChange={handleChange}
            name="name"
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact_info" className="block mb-1 max-md:text-sm">
            Contact info *
          </label>
          <input
            placeholder="Contact info"
            value={producer.contact_info}
            onChange={handleChange}
            name="contact_info"
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city_id" className="block mb-1 max-md:text-sm">
            City
          </label>
          <select
            name="city_id"
            value={producer.city_id}
            onChange={handleChange}
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
            {...register("city_id", { required: "City is required" })}
          >
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {errors.city_id && <span className="text-red-500">{errors.city_id.message}</span>}
        </div>
        <Button className="mt-3 max-md:text-sm max-md:p-2" type="submit">
          {isProgress && <Loader className={"mx-2 my-2 animate-spin"} />}
          Modifier
        </Button>
      </form>
    </>
  );
}
