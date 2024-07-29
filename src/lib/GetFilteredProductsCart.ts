import { useCartStore } from "./cart.store"

const ITEMS_PER_PAGE = 3
export const GetFilteredProductsCart = (currentPage:number) =>  {
    const { cart } = useCartStore()
    const offset = (currentPage - 1) * ITEMS_PER_PAGE
    const limit = offset + ITEMS_PER_PAGE
    const products = cart.slice(offset,limit)
    return products
}