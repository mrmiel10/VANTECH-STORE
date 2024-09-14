
import React from 'react'

import { PageProps, Permissions } from "@/lib/utils";

import { EditAdminForm } from './EditAdminForm';
import prisma from '../../../../../db';
 const EditAdminPage = async(
  {params,
    searchParams
  }:PageProps<{
    id:string
  }>
 ) => {
  console.log(params.id)
const admin = await prisma.user.findUnique({
  where:{
    id:params.id,
    
  }
})
if(!admin) return <p>No admin found!</p>
return (
  
  <EditAdminForm admin={admin} />
)
}
export default EditAdminPage