"use client";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { Register } from "@/actions/register";
import { useState } from "react";
import { FormSucces } from "../form-success";
function RegisterForm() {
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSucess] = useState<string | undefined>("");
  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      const response = await Register(values);

      if (response.success) {
        setSucess(response.success);
        setError(""); // Clear any previous error
      } else {
        setError(response.error);
        setSucess(""); // Clear any previous success
      }
    } catch (error) {
      // Handle unexpected errors (e.g., network issues)
      console.error("Unexpected error occurred: ", error);
      setError("An unexpected error occurred");
      setSucess(""); // Clear any previous success
    }
  };
  const {
    formState: { isSubmitting },
  } = form;

  return (
    <CardWrapper
      headerLable="Create an account"
      backButtonLabel="Already have an account"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="john doe" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="akhan492@gmail.com"
                    {...field}
                  />
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
                  <Input placeholder="*********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormError message={error} />}
          {success && <FormSucces message={success} />}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            Create An Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default RegisterForm;
