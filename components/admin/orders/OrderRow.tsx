"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
export const OrderRow = () => {
  return (
    <TableRow >
    <TableHead>Customer</TableHead>
    <TableHead className="hidden sm:table-cell">
      Payment status
    </TableHead>
    <TableHead className="hidden sm:table-cell">
      Delivery Status
    </TableHead>
    <TableHead className="hidden md:table-cell">
      Date
    </TableHead>
    <TableHead className="text-right">Amount</TableHead>
  </TableRow>
  )
}

