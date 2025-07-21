import { RegisterSchema } from "@/lib/validations";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { FormInput } from "@/components/controls/FormInput";
import { Lock, Mail, User } from "lucide-react";
import LoadingButton from "@/components/controls/LoadingButton";
import { PasswordInput } from "@/components/controls/PasswordInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      usernmae: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values)
    const fullName = values.username;
    const email = values.email;
    const password = values.password;
    setLoading(true);
    setError(null);
    try {
      console.log(fullName, email, password);
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/register`, { fullName, email, password }, { headers: { "Content-Type": "application/json", } }
      );

      toast.success(res.data.message || "Registration successful!");
      navigate("/signin");
      form.reset();
      console.log(res);
    } catch (err) {
      console.error("Error submitting form:", err);
      toast.error(err.response?.data?.message || "Internal server error!");
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
    console.log(email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && (
          <p className="text-medium text-destructive text-center">{error}</p>
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <FormInput
                  placeholder="Username"
                  {...field}
                  icon={<User className="text-primary size-5" />}
                />
              </FormControl>
              <FormDescription />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <FormInput
                  placeholder="Email"
                  {...field}
                  icon={<Mail className="text-primary size-5" />}
                />
              </FormControl>
              <FormDescription />
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
                <PasswordInput
                  placeholder="Password"
                  {...field}
                  icon={<Lock className="text-primary size-5" />}
                />
              </FormControl>
              <FormDescription />
            </FormItem>
          )}
        />
        <div className="w-full pt-3">
          <LoadingButton loading={loading} type="submit" className="w-full">
            Sign In
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default RegisterForm;
