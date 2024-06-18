import React from "react";
import { Pagination } from "@nextui-org/react";
const CustomPagination = ({
    page,
    pages,
    setPage,
}) => {
  return (
    <div className="py-2 px-2 flex justify-end items-center">
      <Pagination
        showControls
        classNames={{
          cursor: "bg-foreground text-background",
        }}
        color="default"
        page={page}
        total={pages}
        variant="light"
        onChange={setPage}
      />
    </div>
  );
};

export default CustomPagination;
