import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button.jsx";
import { Loader } from "lucide-react";
import { useToast } from "../../../components/ui/use-toast.js";
import axios from "../../../lib/axios.jsx";
import ReturnBackBtn from "../../../components/Shared/ReturnBackBtn.jsx";

export default function CityEdit() {
    const { id } = useParams();
    const { toast } = useToast();
    const navigate = useNavigate();

    const [city, setCity] = useState({
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
        const fetchCity = async () => {
            try {
                const response = await axios.post(`/api/cities/${id}`);
                console.log('citiescitiescitiescities',response)
                if (response.status === 200) {
                    setCity(response.data);
                } else {
                    throw new Error("Failed to fetch city data");
                }
            } catch (error) {
                console.error("Error fetching city data:", error);
            }
        };

        fetchCity();
    }, [id]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCity((prevCity) => ({
            ...prevCity,
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

            const response = await axios.post(
                `/api/Categories/update/${id}`,
                formData
            );

            if (response.status === 200) {
                toast({
                    title: "Success",
                    description: "City updated successfully!",
                });
                navigate("/Categories");
            }
        } catch (error) {
            console.error("Error updating city:", error);
            toast({
                title: "Error",
                description: "Failed to update city. Please try again.",
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
                        value={city.name}
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
