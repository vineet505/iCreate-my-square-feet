import React from "react";
import {
  Button,
  Chip,
  User,
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { PlusIcon } from "@/icons/PlusIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { SearchIcon } from "@/icons/SearchIcon";
import {
  staffColumns,
  statusOptions,
  sortOptions,
} from "@/components/Users/staticdata";
import { StaffForm } from "./StaffForm";
import { GetUsersList } from "@/lib/Users/UserHandler";
import { GetUsersListUrl } from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useState, useEffect } from "react";
import { UserListFormatter } from "@/lib/Users/formatter";
import CustomTableComponent from "../CustomTable/CustomTableComponent";
import CustomPagination from "../CustomPagination/CustomPagination";
import { ChevronDownIcon } from "@/icons/ChevronDownIcon";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function StaffTable() {
  const { data: session, status } = useSession();
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = useState(new Set([]));
  const [sort, setSort] = useState(new Set([]));
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = React.useState([]);
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
      case "actions":
        return (
          <div className="relative flex items-center gap-2 ml-4">
            <Tooltip color="danger" content="Deactivate User">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
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
        user_type: "staff",
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
        <div className="flex justify-between gap-3 items-center">
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
                    <DropdownItem key={status.uid}>{status.name}</DropdownItem>
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
                    <DropdownItem key={status.uid}>{status.name}</DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
              onClick={onOpen}
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
    );
  }, [statusFilter, search, sort, onOpen]);


  const bottomContent = React.useMemo(() => {
    return <CustomPagination page={page} pages={pages} setPage={setPage} />;
  }, [page, pages]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <>
      <CustomTableComponent
        topContent={topContent}
        bottomContent={bottomContent}
        data={data}
        columns={staffColumns}
        renderCell={renderCell}
      />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Staff
              </ModalHeader>
              <ModalBody>
                <StaffForm />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
