export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden card-shadow animate-pulse">
      <div className="aspect-[3/4] shimmer-bg" />
      <div className="p-4 space-y-3">
        <div className="h-4 shimmer-bg rounded w-3/4" />
        <div className="h-3 shimmer-bg rounded w-1/2" />
        <div className="h-3 shimmer-bg rounded w-1/4" />
        <div className="h-8 shimmer-bg rounded-full w-full" />
      </div>
    </div>
  );
}
