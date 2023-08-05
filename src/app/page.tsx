"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1>Avocado</h1>
        <Button>Click me</Button>
      </main>
    </>
  );
}
