import { createServerAction, createServerActionProcedure, ZSAError } from "zsa"
import { getCurrentUser, isAdmin } from "./actions"
import prisma from "../../db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
export const action = createServerAction()
export const authProcedure = createServerActionProcedure()
.handler(async()=>{
    try {
        const user = await getCurrentUser()
        if(!user)   throw new ZSAError("NOT_AUTHORIZED","You aren't authentificated")
    } catch (error) {
        throw new ZSAError("NOT_AUTHORIZED","You aren't authentificated")
    }
})

export const authedAction = authProcedure.createServerAction()

export const addAdminProcedure = createServerActionProcedure()
.handler(async()=>{
    try {
        const user = await getCurrentUser()
        if(!user)   throw new ZSAError("NOT_AUTHORIZED","You aren't authentificated")
        const isSuperAdmin = await prisma.user.findUnique({
            where:{
          id:user?.id ,
             role:"SUPERADMIN"
             
            }
        })
        if(!isSuperAdmin) throw new ZSAError("NOT_AUTHORIZED","you don't have the necessary rights to perform this operation")
    } catch (error) {
        throw new ZSAError("NOT_AUTHORIZED","You don't have the necessary rights to perform this operation")
    }
})
export const authAdminProcedure =  createServerActionProcedure()
.handler(async()=>{
    try {
        const admin = await isAdmin()
        if(!admin) throw new ZSAError("NOT_AUTHORIZED","admin not authentificated")
    } catch (error) {
        throw new ZSAError("NOT_AUTHORIZED","You aren't not an admin!")
    }
})

export const addProductProcedure = createServerActionProcedure()
.handler(async()=>{
    try {
        const admin = await isAdmin()
        if(!admin) throw new ZSAError("NOT_AUTHORIZED","admin not authentificated")
            if(!admin.permissions.includes("add product") && !admin.permissions.includes("all"))   throw new ZSAError("NOT_AUTHORIZED","You don't have the necessary rights to perform this operation")
    } catch (error) {
        throw new ZSAError("NOT_AUTHORIZED","You don't have the necessary rights to perform this operation")
    }
})
export const deleteProductProcedure = createServerActionProcedure()
.handler(async()=>{
    try {
        const admin = await isAdmin()
        if(!admin) throw new ZSAError("NOT_AUTHORIZED","admin not authentificated")
            if(!admin.permissions.includes("delete product") && !admin.permissions.includes("all"))   throw new ZSAError("NOT_AUTHORIZED","You don't have the necessary rights to perform this operation")
    } catch (error) {
        throw new ZSAError("NOT_AUTHORIZED","You don't have the necessary rights to perform this operation")
    }
})
export const editProductProcedure = createServerActionProcedure()
.handler(async()=>{
    try {
        const admin = await isAdmin()
        if(!admin) throw new ZSAError("NOT_AUTHORIZED","admin not authentificated")
            if(!admin.permissions.includes("edit product") && !admin.permissions.includes("all"))   throw new ZSAError("NOT_AUTHORIZED","You don't have the necessary rights to perform this operation")
    } catch (error) {
        throw new ZSAError("NOT_AUTHORIZED","You don't have the necessary rights to perform this operation")
    }
})
export const authedAdminAction = authAdminProcedure.createServerAction()
export const authedAddAdminAction = addAdminProcedure.createServerAction()
export const authedAddProductAction = addProductProcedure.createServerAction()
export const authedDeleteProductAction = deleteProductProcedure.createServerAction()
export const authedEditProductAction = editProductProcedure.createServerAction()