import * as z from "zod";
export const formValidateProducts = z.object({
    name: z
      .string({
        required_error: "please enter the name of the product",
      })

      .trim(),
    // .min(1, { message: "entrer un nom d'article valide" }),
    description: z
      .string({
        required_error: "please enter the description of the product(at least 1000 words)",
      })
      .trim()

      .max(1000, { message: "vous avez atteint le max de mot" }),
    brand: z
      .string({
        required_error: "Please enter the brand of the product",
      })
      .trim(),
    category: z
      .string({ required_error: "please enter the category of the product" })
      .trim(),
    status: z.string({ required_error: "please enter the status of the product" }),
    //inStock: z.boolean(),
    images: z.string(  {required_error: "enter"},).array().nonempty({message:"Please choose at least one image"}),
    //images:z.string().array(),
    price: z.coerce.number({
      required_error: "Please enter a price of the product",
      invalid_type_error: "Please enter a price of the product",
    }),
    quantity: z.coerce.number({
      required_error: "Please enter a quantity of the product",
      invalid_type_error: "Please enter a quantity of the product",
    }),
  });