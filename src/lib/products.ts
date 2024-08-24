import blackShoe from '../../public/blackShoe.jpg'
import brownShoe from '../../public/brownShoe.jpg'
import PC1 from "../../public/PC1.jpeg"
import PC2 from "../../public/PC2.jpeg"
import PC3 from "../../public/PC3.jpeg"
import PC4 from "../../public/PC4.jpeg"
import { productsType } from './typeProducts'
export const products:productsType[] = [
    {
        id:"1",
        name:"Ordinateur de bureau Lenovo M81 SFF d'occasion avec processeur Intel Core i3-2100, mémoire 4 Go, disque dur 250 Go et Windows 10 Pro (moniteur non inclus), noir",
        description:"this is a good laptop Dell Latitude",
        brand:"DELL",
        price:2000,
        image:PC1,

    },
    {
        id:"2",
        name:"Dell OptiPlex 7060 d'occasion - Micro Intel Core i5-8500T 2,1 GHz, 8 Go de RAM, disque SSD 256 Go, Windows 11 Pro 64 bits, (moniteur non inclus), noir",
        description:"this is a good laptop",
        brand:"DELL",
        price:4000,
        image:PC2,

    },
    {
        id:"3",
        name:"Apple MacBook Air 13(2020) M1 8-Core,3_2GHZ 8 GB RAM",
        description:"this is a good Laptop Apple MacBook Air 13(2020)",
        brand:"Apple",
        price:3000,
        image:PC3,

    },
    {
        id:"4",
        name:"Reviewed HP Intel EliteBook 820 G3 12_5 8GB RAM",
        description:"this is a goog laptop HP Intel EliteBook  ",
        brand:"HP",
        price:4000,
        image:PC4,

    }
   
]
