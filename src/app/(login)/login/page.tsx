"use client";

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
import { Label } from "@/components/ui/label";

const Login = () => {
  return (
    <main className="grid place-content-center h-screen">
      <CardSideyFooter>
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
                required
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button className="w-full">Sign in</Button>
            </CardFooter>
          </form>
        </Card>
      </CardSideyFooter>
    </main>
  );
};

export default Login;
