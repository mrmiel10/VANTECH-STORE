"use client"
import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import clsx from 'clsx';
  import { useQueryState } from 'nuqs';
  import { useSearchParams } from 'next/navigation';
export const SelectShowAs = () => {
    const searchParams = useSearchParams()
    const [role, setRole] = useQueryState("role", {
        defaultValue: "",
        shallow: false,
      });
  return (
    <Select
    onValueChange={(value) =>
        value.toLowerCase() === "all roles"
          ? setRole("")
          : setRole(value)
      }
    >
    <SelectTrigger
      className="h-8 px-3 py-0"
      id="paymentStatus"
      aria-label="All"
    >
      <SelectValue
        placeholder="Show all roles"
        className="w-full"
      />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="all roles">Show all roles</SelectItem>
      {["ADMIN", "SUPERADMIN"].map((role, _) => (
        <SelectItem
          key={role}
          className={clsx(
            "",
            {"bg-muted text-blue-500": searchParams.has("role",role)}
          )
        
          }
          value={role === "ADMIN" ? role : "SUPER ADMIN"}
        >
          Show as {role}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

  )
}
