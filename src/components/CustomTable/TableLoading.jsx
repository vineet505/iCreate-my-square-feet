import React from "react";
import { Skeleton } from "@nextui-org/react";

const TableLoading = ({n}) => {
  return (
    <div className="pb-4">
      {Array.from({ length: n }, (_, index) => index + 1).map((item, index) => {
        return (
          <div key={index} className={"my-3 px-4 w-full flex items-center gap-3 "}>
            <div>
              <Skeleton className="flex rounded-full w-12 h-12" />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Skeleton className="h-3 w-3/5 rounded-lg" />
              <Skeleton className="h-3 w-4/5 rounded-lg" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableLoading;
