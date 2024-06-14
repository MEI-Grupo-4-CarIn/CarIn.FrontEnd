import { SkeletonTable } from "@/components/ui/skeleton-table";

export default function Loading() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <SkeletonTable />
      <SkeletonTable />
      <SkeletonTable />
      <SkeletonTable />
      <SkeletonTable />
      <SkeletonTable />
    </div>
  );
}
