import { Separator } from "../separator";
import { Skeleton } from "./skeleton";

export default function SkeletonDetails() {
  return (
    <div className="flex flex-col md:flex-row justify-evenly md:space-x-10">
      <div className="w-full md:w-1/2 p-4 items-center m-auto relative">
        <Skeleton className="h-[400px] w-[250px] rounded-3xl p-4 mx-auto" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col space-y-6 m-auto p-2.5">
        <div className="space-y-2">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-5 w-[200px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row md:space-x-5 py-2.5">
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
            <Skeleton className="h-10 w-[100px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
