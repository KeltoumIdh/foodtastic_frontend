import { BarChart } from "@mui/x-charts/BarChart";
import React, { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import axios from "../../../lib/axios";

export default function ChartCard() {
  const [products, setProducts] = useState([]);
  const [productsByCateg, setProductsByCateg] = useState([]);
  const [productsByProducer, setProductsByProducer] = useState([]);

  useEffect(() => {
    const fetchQuantitySoldByCategory = async () => {
      try {
        const response = await axios.get("/api/top/product/categ");
        setProductsByCateg(response.data);
        // console.log("response", response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des quantités vendues par catégorie :",
          error
        );
      }
    };
    fetchQuantitySoldByCategory();
  }, []);

  useEffect(() => {
    const fetchTopSellingProducts = async () => {
      try {
        const response = await axios.get("/api/top/product");
        setProducts(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des produits les plus vendus :",
          error
        );
      }
    };

    fetchTopSellingProducts();
  }, []);

  useEffect(() => {
    const fetchQuantitySoldByProducer = async () => {
      try {
        const response = await axios.get("/api/quantity/sold/producer");
        setProductsByProducer(response.data);
        // console.log("producer", response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des quantités vendues par producteur :",
          error
        );
      }
    };
    fetchQuantitySoldByProducer();
  }, []);
  // Vérifiez si les données sont disponibles ou non
  if (!products || products.length === 0) {
    return <div>Chargement...</div>;
  }

  // Extraire les noms des produits et les quantités vendues
  const productNames = products.map((product) => product.name);
  const quantitiesSold = products.map((product) => product.quantity_sold);

  // Extraire les noms des catégories et les quantités totales vendues
  const categoryNames = productsByCateg?.map(
    (product) => product.category_name
  );
  const totalQuantitiesSold = productsByCateg?.map(
    (product) => product.total_quantity_sold
  );

  // Extraire les noms des producteurs et les quantités totales vendues
  const producerNames = productsByProducer.map(
    (product) => product.producer_name
  );
  const totalQuantitiesSoldByProducer = productsByProducer.map(
    (product) => product.total_quantity_sold
  );

  return (
    <>
      <Card className="h-[100%] w-[100%] bg-gray-50">
        <h4 className="mb-4 text-lg font-medium leading-none p-4">
        Top Selling Products
        </h4>
        <BarChart
          series={[{ data: quantitiesSold }]}
          height={290}
          xAxis={[{ data: productNames, scaleType: "band" }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Card>
      <Card className="h-[100%] w-[100%] bg-gray-50">
        <h4 className="mb-4 text-lg font-medium leading-none p-4">
        Products Sold by Category
        </h4>
        <BarChart
          series={[{ data: totalQuantitiesSold }]}
          height={290}
          xAxis={[{ data: categoryNames, scaleType: "band" }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Card>
      <Card className="h-[100%] w-[100%] bg-gray-50">
        <h4 className="mb-4 text-lg font-medium leading-none p-4">
        Products Sold by Producer
        </h4>
        <BarChart
          series={[{ data: totalQuantitiesSoldByProducer }]}
          height={290}
          xAxis={[{ data: producerNames, scaleType: "band" }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      </Card>
    </>
  );
}
