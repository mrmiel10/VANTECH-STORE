import { Badge } from '@/components/ui/badge';
import React from 'react'
import clsx from "clsx";
const Status = ({status}:{
    status:string
}) => {
  return (
   <Badge className={clsx(
    "",
    status === "draft" ? "text-blue-500" : "text-white",
    
   )} variant={status === "active" ? "active" : status === "archive" ? "archive" : "secondary"}>{status}</Badge>
  )
}

export default Status