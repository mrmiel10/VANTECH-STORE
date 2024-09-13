"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { object, z } from "zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";

import { toast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect } from "react";
import { usePathname } from "next/navigation";

import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useCallback } from "react";
import { filtersComputers } from "@/lib/listFiltersProducts";
export function CheckboxReactHookFormMultiple() {
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
  const filters: { [key: string]: string } = {};
  searchParams.forEach((value, key) => {
    filters[key] = value;
  });
  console.log(filters);
  const searchValues = Object.values(filters);
  console.log(searchValues);

  return (
    <>
      {isSelectedFilter ? (
        <Button
         className="mb-4"
          onClick={() => {
            clearAllFilters();

          }}
        >
          clear All filters
        </Button>
      ) : null}

      <div className="grid gap-4">
        {filtersComputers.map((item, _) => {
          return (
            <div className="grid gap-2" key={item.id}>
              <h3 className="text-base font-medium mb-2">{item.id}</h3>
              {item.value.map((i, index) => {
                return (
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
                );
              })}
            </div>
          );
        })}
      </div>
      <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        <code className="text-white">
          {JSON.stringify(searchValues, null, 2)}
        </code>
      </pre>
    </>
  );
}
