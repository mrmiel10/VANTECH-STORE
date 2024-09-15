import Link from "next/link";
import { File, PlusCircle, ShowerHeadIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { AdminSearch } from "../../../../components/admin/AdminSearch";
import { Suspense } from "react";
import { PageProps, searchParamsCache } from "@/lib/utils";
import { DeleteAdminModal } from "../../../../components/DeleteAdminModal";
import { SearchAdmin } from "./SearchAdmin";
import { ManagePermissionsBtn } from "./ManagePermissionsBtn";
import { SelectShowAs } from "./SelectShowAs";
import { ShowAdmins } from "./ShowAdmins";
import { GetPermissionsAdminModal } from "../../../../components/admin/GetPermissionsAdminModal";
export default function ManageAdminsPage({ params, searchParams }: PageProps) {
  const paramSearch = searchParamsCache.parse(searchParams);
console.log(searchParams)
  return (
    <div className="grid gap-4">
      <Card className="px-6 py-3 md:hidden">
        <SearchAdmin />
      </Card>
      <div className="flex max-md:flex-col gap-4 md:items-end ">
        <div className="max-md:hidden block">
          <SearchAdmin />
        </div>

        <div className="md:ml-auto flex items-end gap-2">
          {/* <ManagePermissionsBtn /> */}
          <SelectShowAs />
          <Button
            variant={"defaultBtn"}
            size="sm"
            className="h-8 gap-1"
            asChild
          >
            <Link href="/admin/add-admin">
              {" "}
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Add admin
              </span>
            </Link>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-blue-500 ">Admins</CardTitle>
          <CardDescription>
            Manage admins and view roles and permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* <Suspense fallback={<SkeletonLoadingManageProducts />}> */}
          <ShowAdmins searchParams={searchParams} />
          {/* </Suspense> */}
        </CardContent>
        <CardFooter>{/* <ShowingNumberProducts /> */}</CardFooter>
      </Card>
      <DeleteAdminModal />
      
    </div>
  );
}
