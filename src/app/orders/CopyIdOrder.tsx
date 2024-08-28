"use client"
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import React from 'react'
import { useCopyToClipboard } from 'usehooks-ts';
import {toast} from "sonner"
import { Copy } from 'lucide-react';
export const CopyIdOrder = () => {
    const [copiedText, copy] = useCopyToClipboard();
    return (
    <DropdownMenuItem 
    onClick={() =>{ 
        copy("fffffgf")
        .then(() => {
       toast.success("copied to clipboard!")
        })
        .catch(error => {
         toast.error('Failed to copy!')
        })
      }
        
    }
    className="w-full flex gap-1 justify-center items-center">
    <Copy className="size-5" />
   copy order ID
    </DropdownMenuItem>
  
  )
}

