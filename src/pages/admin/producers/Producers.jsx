import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiSolidShow } from "react-icons/bi";
import { RiEditFill } from "react-icons/ri";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../../components/ui/pagination";

import { Button } from "../../../components/ui/button";
// import {
//     Avatar,
//     AvatarImage,
//     AvatarFallback,
// } from "../../components/ui/avatar";
// import { Image } from "@radix-ui/react-avatar";
// import { backEndUrl } from "@/helpers/utils";
import axios from "../../../lib/axios";

function Producers() {
  const [categories, setCategories] = useState([]);
  const [producers, setProducers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducers, setTotalProducers] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleSearch = () => {
    console.log("Search Query2:", searchQuery);
    getProducers(0, rowsPerPage, searchQuery, searchStatus);
  };
  const handleChangeSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const getProducers = async (page, perPage, query = "", status = "") => {
    try {
      const res = await axios.get("/api/producers", {
        params: {
          page: page + 1,
          per_page: perPage,
          query: query, // Use consistent naming (either 'query' or 'search')
          status: status || "", // Ensure status is set to an empty string if not provided
        },
      });

      const data = res?.data ?? [];
      console.log('data',data);
      const total = res.data?.total_pages ?? 0;
      const totalProducersCount = res.data?.total ?? 0;

      setProducers(data);
      setTotalPages(total);
      setTotalProducers(totalProducersCount);
      getCategories();
      getProducers();
    } catch (err) {
      console.log("err", err);
    }
  };
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
  const getCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  // const getProducers = async () => {
  //   try {
  //     const res = await axios.get("/api/producers");
  //     setProducers(res.data);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/producers/delete/${id}`);
      setProducers((prevProducers) =>
        prevProducers.filter((producer) => producer.id !== id)
      );
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    getProducers(page, rowsPerPage, searchQuery, searchStatus);
  }, [page, rowsPerPage, searchQuery, searchStatus]);

  return (
    <>
      <div className="flex p-2 justify-between">
        <h4 className="lg:text-2xl text-lg font-semibold dark:text-gray-300">
          Producers
        </h4>
        <button
          className=" select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 lg:py-2 lg:px-4 px-2 text-center align-middle font-sans md:text-xs text-[10px] font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none inline-block"
          type="button"
        >
          <Link className={"flex items-center"} to={"/dashboard/producers/add"}>
            {" "}
            Ajouter
          </Link>
        </button>
      </div>


      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Producer</TableHead>
            <TableHead>cantact_info</TableHead>
            <TableHead>city</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {producers?.length > 0 &&
            producers.map((producer) => (
              <TableRow key={producer.id}>
                <TableCell className="flex items-center max-md:p-2">
                  <div className="flex flex-col">
                    <div>{producer.name}</div>
                  </div>
                </TableCell>
                <TableCell className="max-md:p-2 text-center">
                  {producer.contact_info}
                </TableCell>
                <TableCell className="max-md:p-2 text-center">
                  {producer.city_id}
                </TableCell>

                <TableCell className="max-md:p-2 flex items-center h-full">
                  <Button className="bg-blue-400 mr-2 max-md:px-3">
                    <Link to={`/dashboard/producers/edit/${producer.id}`}>
                      <RiEditFill />
                    </Link>
                  </Button>
                  {/* <Button className="bg-purple-400 mr-2 max-md:px-3">
                                        <Link
                                            to={`/producers/details/${producer.id}`}
                                        >
                                            <BiSolidShow/>
                                        </Link>
                                    </Button> */}
                  <Button
                    className="bg-red-500"
                    onClick={() => handleDelete(producer.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4 px-4">
        <div className="w-full">
          <p className="text-sm w-full text-gray-500">
            Showing {producers.length} of {totalProducers} producers
          </p>
        </div>
        <Pagination className="flex justify-end">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => handleChangePage(e, page - 1)}
                style={{ color: page > 0 ? "blue" : "gray" }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => handleChangePage(e, index)}
                  style={{
                    color: index === page ? "red" : "black",
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => handleChangePage(e, page + 1)}
                style={{
                  color: page < totalPages - 1 ? "blue" : "gray",
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}

export default Producers;
