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
import { Activity, BadgePlus } from "lucide-react";
import UpdateItem from "@/components/update/UpdateItem";

export default function Home() {
  return (
    <>
      <header className="px-20 flex gap-3 py-6">
        <Button className="rounded-full flex gap-1.5" size="sm">
          <Activity size={20} />
          Today
        </Button>
        <Button
          className="rounded-full flex gap-1.5"
          size="sm"
          variant={"outline"}
        >
          <BadgePlus size={20} />
          Newest projects
        </Button>
      </header>
      <main className="grid grid-cols-3 px-20 ">
        <section className="col-start-1 col-end-3 pr-4 min-h-screen border-r  border-[hsl(var(--border))]">
          <Card className="bg-[hsl(var(--accent))] card">
            <CardHeader className="space-y-0 cardheader">
              <CardTitle className="text-xl mb-0">Welcome to Sidey!</CardTitle>
              <CardDescription className="mt-0">
                <span>
                  The place to share your side project and get feedback from the
                  community.
                </span>
                <Link href="/" className="underline ml-1">
                  Take a tour
                </Link>
              </CardDescription>
            </CardHeader>
          </Card>
          {Array(5).fill(
            <UpdateItem
              update={{ title: "title", description: "description..." }}
            />,
          )}
        </section>
        <section className="col-start-3 col-end-4 pl-4 min-h-screen">
          <Card>
            <CardHeader>
              <CardTitle>Side Project of the Week</CardTitle>
              <CardDescription>
                The place to sh are your side project and get feedback from the
                community
              </CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>
    </>
  );
}
