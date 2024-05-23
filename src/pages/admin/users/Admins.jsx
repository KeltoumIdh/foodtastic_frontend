import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useToast } from "../../../components/ui/use-toast";
import axios from "../../../lib/axios";

export const Admins = () => {
    const [admins, setAdmins] = useState([]);
    console.log('admins',admins);
    const { toast } = useToast();
    const navigate = useNavigate();

    const fetchAdmins = async () => {
        try {
            const response = await axios.get("/api/admins");
            if (response.status === 200) {
                setAdmins(response?.data);
            } else {
                throw new Error("Failed to fetch admins");
            }
        } catch (error) {
            console.error("Error fetching admins:", error);
        }
    };

    useEffect(() => {

        fetchAdmins();
    }, []);

    const deleteAdmin = async (adminId) => {
        try {
            const response = await axios.delete(`/api/admins/delete/${adminId}`);
            if (response.status === 200) {

                toast({
                    title: "Success",
                    description: "Admin deleted successfully!",
                });

                fetchAdmins()
            }
        } catch (error) {
            console.error("Error deleting admin:", error);
        }
    };


    return (
        <div className="w-full">
             <div className="flex p-2 justify-between">
                <h4 className="text-2xl font-semibold ">
                    Admins
                </h4>
                <button
                    className=" select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none inline-block"
                    type="button"
                >
                    <Link className={"flex items-center"} to={"/dashboard/admins/add"}>
                        {" "}
                        Ajouter
                    </Link>
                </button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>

                            <TableHead>Name</TableHead>
                            <TableHead>
                                <Button variant="ghost">
                                    Email{" "}
                                    <CaretSortIcon className="ml-2 h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {admins?.map((admin) => (
                            <TableRow key={admin.id}>

                                <TableCell>{admin.name}</TableCell>
                                <TableCell>{admin.email}</TableCell>
                                <TableCell>{admin.role}</TableCell>
                                <TableCell>
                                      <Button className="bg-blue-400 mr-2">
                                        <Link
                                           to={`/dashboard/admins/edit/${admin.id}`}
                                        >
                                            Edit
                                        </Link>
                                    </Button>

                                    <Button
                                        className="bg-red-500"
                                        onClick={() => deleteAdmin(admin.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {/* Row selection information */}
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm">
                        Previous
                    </Button>
                    <Button variant="outline" size="sm">
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};
