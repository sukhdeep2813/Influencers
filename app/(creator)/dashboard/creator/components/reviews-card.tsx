import { ArrowUpRight, Star, Quote } from "lucide-react";
import { SectionHeader } from "./section-header";
import { Review, BrandProfile } from "../../../../../generated/prisma";
import Link from "next/link";

// 1. Define the compound type for a Review that includes its Brand
type ReviewWithBrand = Review & { brand: BrandProfile };

interface ReviewsCardProps {
  reviews: ReviewWithBrand[];
}

export default function ReviewsCard({ reviews }: ReviewsCardProps) {
  // 2. Dynamically calculate the average rating based on the database
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, current) => acc + current.rating, 0) /
          totalReviews
        ).toFixed(1)
      : "0.0";

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/40 sm:p-6">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-orange-100/50 blur-3xl transition-all duration-500 group-hover:bg-orange-200/60" />

      <div className="relative">
        <SectionHeader
          title="Recent reviews"
          action={`See all ${totalReviews}`}
        />

        {/* Rating summary */}
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange-500 text-white shadow-sm shadow-orange-200">
              <Star className="h-5 w-5 fill-current" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-slate-950">
                  {averageRating}
                </span>

                <div className="flex items-center gap-0.5 text-orange-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-3.5 w-3.5 ${index < Math.round(Number(averageRating)) ? "fill-current" : "text-slate-200"}`}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                Based on {totalReviews} brand reviews
              </p>
            </div>
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-xs font-medium text-slate-400">Reputation</p>
            <p className="mt-0.5 text-sm font-bold text-emerald-600">
              {Number(averageRating) >= 4.5 ? "Excellent" : "Good"}
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-5 space-y-3">
          {reviews.map((review) => {
            // Safely extract brand name and format date
            const brandName = review.brand?.companyName || "Verified Brand";
            const reviewDate = new Intl.DateTimeFormat("en-US", {
              month: "short",
              year: "numeric",
            }).format(new Date(review.createdAt));

            const initials = brandName
              .split(" ")
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            return (
              <div
                key={review.id}
                className="
                  group/review relative overflow-hidden
                  rounded-2xl border border-slate-100
                  bg-white p-4
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-slate-200
                  hover:bg-slate-50/50
                  hover:shadow-md
                "
              >
                {/* Quote decoration */}
                <Quote className="pointer-events-none absolute right-4 top-4 h-8 w-8 text-slate-100 transition-colors group-hover/review:text-orange-100" />

                {/* Reviewer */}
                <div className="relative flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 text-[10px] font-bold text-white shadow-sm">
                      {initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-slate-950">
                        {brandName}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] font-medium text-slate-400">
                        Brand Partner · {review.brand?.industry || "Marketing"}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-[10px] font-medium text-slate-400">
                    {reviewDate}
                  </span>
                </div>

                {/* Stars */}
                <div className="relative mt-3 flex items-center gap-0.5 text-orange-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`h-3.5 w-3.5 ${
                        index < review.rating
                          ? "fill-current"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Review */}
                <p className="relative mt-2.5 text-xs leading-5 text-slate-500 sm:text-sm sm:leading-6">
                  “{review.comment}”
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <Link
          href="/dashboard/creator/reviews"
          className="
            mt-5 flex w-full items-center
            justify-center gap-2
            rounded-xl border border-slate-200
            bg-white py-2.5
            text-xs font-bold text-slate-600
            transition-all duration-200
            hover:border-slate-300
            hover:bg-slate-50
            hover:text-slate-950
          "
        >
          View all reviews
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </article>
  );
}
