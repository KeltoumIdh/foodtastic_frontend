import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useToast } from "../../../components/ui/use-toast";
import axios from "../../../lib/axios";

const AdminEdit = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await axios.get(`/api/admins/edit/${id}`);
        if (response.status === 200) {
          setAdminData(response.data);
        } else {
          throw new Error("Failed to fetch admin data");
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchAdmin();
  }, [id]);

  const updateAdmin = async () => {
    try {
      const response = await axios.put(`/api/admins/${id}`, adminData);
      if (response.status === 200) {
        toast({
          title: "Success",
          description: "Admin updated successfully!",
        });
        navigate('/dashboard/admins')
      }
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <div className="flex items-center p-2">
        <Link to={"/dashboard/admins"} className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
        <h2 className="text-2xl font-semibold ">
          Modifier admin
        </h2>
      </div>
      <div>
        <label>Name</label>
        <Input
          type="text"
          name="name"
          value={adminData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Email</label>
        <Input
          type="email"
          name="email"
          value={adminData.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Role</label>
        <Input
          type="text"
          name="role"
          value={adminData.role}
          onChange={handleChange}
        />
      </div>
      {/* <div>
        <label>Password</label>
        <Input
          type="password"
          name="password"
          value={adminData.password}
          onChange={handleChange}
        />
      </div> */}
      <div className="py-4">
        <Button onClick={updateAdmin}>Update Admin</Button>
      </div>
    </div>
  );
};

export default AdminEdit;
