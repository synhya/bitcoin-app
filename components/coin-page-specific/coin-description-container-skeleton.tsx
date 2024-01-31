import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CoinDescriptionContainerSkeleton = () => {
  return (
    <div className="flex flex-col w-full gap-2">
      <Skeleton className="w-fit text-2xl">test</Skeleton>
      <Skeleton className="pt-4 px-4 grid grid-cols-1 md:grid-cols-2 border rounded-md w-full">
        <Skeleton className="relative h-[280px]"></Skeleton>
        <Skeleton className="relative h-[280px]"></Skeleton>
      </Skeleton>
      <Skeleton className="border rounded-md w-full"></Skeleton>
    </div>
  );
};

export default CoinDescriptionContainerSkeleton;
