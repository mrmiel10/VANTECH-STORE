import React from "react";
import prisma from "../../../../../db";
import { EditProductForm } from "./EditProductForm";
const EditProductPage = async ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  const product = await prisma.product.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!product) return <p>no product</p>;
  return (
    <section>
      <div className="mx-auto grid max-w-4xl flex-1 auto-rows-max ">
        <EditProductForm product={product} />
      </div>
    </section>
  );
};

export default EditProductPage;
