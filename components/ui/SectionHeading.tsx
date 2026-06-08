import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/icons";

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "Tümünü gör",
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center text-center",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-olive">
            {eyebrow}
          </p>
        )}
        <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 text-ink-muted">{description}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-pepper hover:text-pepper-dark"
        >
          {linkLabel}
          <ArrowRightIcon className="text-base" />
        </Link>
      )}
    </div>
  );
}
