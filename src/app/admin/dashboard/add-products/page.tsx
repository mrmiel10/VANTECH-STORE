"use client";

import { AddProductsForm } from "./AddProductsForm";
export default function Dashboard() {
  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <AddProductsForm />
      
        </div>
      </main>
    </div>
  );
}
