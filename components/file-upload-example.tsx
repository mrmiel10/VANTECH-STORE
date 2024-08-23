"use client"
import React from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { fileUploadAction } from '@/lib/actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { createServerAction } from 'zsa'
import { useServerAction } from 'zsa-react'
export const FileUpload = () => {
    const router = useRouter()
    const fileUpload = useServerAction(fileUploadAction,{
        onSuccess:()=>{
            router.refresh()
            toast.success(fileUpload.data!)
        },
        onError:(err)=>{
            toast.error(JSON.stringify(err.err.fieldErrors))
        },
    })
   
  return (
   <form action={fileUpload.executeFormAction} className='flex flex-col gap-4'>
    <label>Name:
        <Input type='text' name='name' />
    </label>
    <label>
        File:
        <Input type="file" name="file"  />
    </label>
    <Button type='submit' disabled={fileUpload.isPending}>Upload</Button>
   </form>
  )
}

