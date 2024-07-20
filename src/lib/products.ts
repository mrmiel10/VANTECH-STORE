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
        name:"Dell Latitude 3520,15_6 inch",
        description:"this is a good laptop Dell Latitude",
        brand:"DELL",
        price:2000,
        image:PC1,

    },
    {
        id:"2",
        name:"HP Elite Dragonfly G3 13_5 Laptop Core i7-1255U 16GB RAM 512GB WIndows 11 ",
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
