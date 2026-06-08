import { StarRating } from "@/components/ui/StarRating";
import type { Review } from "@/data/reviews";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="card flex h-full flex-col gap-3 p-5">
      <StarRating value={review.rating} />
      <figcaption className="font-serif font-semibold">{review.title}</figcaption>
      <blockquote className="flex-1 text-sm leading-relaxed text-ink-soft">
        “{review.body}”
      </blockquote>
      <div className="flex items-center gap-2 text-sm">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-olive/15 font-semibold text-olive-dark">
          {review.author.charAt(0)}
        </span>
        <span className="font-medium text-ink">{review.author}</span>
        <span className="text-ink-muted">· {review.city}</span>
      </div>
    </figure>
  );
}
