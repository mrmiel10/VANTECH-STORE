import React from "react";
import clsx from "clsx";
import { imageType } from "@/app/admin/add-products/AddProductsForme";
import { useCallback, useEffect, useState } from "react";
import { DropImage } from "./DropImage";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
interface SelectImageProps {
  
  addImageToState: (value: imageType) => void;
  removeImageFromState: (value: imageType) => void;
  isProductCreated: boolean;
  className: string;
  images: imageType[] | null
}
const SelectImage: React.FC<SelectImageProps> = ({

  addImageToState,
  removeImageFromState,
  isProductCreated,
  className,
  images
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

   useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);
  const handleFileChange = useCallback(
    (value: File) => {
      addImageToState({  image: value });
      const existing  = images?.some((item)=> item.image?.name === value.name)
      if(existing){
        return  toast('This image has already been selected')
       
      } 

      setFile(value);
      
      const reader = new FileReader();
      reader.onload = function (e) {
        if (typeof e.target?.result === "string") {
          setImagePreview(e.target.result);
          //setImageUrl(e.target.result)
        }
      };
      if (value) reader.readAsDataURL(value);
    },
    
    [addImageToState,images]
  );
  return (
    <div className={clsx(
      " grid grid-cols-1 gap-2 overflow-x-auto",
      className
    )}>
       {imagePreview ? ( <div className=" w-full h-full relative border rounded-md overflow-hidden">
            <img src={imagePreview} alt="ddd" className="w-full h-full object-cover" />
          </div>):(
    <div
    className={clsx(
      "  w-full rounded-lg flex justify-center items-center border-dashed border-muted-foreground text-sm text-blue-500 border cursor-pointer hover:bg-muted ",
      className
    )}
  >
   
        <DropImage  handleFileChange={handleFileChange}  />
 
  </div>
          )}
  
      {file && (
                <div className="flex flex-col gap-2 text-sm items-center justify-center">
                    {/* <p className="text-center">{file?.name}</p> */}
                    <Button variant={"defaultBtn"} className="" onClick={() =>{
                            setFile(null)
                            setImagePreview(null)
                             removeImageFromState({image:file})
                        }}>Cancel  </Button>
                    {/* <div className="w-[70px]">
                        
                    </div> */}
                </div>
              
            )}
    </div>
    //   <div className={clsx(
    //       "  w-full rounded-lg flex justify-center items-center border-dashed border-muted-foreground text-sm text-blue-500 border cursor-pointer hover:bg-muted ",
    //       className
    //   )}>
    //     {/* <div className='w-full h-full aspect-square relative'>
    //     <Image src={Shoe} alt="shoe image" fill className='object-cover' />
    //     </div> */}

    //   <Upload />
    // </div>
  );
};

export default SelectImage;
