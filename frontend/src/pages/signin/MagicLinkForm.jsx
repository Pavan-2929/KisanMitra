import { MagicLinkSchema } from "@/lib/validations";
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
import { Mail } from "lucide-react";
import LoadingButton from "@/components/controls/LoadingButton";

const MagicLinkForm = () => {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(MagicLinkSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values) => {
    const { email } = values;

    console.log(email);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
        <div className="w-full pt-3">
          <LoadingButton loading={loading} type="submit" className="w-full">
            Sign In with Magic Link
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default MagicLinkForm;
