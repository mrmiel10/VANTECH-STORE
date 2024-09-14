import { createServerAction, createServerActionProcedure, ZSAError } from "zsa"
import { getCurrentUser, isAdmin } from "./actions"
import prisma from "../../db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
export const action = createServerAction()
export const authProcedure = createServerActionProcedure()
.handler(async()=>{
    try {
        const user = await getCurrentUser()
        if(!user) throw new ZSAError("NOT_AUTHORIZED","user not authentificated")
    } catch (error) {
        throw new ZSAError("NOT_AUTHORIZED","You aren't authentificated")
    }
})

export const authedAction = authProcedure.createServerAction()

export const addAdminProcedure = createServerActionProcedure()
.handler(async()=>{
    try {
        const { getUser } = getKindeServerSession();
    const sessionUser = await getUser();
    if (!sessionUser) return null;
        const isSuperAdmin = await prisma.user.findUnique({
            where:{
           kindeId:sessionUser.id,
             role:"SUPERADMIN"
             
            }
        })
        if(!isSuperAdmin) throw new ZSAError("NOT_AUTHORIZED","you do not have the necessary rights to perform this operation")
    } catch (error) {
        throw new ZSAError("NOT_AUTHORIZED","You do not have the necessary rights to perform this operation")
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

export const authedAdminAction = authAdminProcedure.createServerAction()
export const authedAddAdminAction = addAdminProcedure.createServerAction()