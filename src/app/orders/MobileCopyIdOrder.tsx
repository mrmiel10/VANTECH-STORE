"use client"
import React from 'react'
import {toast} from "sonner"
import { useCopyToClipboard } from 'usehooks-ts';
import CopyPasteButton from '../../../components/CopyPasteButton';
const MobileCopyIdOrder = ({orderId}:{orderId:string}) => {
    const [copiedText, copy] = useCopyToClipboard();
  return (
    <div 
    
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
        >
        <CopyPasteButton className="bg-muted flex items-center justify-center size-6 rounded-md  text-muted-foreground hover:text-blue-500 " />
      </div>
  )
}

export default MobileCopyIdOrder