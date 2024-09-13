import { createServerAction, createServerActionProcedure, ZSAError } from "zsa"
import { getCurrentUser, isAdmin } from "./actions"

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
