"use client"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React from 'react'
import { useCopyToClipboard } from 'usehooks-ts';
import {toast} from "sonner"
import { Copy } from 'lucide-react';
export const CopyIdOrder = ({orderId}:{orderId:string}) => {
    const [copiedText, copy] = useCopyToClipboard();
    return (
    <DropdownMenuItem 
    onClick={() =>{ 
        copy(orderId)
        .then(() => {
       toast.success("copied to clipboard!")
        })
        .catch(error => {
         toast.error('Failed to copy!')
        })
      }
        
    }
    className="w-full flex gap-1">
    <Copy className="size-5" />
   copy order ID
    </DropdownMenuItem>
  
  )
}

