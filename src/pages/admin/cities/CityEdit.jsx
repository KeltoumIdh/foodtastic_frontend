import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button.jsx";
import { Loader } from "lucide-react";
import { useToast } from "../../../components/ui/use-toast.js";
import axios from "../../../lib/axios.jsx";

export default function CategoryEdit() {
    const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
    categorie: "",
    producer: "",
    price: "",
    quantity_available: "",
    image: "",
  });
  const [categories, setCategories] = useState([]);
  const [producers, setProducers] = useState([]);
  const [newImage, setNewImage] = useState({});
  const [isProgress, setInProgress] = useState(false);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.post(`/api/Categories/edit/${id}`);
        if (response.status === 200) {
          setCategory(response.data);
        } else {
          throw new Error("Failed to fetch category data");
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };



    fetchCategory();
  }, [id]);

  const handleFileChange = (event) => {
    const newImage = event.target.files[0];
    if (newImage) setNewImage(newImage);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
  };

  const onSubmit = async (data) => {
    try {
      setInProgress(true);

      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("image", newImage);

      const response = await axios.post(`/api/Categories/update/${id}`, formData);

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Category updated successfully!",
        });
        navigate("/Categories");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast({
        title: "Error",
        description: "Failed to update category. Please try again.",
        status: "error",
      });
    } finally {
      setInProgress(false);
    }
  };

  return (
    <>
      <div className="flex items-center p-2">
        <Link to={"/Categories"} className="mr-2">
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
          Modifier categorie
        </h4>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 p-2">
        <div className="mb-3">
          <label htmlFor="name" className="block mb-1 max-md:text-sm">
            Nom *
          </label>
          <input
            placeholder="Nom"
            value={category.name}
            onChange={handleChange}
            name="name"
            className="w-full md:p-2 px-2 py-1 max-md:text-xs border border-gray-300 rounded"
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
