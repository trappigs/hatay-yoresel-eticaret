import { ProductGridSkeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="container-px py-10">
      <div className="mb-6 h-8 w-48 animate-pulse rounded-md bg-cream-300" />
      <ProductGridSkeleton />
    </div>
  );
}
