import { LoginSchema } from "@/lib/validations";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { FormInput } from "@/components/controls/FormInput";
import { Lock, Mail, User } from "lucide-react";
import LoadingButton from "@/components/controls/LoadingButton";
import { useDispatch } from "react-redux";
import { PasswordInput } from "@/components/controls/PasswordInput";
import { login, logout } from "@/lib/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const LoginForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const { email, password } = values;

      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
        email, password
      }, {
        headers: {
          'Content-Type': "application/json"
        },
      })
      if (res.data) {
        toast.success(res.data.message || "Login successful!");
        localStorage.setItem("userId", JSON.stringify(res.data.userId));
        dispatch(login());
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
      console.log(error)
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={(e) => {
        e.preventDefault();

        form.handleSubmit(
          (values) => {
            onSubmit(values);
          },
          (errors) => {
            console.log("Validation failed:", errors);  // Log errors
          }
        )(e);
      }} className="space-y-3">
        {error && (
          <p className="text-medium text-destructive text-center">{error}</p>
        )}
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
        <p className="text-muted-foreground mt-3 flex w-full cursor-pointer justify-end gap-1 text-sm hover:underline">
          Forget Password?{" "}
        </p>
        <div className="w-full pt-3">
          <LoadingButton loading={loading} type="submit" className="w-full disabled:opacity-50">
            Sign In
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
