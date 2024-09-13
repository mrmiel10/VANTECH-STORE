"use client";
import React from "react";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQueryState } from "nuqs";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
export const AdminSearch = ({ placeholder }: { placeholder: string }) => {
  const [search, setsearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    throttleMs: 500,
    // clearOnDefault: true
  });
  const searchParams = useSearchParams();
  console.log(search);
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setsearch(term);
  };

  return (
    <Card className="w-full bg-muted px-8 md:px-12 py-8 flex">
      <div className="relative  w-full">
        <Search
          className={clsx(
            "absolute left-2.5 top-4 h-4 w-4 text-muted-foreground",
            { hidden: search !== "" }
          )}
        />
        <Input
          type="search"
          placeholder={placeholder}
          className="py-6 border-input text-muted-foreground w-full rounded-lg bg-background pl-8 ring-blue-500 focus:ring-blue-500"
          value={search}
          // defaultValue={searchParams.get("query")?.toString() || ""}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>
    </Card>
  );
};
