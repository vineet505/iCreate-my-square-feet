import React from "react";
import {
  Chip,
  User,
  Tooltip,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { EyeIcon } from "@/icons/EyeIcon";
import { columns, statusOptions, sortOptions } from "@/components/Users/staticdata";
import { GetUsersList } from "@/lib/Users/UserHandler";
import { GetUsersListUrl } from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useState, useEffect } from "react";
import { UserListFormatter } from "@/lib/Users/formatter";
import Link from "next/link";
import CustomTableComponent from "../CustomTable/CustomTableComponent";
import CustomPagination from "../CustomPagination/CustomPagination";
import { SearchIcon } from "@/icons/SearchIcon";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";


const statusColorMap = {
  true: "success",
  false: "danger",
  pending: "warning",
};

export default function UserTable() {
  const { data: session, status } = useSession();
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [statusFilter, setStatusFilter] = useState(new Set([]));
  const [sort, setSort] = useState(new Set([]));
  const rowsPerPage = 10;
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState(1);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "full", size: "sm", src: user.avatar }}
            classNames={{
              description: "text-default-500",
            }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "contact":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-500">
              {user.mobile}
            </p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[user.status]}
            size="sm"
            variant="dot"
          >
            {user.status ? "active" : "inactive"}
          </Chip>
        );
        case "secure_pin_set":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[user.secure_pin_set]}
              size="sm"
              variant="dot"
            >
              {user.secure_pin_set ? "active" : "inactive"}
            </Chip>
          );
          case "kyc_verified":
            return (
              <Chip
                className="capitalize border-none gap-1 text-default-600"
                color={statusColorMap[user.kyc_verified? "true" : "pending"]}
                size="sm"
                variant="dot"
              >
                {user.kyc_verified ? "Completed" : "Pending"}
              </Chip>
            );
      case "actions":
        return (
          <div className="flex ml-2">
            <Tooltip content="Details">
              <Link
                href={"/users/" + user.id}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EyeIcon />
              </Link>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      let body = {
        user_type: "customer",
        search: search,
        status: Array.from(statusFilter).join(",") || "ALL",
        sort_by: Array.from(sort).join(",") || "NEW",
      };
      let response = await GetUsersList(
        GetUsersListUrl,
        session?.jwt,
        page,
        10,
        body
      );
      if (response.type == SERVER_FAILURE) {
        toastHandler(response.data.message);
        return;
      }
      let data = response.data;
      let total_pages = Math.floor(
        (data.total_documents + rowsPerPage - 1) / rowsPerPage
      );
      setPages(total_pages);
      setData(UserListFormatter(data.users));
    }, 10);
  }, [page, status, session, statusFilter, search, sort]);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setSearch(value);
      setPage(1);
    } else {
      setSearch("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setSearch("");
    setPage(1);
  }, []);


  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            size="sm"
            className="w-full sm:max-w-[30%]"
            placeholder="Search by Name, Mobile Number or Email."
            startContent={<SearchIcon />}
            value={search}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  size="sm"
                >
                  {statusFilter ? "Status" : "All"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status Filter"
                closeOnSelect={true}
                selectedKeys={statusFilter}
                selectionMode="single"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} >
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  size="sm"
                >
                  {sort ? "Sort" : "New to Old"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Status Filter"
                closeOnSelect={true}
                selectedKeys={sort}
                selectionMode="single"
                onSelectionChange={setSort}
              >
                {sortOptions.map((status) => (
                  <DropdownItem key={status.uid} >
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          </div>
        </div>
      </div>
    );
  }, [statusFilter, search, sort]);

  const bottomContent = React.useMemo(() => {
    return <CustomPagination page={page} pages={pages} setPage={setPage} />;
  }, [page, pages]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <CustomTableComponent
      topContent={topContent}
      bottomContent={bottomContent}
      data={data}
      columns={columns}
      renderCell={renderCell}
    />
  );
}
