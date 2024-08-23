
import EditProfil from "./EditProfil";
import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";
export default async function PageProfil() {
const user  = await getCurrentUser()
 if(!user) redirect("/")
  return (
    <div className="container p-4 min-h-screen items-center flex  w-full  mx-auto justify-center ">
      <EditProfil user={user} />
    </div>
  );
}
