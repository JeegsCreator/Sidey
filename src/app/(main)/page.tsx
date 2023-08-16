"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="w-full h-[90vh] flex justify-center items-center flex-col">
        <h1 className="text-6xl font-bold">Welcome to Sidey!</h1>
        <p className="text-lg font-semibold">A hub for your Side Projects</p>
        <Button className="mt-4" asChild>
          <Link href="/feed">Get started</Link>
        </Button>
      </section>
    </main>
  );
}
