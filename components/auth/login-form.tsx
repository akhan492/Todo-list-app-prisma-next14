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
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormError } from "../form-error";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import { FormSucces } from "../form-success";
type successAndError = {
  success?: string;
  error?: string;
};

function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | undefined>("");
  const [success, setSucess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSucess("");

    startTransition(() => {
      login(values)
        .then((data: successAndError) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            // form.reset();
            setSucess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  const {
    formState: { isSubmitting },
  } = form;
  return (
    <CardWrapper
      headerLable="Welcome Back"
      backButtonLabel="Don't Have an Account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="akhan492@gmail.com" {...field} />
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
          <Button className="w-full" type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}

export default LoginForm;
