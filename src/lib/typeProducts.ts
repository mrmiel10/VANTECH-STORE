import { StaticImageData } from "next/image"

export type productsType = {
    id:number,
    name:string,
    brand:string,
    price:number,
    description:string,
    image: string | StaticImageData
}