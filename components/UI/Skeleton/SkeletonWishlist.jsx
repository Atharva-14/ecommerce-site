import { Skeleton } from "./skeleton";

export default function SkeletonWishlist() {
  return (
    <div className="mb-4 border-b border-gray-700">
      <div className="flex justify-between p-4">
        <div className="flex space-x-2 ">
          <Skeleton className="h-[120px] w-[80px] " />
          <div className="flex flex-col justify-center space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[50px]" />
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-1.5">
          <Skeleton className=" h-9 w-[180px]" />
          <Skeleton className=" h-9 w-[180px]" />
        </div>
      </div>
    </div>
  );
}
