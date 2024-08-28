import React, { Suspense } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Rating } from "@mui/material";
import { unstable_noStore } from "next/cache";
import { FiltersByRating } from "./FiltersByRating";
import { searchParamsCache } from "@/lib/nuqs";
import { User, Review, Product } from "@prisma/client";
import prisma from "../../../../db";
import { getInitials } from "../../../../components/Navbar/UserNav";
import { getReviewsPages } from "@/lib/actions";
import Image from "next/image";
import filterReview from "../../../../public/filter review.png";
export const ListRating = async ({ productId }: { productId: string }) => {
  unstable_noStore();
  const filterRating = searchParamsCache.get("rating") ?? undefined;
  const currentPage = searchParamsCache.get("page");
  const pageReviews = await getReviewsPages(filterRating);
  console.log(filterRating);

  const reviews = await prisma.review.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              rating: {
                equals: filterRating,
              },
            },

            // {
            //   rating: filterRating && {
            //     equals: filterRating + 0.5,
            //   },
            // },
          ],
        },
        {
          productId,
        },
      ],
    },

    include: {
      product: true,
      user: true,
    },
  });
  console.log("reviewscomment", reviews);

  return (
    <div className="grid gap-4">
      <h2 className="text-2xl font-bold text-blue-500">Customer Reviews</h2>

      <FiltersByRating />
      {reviews.length === 0 ? (
        <FilterNoReviews />
      ) : (
        <div className="grid gap-6">
          {reviews.map((review, _) => (
            <div key={review.id} className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarImage
                  alt="image-user"
                  src={
                    review.user.picture ??
                    `https://api.dicebear.com/9.x/adventurer/svg?seed=Buster`
                  }
                />
                <AvatarFallback className="text-blue-500">
                  {" "}
                  {getInitials(
                    review.user.firstName,
                    review.user.lastName,
                    review.user.email
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-2">
                <div className="flex md:items-center max-md:gap-2 gap-4 max-md:flex-col">
                  <div className="grid gap-0.5 text-sm">
                    {!review.user.firstName && !review.user.lastName ? (
                      <h3 className="font-semibold text-blue-500">
                        {review.user.username}
                      </h3>
                    ) : (
                      <h3 className="font-semibold text-blue-500">
                        {review.user.firstName} {review.user.lastName}
                      </h3>
                    )}

                    <time className=" text-muted-foreground italic font-bold">
                      3 weeks ago
                    </time>
                  </div>
                  <div className="flex items-center gap-0.5 md:ml-auto">
                    <Rating
                      className="border-blue-400 mr-1"
                      value={review.rating}
                      readOnly
                      precision={0.5}
                      size="small"
                    />
                  </div>
                </div>
                <div className="text-sm leading-loose text-muted-foreground">
                  <p>{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export const FilterNoReviews = () => {
  return (
    <div className="w-full min-h-40 grid grid-cols-1 gap-2 justify-items-center items-center">
      <Image
        src={filterReview}
        alt={"check another filter review!"}
        width={300}
        height={300}
      />
      <div className="grid gap-2 text-muted-foreground">
        <div className="font-semi-bold text-blue-500 font-semibold text-lg">
          No reviews found !
        </div>
        <div>Please check another filter for find review </div>
      </div>
    </div>
  );
};
