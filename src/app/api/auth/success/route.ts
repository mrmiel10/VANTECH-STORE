export const dynamic = "force-dynamic";
import { PrismaClient } from "@prisma/client";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache"
const prisma = new PrismaClient();

export async function GET() {
    noStore()
    const apiUrl = process.env.NODE_ENV === "production" ? "https://vantechv-store.vercel.app" : "http://localhost:3000"
  const {getUser} = getKindeServerSession();
    const user = await getUser();

    if (!user || user == null || !user.id)
        throw new Error("something went wrong with authentication" + user);

    let dbUser = await prisma.user.findUnique({
        where: {kindeId: user.id}
    });

    if (!dbUser) {
        const randomUsername = `user${(user.id).substring(0,9)}`
        dbUser = await prisma.user.create({
            data: {
                 username:randomUsername,
                kindeId: user.id,
                firstName: user.given_name ?? "",
                lastName: user.family_name ?? "",
                email: user.email ?? "",
                picture: user.picture ?? "",
                
                 // Using nullish coalescing operator to provide a default empty string value
            }
        });
    }

  return NextResponse.redirect(apiUrl);
}
