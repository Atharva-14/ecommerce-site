import { Skeleton } from "./skeleton";

export default function SkeletonOrder() {
  return (
    <div className="border border-gray-300 rounded-lg">
      <div className="flex md:flex-row flex-col space-y-4 md:space-y-0 md:space-x-4 justify-between px-4 py-3.5 bg-gray-200 border-b border-gray-300">
        <span className="w-1/2 space-y-1">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </span>
        <span className="w-1/2 space-y-1">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </span>
        <span className="w-1/2 space-y-1">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </span>
        <span className="w-1/2 space-y-1">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </span>
      </div>
      <div className="flex space-x-2 p-4">
      <Skeleton className="h-[125px] w-[100px] rounded-xl" />
      <div className="flex flex-col justify-center space-y-2">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[50px]" />
      </div>
    </div>
    </div>
  );
}
