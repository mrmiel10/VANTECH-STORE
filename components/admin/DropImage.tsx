import React from 'react'
import { Upload } from 'lucide-react'
import { useCallback } from 'react'
import {useDropzone} from 'react-dropzone'
import clsx from 'clsx'
import { imageType } from '@/app/admin/add-products/AddProductsForme'
import Image from 'next/image'
import Shoe from "../../public/blackShoe.jpg";
interface DropImageProps {
  item?:imageType,
    handleFileChange:(value:File) => void
}
export const DropImage:React.FC<DropImageProps>  = ({item,handleFileChange}) => {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    if(acceptedFiles.length > 0){
        handleFileChange(acceptedFiles[0])
    }
  }, [handleFileChange])
  const {getRootProps, getInputProps, isDragActive,} = useDropzone({onDrop,
    accept:{"image/*":[".jpeg",".png"]},
})
  return (
    <div   {...getRootProps()} className={clsx(
         "  w-full h-full rounded-lg flex justify-center items-center text-sm text-blue-500 cursor-pointer hover:bg-muted ",
        // className
    )}>
         <input  {...getInputProps()} />
      {isDragActive ?  <div className='w-full h-full aspect-square relative'>
      {/* <Image src={Shoe} alt="shoe image" fill className='object-cover' /> */}
      <p>fffff</p>
      </div>:(
        // <Image src={Shoe} alt="shoe image" fill className='object-contain' />
   <Upload className='text-muted-foreground' />
      ) }
      
    
  
  </div>
  )
}

