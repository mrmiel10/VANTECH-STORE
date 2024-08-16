import React from 'react'
import { Badge } from '@/components/ui/badge'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import { Clock } from 'lucide-react'
import { LucideCircleX } from 'lucide-react'
import { TruckIcon } from 'lucide-react'
export const DeliveryStatusOrder = ({status}:{
    status:string
}) => {
  return (
    <Badge className={clsx(
        "text-xs pointer-events-none ",
      {"bg-green-500" : status.toLowerCase() === "delivered"},
      {"bg-gray-300" : status.toLowerCase() === "pending"},
      {"bg-muted-foreground" : status.toLowerCase() === "cancelled"},
      {"bg-orange-300" : status.toLowerCase() === "dispatched"},
        
       )} >
        {status.toLowerCase() === "delivered" && <Check className='size-4 mr-1'/>}
        {status.toLowerCase() === "pending" && <Clock className='size-4 mr-1'/>}
        {status.toLowerCase() === "cancelled" && <LucideCircleX className='size-4 mr-1'/>}
        {status.toLowerCase() === "dispatched" && <TruckIcon className='size-4 mr-1'/>}
        
        {status}</Badge>
  )
}

