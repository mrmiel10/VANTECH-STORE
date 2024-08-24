import { Badge } from '@/components/ui/badge'
import React from 'react'
import clsx from 'clsx'
import { Check, Clock } from 'lucide-react'
const PaymentStatus = ({status,className}:{status:string,className?:string}) => {
  return (
    <Badge className={clsx(
        "text-xs pointer-events-none ",
        className,
      {"bg-green-400 text-green-200" : status.toLowerCase() === "paid"},
      {"bg-gray-300" : status.toLowerCase() === "pending"},
  
        
       )} >
        {status.toLowerCase() === "paid" && <Check className='size-4 mr-1'/>}
        {status.toLowerCase() === "pending" && <Clock className='size-4 mr-1'/>}
   
        {status}</Badge>
  )
}

export default PaymentStatus