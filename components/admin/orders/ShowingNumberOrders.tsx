import { getOrdersPages } from '@/lib/actions';
import { searchParamsCache } from '@/lib/nuqs';
import { User,Order } from '@prisma/client';
import { error } from 'console';
import React from 'react'

export const ShowingNumberOrders = async({userId}:{userId?:string}) => {
  //if(!userId) throw new Error
    const searchOrder = searchParamsCache.get("search");
    const deliveryStatus = searchParamsCache.get("status");
    const paymentStatus = searchParamsCache.get("paymentStatus")
    const currentPage = searchParamsCache.get("page");
    const ITEMS_PER_PAGE = 3;
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const { count } = await getOrdersPages(searchOrder,deliveryStatus,paymentStatus,userId)
    const totalOrders = count;
    console.log('userId',userId)
    const lastOrder= count > (offset + ITEMS_PER_PAGE) ? (offset + ITEMS_PER_PAGE) : count
    if (totalOrders === 0) return null;
    return (
      <div className="text-xs text-muted-foreground">
        
        {(offset + 1) === totalOrders ? (
          <div>Showing one order</div>
        ) : (
          <div>
            {" "}
            Showing{" "}
            <strong>
              {offset + 1} - {lastOrder}
            </strong>{" "}
            of <strong>{totalOrders}</strong>orders
          </div>
        )}
      </div>
    );
}

