"use client";

import { useForm } from "react-hook-form";
import { type z } from "zod";
import { loginSchema } from "~/server/schema/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { loginAction } from "~/server/action/login-action";
import { useState } from "react";
import { ErrorMessage } from "./error-message";
import { SuccessMessage } from "./success-message";
import { redirect } from "next/navigation";

export function LoginForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, status } = useAction(loginAction, {
    onSuccess(args) {
      if (args.data?.success) {
        setSuccess(args.data.success);
        setError("");
        redirect("/");
      }
      if (args.data?.error) {
        setError(args.data.error);
        setSuccess("");
      }
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    execute(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="johndoe@gmail.com"
                  autoComplete="email"
                  {...field}
                  disabled={status === "executing"}
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
                <Input
                  type="password"
                  placeholder="******"
                  {...field}
                  autoComplete="current-password"
                  disabled={status === "executing"}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <ErrorMessage message={error} />}
        {success && <SuccessMessage message={success} />}
        <Button
          type="submit"
          className="w-full"
          disabled={status === "executing"}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}
