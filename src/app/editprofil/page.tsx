/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NpHYRansyWO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import profilUser from "../../../public/profil.png"
import { Textarea } from "@/components/ui/textarea"
import { CameraIcon } from "lucide-react"
export default function Component() {
  return (
    <div className="container flex px-6 lg:px-10 w-full  mx-auto justify-center ">
 <Card className="w-full max-w-2xl  text-blue-500">
      <CardHeader className="flex flex-col items-center">
        <CardTitle className="text-2xl font-bold text-blue-500">Account info</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          View and update your account details
        </CardDescription>
        <div className="relative mt-4">
          <Avatar className="size-40 border">
            <AvatarImage src="https://lzdzy7eapvafpa4c.public.blob.vercel-storage.com/profilUser-stTxw31zpfPA973nCrjHW8xQ5zUx5J" alt="User Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button variant="defaultBtn"  className="size-12 absolute bottom-0 right-0 p-1 rounded-full">
            <CameraIcon className=" size-6 text-white" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value="Méschac Irung" className=" text-white" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value="m.irung@tailus.io" className=" text-white" />
          </div>
        </div>
     
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Enter your bio" className=" text-white min-h-[150px]" />
        </div>
      </CardContent>
      <CardFooter className="flex">
        {/* <Button variant="outline" className=" text-white">
          Customize
        </Button> */}
        <div className="flex space-x-2 ml-auto">
          <Button variant="outline" className="text-muted-foreground hover:text-blue-500">
            Cancel
          </Button>
          <Button variant={"defaultBtn"} className=" text-white">Save</Button>
        </div>
      </CardFooter>
    </Card>
    </div>
   
  )
}

