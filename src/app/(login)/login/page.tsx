"use client";

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
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  return (
    <main className="grid place-content-center h-screen">
      <div className="relative">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>login with a magic link</CardDescription>
          </CardHeader>
          <form action="/api/auth/login" method="post">
            <CardContent>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="indiecreator@sideproject.com"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="w-full">Sign in</Button>
            </CardFooter>
          </form>
        </Card>
        <footer className="flex justify-center items-center gap-1 mt-3 absolute -bottom-10 w-full text-sm text-slate-500">
          <Image src="/sidey.svg" width={24} height={24} alt="Sidey logo" />
          <span className=" ml-1">Sidey • by</span>
          <Link
            href="https://twitter.com/JeegsCreator"
            target="_blank"
            className="underline"
          >
            @JeegsCreator
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default Login;
