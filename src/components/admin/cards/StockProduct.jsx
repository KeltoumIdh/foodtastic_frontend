import React, { useEffect, useState } from "react";

import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import { Link } from "react-router-dom";
import { TableCell } from "@mui/material";
import axios from "../../../lib/axios";

export function StockCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAvailableProducts = async () => {
      try {
        const response = await axios.get("/api/stock/product");
        setProducts(response.data);
        console.log("stock", response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des produits rupture de stock :",
          error
        );
      }
    };

    fetchAvailableProducts();
  }, []);
  const getStatusColorClass = (status) => {
    switch (status) {
      case "Stock faible":
        return "bg-yellow-100 text-yellow-800";
      case "Disponible":
        return "bg-green-100 text-green-800";
      case "Rupture de stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  return (
    <ScrollArea className="h-full w-100 rounded-md border bg-gray-50">
      <div className="p-4  ">
        <h4 className="mb-4 text-lg font-medium leading-none py-4">
        Products Out of Stock
        </h4>

        <div className="flex flex-row justify-between">
          <div className="text-sm font-medium">Product Name</div>
          <div className="text-sm font-medium">Quantity Available</div>
          <div className="text-sm font-medium">Statut</div>
        </div>
        <Separator className="my-2" />

        {products.map((product) => (
          <>
            <div className="flex flex-row justify-between" key={product.id}>
              <div className="text-sm">{product.name}</div>
              <div className="text-sm">{product.quantity_available}</div>
              <div className="text-sm">
                <div>
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColorClass(
                      product.status
                    )}`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
