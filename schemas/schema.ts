import * as z from "zod";
export const formValidateProducts = z.object({
  name: z
    .string({
      required_error: "please enter the name of the product",
    })

    .trim(),
  // .min(1, { message: "entrer un nom d'article valide" }),
  description: z.optional(
    z                                                                                                                      
      .string({
        required_error:
          "please enter the description of the product(at least 1000 words)",
      })
      .trim()

      .max(1000, { message: "vous avez atteint le max de mot" })
  ),
  brand: z
    .string({
      required_error: "Please enter the brand of the product",
    })
    .trim(),
  category: z
    .string({ required_error: "please enter the category of the product" })
    .trim(),
  status: z.string({
    required_error: "please enter the status of the product",
  }),

  images:
  z
    .array(
      z.object({
        
      image: z.string().min(1,{message:"at least 1"})
     // image: z.union([z.string().min(1),z.instanceof(File)])
      }),
    )
    .min(1),
   
  price: z.coerce.number({
    required_error: "Please enter a price of the product",
    invalid_type_error: "Please enter a price of the product",
  }),
  quantity: 
  
  
  z.coerce.number({
    required_error: "Please enter a quantity of the product",
    invalid_type_error: "Please enter a quantity of the product",
  }),
});
export const SchemaSafeImages = z.array(
  z.object({
    image: z.string(),
  })
);
export const schemaInfoUser = z.object({
  id:z.string(),
  firstName: z.string().trim().optional(),
  //.min(1, { message: "Entrer correctement le firstname" }),
  lastName: z.string().trim().optional(),
  // email: z.string().email(),
  bio: z.string().trim().optional(),
  urlImage: z.string().optional(),
});
export const formValidateReview = z.object({
  comment: z
    .string({
      required_error: "votre commentaire est vide",
    }).trim().min(1,{message:"commentaire incorrecte"})
   
    .max(50, { message: "commentaire trop long" }),
  rating: z.coerce.number()
});
export const SchemaSafeProductsOrder = z.array(
  z.object({
    id:z.string(),
    name:z.string(),
    description:z.optional(z.string()),
    brand:z.string(),
    category:z.string(),
     status:z.string(),
    price:z.coerce.number(),
    quantity:z.coerce.number(),
    images: z
    .array(
      z.object({
        image: z.string(),
      })
    )
    .min(1 ),

  })
)

