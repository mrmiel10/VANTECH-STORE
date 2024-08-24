import { Button } from "@/components/ui/button"
import { getCurrentUser } from "@/lib/actions"
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components"
export const PayOrderButton = () => {
    // const user = getCurrentUser()
    // if(!user) return    <Button variant={"defaultBtn"}> <RegisterLink postLoginRedirectURL="/cart">
    // Proceed to Checkout
    // </RegisterLink>
    // </Button>
  return (
  <Button onClick={async()=>{

  }}>Proceed to Checkout</Button>
  )
}

