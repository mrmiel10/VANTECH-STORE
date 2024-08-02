"use client"
import React from "react";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import clsx from "clsx";
const FiltersByRating = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const setFilterByRating = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (searchParams.has(name, value)) {
      params.delete(name, value);
    } else {
      params.set(name, value);
    }
    router.push(pathname + "?" + params.toString());
  };
  const ButtonRatings = Array.from({ length: 5 }, (_, i) => (
    <Button
      onClick={() => {
        setFilterByRating("rating", String(i + 1));
      }}
      key={i + 1}
      variant={
        searchParams.has("rating", String(i + 1)) ? "defaultBtn" : "outline"
      }
      className={clsx(
        "mr-2 hover:text-blue-500 transition text-muted-foreground",
        searchParams.has("rating", String(i + 1))
          ? "text-white hover:text-white"
          : "hover:text-blue-500"
      )}
    >
      {i + 1}
    </Button>
  ));

  return (
    <div className="flex max-md:flex-col max-md:items-start items-center  mb-4 gap-2 ">
      <span className="antialiased mr-2 text-muted-foreground font-semibold">Filter by rating:</span>
      <div> {ButtonRatings}</div>
    </div>
  );
};

export default FiltersByRating;
