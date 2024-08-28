import { SchemaSafeProductsOrder } from "../../schemas/schema"
export const ParseProductsOrder = (items:any)=>{
    return SchemaSafeProductsOrder.parse(JSON.parse(JSON.stringify(items)))
    }