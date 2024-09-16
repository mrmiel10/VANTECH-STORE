import React from "react";
import { searchParamsCache } from "@/lib/utils";
import { MobileShowAdmin } from "../../../../components/admin/MobileShowAdmin";
import { DesktopShowAdmin } from "../../../../components/admin/DesktopShowAdmin";
import { getAdmins } from "@/lib/actions";
export const ShowAdmins = async (
  {searchParams}:{
    searchParams:{ [key: string]: string}
  }
) => {
  //await new Promise((resolve) => setTimeout(resolve, 20000));
  let permissions:string[] = []
  const role = searchParamsCache.get("role");
  const search = searchParamsCache.get("search");
  const currentPage = searchParamsCache.get("page");
  for(const permission in searchParams){
    if(permission.startsWith("perm")){
      permissions = [...permissions,searchParams[permission]]
    }
  } 
  console.log(role, search, currentPage,permissions);
  const admins = await getAdmins(currentPage,permissions,role,search)
  console.log(admins)
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <MobileShowAdmin admins={admins} />
        <DesktopShowAdmin admins={admins} />
      </div>

      {/* <PaginationTable totalPages={totalPages} /> */}
    </div>
  );
};
