import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Tooltip,
} from "@nextui-org/react";
import { EyeIcon } from "@/icons/EyeIcon";
import { EditIcon } from "@/icons/EditIcon";
import { terms_docs, columns } from "./staticdata";
import { TermsOfServiceURL } from "@/static/ApiEndpoints";


const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};

export default function TermsTable({trigger_model}) {
  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return <span>{cellValue}</span>
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="View">
              <a href={TermsOfServiceURL} target="_blank" className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
              </a>
            </Tooltip>
            <Tooltip content="Edit Terms and Conditions">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50" onClick={trigger_model}>
                <EditIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  },[trigger_model]);

  const classNames = React.useMemo(
    () => ({
      wrapper: ["max-h-[382px] ", "max-w-3xl"],
      th: [
        "bg-white dark:bg-[#15171c] ",
        "text-default-500",
        "border-b",
        "border-divider",
      ],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none ",
      ],
    }),
    []
  );

  return (
    <div className="bg-white dark:bg-[#15171c] p-4 rounded-lg overflow-auto">
      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        checkboxesProps={{
          classNames: {
            wrapper:
              "after:bg-foreground after:text-background text-background",
          },
        }}
        classNames={classNames}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={"center"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No Docs found"} items={terms_docs}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
