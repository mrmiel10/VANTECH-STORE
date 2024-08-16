"use client";

import { AddProductsForm } from "./AddProductsForm";
export default function AddProducts() {
  return (
    <div>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6  md:gap-8">
        <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max gap-4">
          <AddProductsForm />
      
        </div>
      </main>
    </div>
  );
}
