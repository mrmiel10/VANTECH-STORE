import React from 'react'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import { Clock } from 'lucide-react'
import { LucideCircleX } from 'lucide-react'
import { TruckIcon } from 'lucide-react'
export const DeliveryStatusOrder = ({status,className}:{
    status:string,
    className?:string
}) => {
  return (
    <Badge className={clsx(
        "text-xs pointer-events-none ",
        className,
      {"bg-green-400 text-green-200" : status.toLowerCase() === "delivered"},
      {"bg-gray-300 text-muted" : status.toLowerCase() === "pending"},
      {"bg-red-500 text-red-300" : status.toLowerCase() === "cancelled"},
      {"bg-orange-400 text-orange-200" : status.toLowerCase() === "dispatched"},
        
       )} >
        {status.toLowerCase() === "delivered" && <Check className='size-4 mr-1'/>}
        {status.toLowerCase() === "pending" && <Clock className='size-4 mr-1'/>}
        {status.toLowerCase() === "cancelled" && <LucideCircleX className='size-4 mr-1'/>}
        {status.toLowerCase() === "dispatched" && <TruckIcon className='size-4 mr-1'/>}
        
        {status[0].toLowerCase() + status.slice(1)}</Badge>
  )
}

