import React from 'react'
import { AdminSearch } from '../../../components/admin/AdminSearch'
import OrdersUser from './OrdersUser'
const PageOrderUser = () => {
  return (
   <div className='container flex flex-col gap-4 justify-center items-center px-5 md:px-10 md:py-5 max-w-5xl'>
<AdminSearch placeholder='search your order...' />
<OrdersUser />

   </div>
  )
}

export default PageOrderUser