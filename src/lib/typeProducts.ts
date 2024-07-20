import { StaticImageData } from "next/image"

export type productsType = {
    id:string,
    name:string,
    brand:string,
    price:number,
    description:string,
    image: string | StaticImageData
}