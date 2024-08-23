import { createServerAction, createServerActionProcedure, ZSAError } from "zsa"
import { getCurrentUser } from "./actions"
export const action = createServerAction()
export const authProcedure = createServerActionProcedure()
.handler(async()=>{
    try {
        const user = getCurrentUser
        if(!user) throw new ZSAError("NOT_AUTHORIZED","user not authentificated")
    } catch (error) {
        throw new ZSAError("NOT_AUTHORIZED","user not authentificated")
    }
})
export const authedAction = authProcedure.createServerAction()