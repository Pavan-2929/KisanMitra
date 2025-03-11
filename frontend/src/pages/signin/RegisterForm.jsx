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
import { FormInput } from "@/components/controls/FormInput";
import { Lock, Mail, User } from "lucide-react";
import LoadingButton from "@/components/controls/LoadingButton";
import { PasswordInput } from "@/components/controls/PasswordInput";

const RegisterForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      usernmae: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const { email } = values;

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
