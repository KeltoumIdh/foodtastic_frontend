import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { toast, useToast } from "../../../components/ui/use-toast";
import axios from "../../../lib/axios";

const formSchema = z.object({
  name: z.string().min(2).max(20),
  email: z.string().email().min(2).max(30),
  password: z.string().min(8).max(30),
});

export default function AdminAdd() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const {
    control,
    setError,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    console.log("values", values);

    try {
      const { status, data } = await axios.post("/api/admins/add", values);
      console.log("data", data, "status", status);

      if (status === 201) {
        toast({
          title: "Success",
          description: "Admin created successfully!",
        });
        navigate("/dashboard/admins");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        Object.entries(error.response.data.errors).forEach((error) => {
          const [fieldName, errorMessages] = error;
          setError(fieldName, {
            message: errorMessages.join(),
          });
        });
    } else if (error.response && error.response.data && error.response.data.message) {
        // Handle other types of errors returned by the server
        const errorMessage = error.response.data.message;
        // Display the error message to the user
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
        });
      } else {
        // Handle unexpected errors
        console.error("Unexpected error:", error);
        toast({
          title: "Error",
          description: "An unexpected error occurred. Please try again later.",
          status: "error",
        });
      }
    }
  };

  return (
    <div className="w-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Input placeholder="admin" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isSubmitting} type="submit" className="w-20">
            {isSubmitting && <Loader className="mx-2 my-2 animate-spin" />}{" "}
            Create
          </Button>
        </form>
      </Form>
    </div>
  );
}
