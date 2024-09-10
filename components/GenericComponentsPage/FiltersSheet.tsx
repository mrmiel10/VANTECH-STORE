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
import { CheckedState } from "@radix-ui/react-checkbox";
import { LucideFilter, LucideFilterX } from "lucide-react";
import { SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
  } from "@/components/ui/tooltip";
const FiltersSheet = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isSelectedFilter, setIsSelectedFilter] = useState(false);

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
    <div className="block lg:hidden">
      <Sheet  >
        <SheetTrigger asChild>
          <Button className="text-muted-foreground" variant={"outline"} size={"sm"}>
            <SlidersHorizontal className="size-4 mr-2" /> Filters
          </Button>
        </SheetTrigger>
        <SheetContent side={"left"} className=" overflow-y-auto space-y-4 w-3/4 bg-white p-7">
          <SheetHeader className="">
            {/* <SheetTitle>Edit profile</SheetTitle> */}
            <div className="flex items-center max-sm:items-start gap-1">
              <Badge
                variant={"defaultBtn"}
                className=" antialiased px-4 py-2 text-sm"
              >
                <LucideFilter className="size-4" />
                Filtres
              </Badge>
              {isSelectedFilter ? (
                    <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger >
                       
                      <Button
                size={"sm"}
                  className="p-2  group ease duration-150 transition"
                  variant="ghost"
                  onClick={() => {
                    clearAllFilters();
                  }}
                >               
                   <LucideFilterX className="transition ease group-hover:text-blue-500 text-muted-foreground   size-6" />
                </Button>
                      </TooltipTrigger>
                      <TooltipContent className="">
                        <p className="text-blue-500">Clear all filters</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              
                
              ) : null}
               
            </div>
            {/* <SheetDescription>
              Make changes to your profile here. Click save when you're done.
            </SheetDescription> */}
          </SheetHeader>
          <div className="grid gap-4 md:overflow-y-auto">
            {filtersComputers.map((item, _) => {
              return (
                <div key={item.id}>
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

          {/* <SheetFooter>
            <SheetClose asChild>
              <Button type="submit">Save changes</Button>
            </SheetClose>
          </SheetFooter> */}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FiltersSheet;
