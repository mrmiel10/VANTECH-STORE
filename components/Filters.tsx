"use client"
import React, { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { filtersComputers } from "@/lib/listFiltersProducts";
import { filtersMouses } from "@/lib/listFiltersProducts";
import { filtersAllCategories } from "@/lib/listFiltersProducts";
import { CheckedState } from "@radix-ui/react-checkbox";
import { LucideFilter, LucideFilterX } from "lucide-react";
const Filters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isSelectedFilter, setIsSelectedFilter] = useState(false);
  let filtersProducts:{
    id:string,
    value:string[]
  }[] = []
if(pathname === "/category/desktop")  filtersProducts = [...filtersComputers]
else if(pathname === "/category/mouses") filtersProducts = [...filtersMouses]
else filtersProducts = [...filtersAllCategories]
  useEffect(() => {
    setIsSelectedFilter(false);
    const hasSelectedFilter = filtersComputers.some((item) =>
      item.value.some((i) => searchParams.has(i))
    );
    if (hasSelectedFilter) setIsSelectedFilter(true);
  }, [isSelectedFilter, searchParams]);

  const clearAllFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    // const hasSelectedFilter = filtersComputers.some((item)=> item.value.some((i) => searchParams.has(i)))
    for (const item of filtersComputers) {
      for (const i of item.value) {
        if (searchParams.has(i)) {
          params.delete(i);
        }
      }
      router.push(pathname + "?" + params.toString());
    }
  };

  const handleFilterChange = useCallback(
    (nameVal: string, checked: CheckedState) => {
      const params = new URLSearchParams(searchParams.toString());

      if (checked) {
        params.set(nameVal, nameVal);
      } else {
        params.delete(nameVal, nameVal);
      }
      router.push(pathname + "?" + params.toString());
    },
    [searchParams, pathname, router]
  );
  //Record<string,string>

  return (
    <div className=" gap-6 hidden lg:grid">
      <Card className="">
        <CardHeader className="p-6 md:p-3 space-y-3">
          <CardTitle>
            <div className="flex items-center gap-4">
              <Badge
                variant={"defaultBtn"}
                className="antialiased px-4 py-2 text-sm"
              >
                <LucideFilter className="size-4" />
                Filtres
              </Badge>
              {isSelectedFilter ? (
                <Button
                  className="ml-auto hover:text-blue-500 ease duration-150 transition"
                  variant="outline"
                  onClick={() => {
                    clearAllFilters();
                  }}
                >
                  clear All Filters
                  <LucideFilterX className="size-4" />
                </Button>
              ) : null}
            </div>
          </CardTitle>
          <Separator orientation="horizontal" />
        </CardHeader>
        <CardContent className="p-6 md:p-3">
          <div className="grid gap-4 h-[300px] md:overflow-y-auto">
            {filtersProducts.map((item, _) => {
              return (
                <div key={item.id!}>
                  <h3 className="text-base font-medium mb-2">{item.id}</h3>
                  <div className="space-y-4">
                  {item.value.map((i, index) => {
                    return (
                      <div className="grid gap-2" key={index}>
                        <Label
                          key={index}
                          className="flex items-center gap-2 font-normal"
                        >
                          <Checkbox
                            checked={searchParams.has(i)}
                            onCheckedChange={(checked) =>
                              handleFilterChange(i, checked)
                            }
                          />
                          {i}
                        </Label>
                      </div>
                    );
                  })}
                  </div>
             
                </div>
              );
            })}
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
};

export default Filters;
