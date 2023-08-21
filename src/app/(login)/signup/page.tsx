"use client";

import { useRouter } from "next/navigation";
import CardSideyFooter from "@/components/CardSideyFooter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { Router } from "next/router";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be 3 or more characters long" })
    .trim(),
  username: z
    .string()
    .min(3, { message: "Username must be 3 or more characters long" })
    .toLowerCase()
    .trim(),
  twitter: z.optional(
    z
      .string()
      .startsWith("@", { message: "Twitter must start with '@'" })
      .trim()
  ),
});

const Page = () => {
  const [usernameError, setUsernameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.status === 401) return setUsernameError(true);
    if (res.status === 302) router.push("/");
    if (res.status === 301) router.push("/login");
    setLoading(false);
  }

  return (
    <>
      <main className="h-screen grid place-content-center">
        <CardSideyFooter>
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Sidey!</CardTitle>
              <CardDescription>
                Now it&apos;s time to create your profile. You can change it
                later in &apos;Profile Settings&apos;
              </CardDescription>
            </CardHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="grid grid-cols-1 gap-3 w-full h-full">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Name *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field, fieldState: { error } }) => {
                      return (
                        <FormItem>
                          <FormLabel>Username *</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage>
                            {usernameError &&
                              "Username is already used. Choose a different one"}
                          </FormMessage>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name="twitter"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Twitter</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="@username" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button type="submit" disabled={loading}>
                    {loading && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </Card>
        </CardSideyFooter>
      </main>
    </>
  );
};

export default Page;
