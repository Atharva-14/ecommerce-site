import { Skeleton } from "./skeleton";

export function SkeletonList() {
  return (
    <div className="flex items-center space-x-4">
      
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[400px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>
    </div>
  );
}
