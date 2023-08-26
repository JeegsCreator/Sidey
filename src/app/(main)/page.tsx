"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

{
  /* <motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1, backgroundColor: "#f00" }}
  viewport={{ once: false, margin: "200px" }}
>
  <h1 className="text-6xl font-bold">Welcome to Sidey!</h1>
  <p className="text-lg font-semibold">A hub for your Side Projects</p>
  <Button className="mt-4" asChild>
    <Link href="/feed">Get started</Link>
  </Button>
</motion.div> */
}

export default function Home() {
  return (
    <main className="grid grid-cols-3 gap-4 px-40 py-10">
      <section className="col-start-1 col-end-3">
        <Card className="bg-slate-50">
          <CardHeader className="space-y-0">
            <CardTitle className="text-xl mb-0">Welcome to Sidey!</CardTitle>
            <CardDescription className="mt-0">
              The place to share your side project and get feedback from the
              community
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
      <section className="col-start-3 col-end-4">
        <Card>
          <CardHeader>
            <CardTitle>Welcome to Sidey!</CardTitle>
            <CardDescription>
              The place to share your side project and get feedback from the
              community
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
    </main>
  );
}
