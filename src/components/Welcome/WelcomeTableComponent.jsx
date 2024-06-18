import React from "react";
import { Button, Chip, Tooltip, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "@/icons/PlusIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { EditIcon } from "@/icons/EditIcon";
import { columns } from "./staticdata";
import CustomTableComponent from "../CustomTable/CustomTableComponent";
import { GetWelcomeList, DeleteWelcomeRequest } from "@/lib/Welcome/WelcomeHandler";
import { GetWelcomeCardListUrl,DeleteWelcomeCardUrl } from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useState, useEffect } from "react";
import { welcomeFormatter } from "./welcomeFormatter";
import CustomPagination from "../CustomPagination/CustomPagination";
import { WelcomeImageComponent } from "../ImageComponent/WelcomeImageComponent";
import WelcomeAddModalComponent from "../CustomModals/WelcomAddModalComponent";
import WelcomeEditModalComponent from "../CustomModals/WelcomeEditModalComponent";
const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function WelcomeTable() {
  const { data: session, status } = useSession();
  const [data, setData] = React.useState([]);
  const rowsPerPage = 4;
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState(1);
  const { isOpen: AddIsOpen, onOpenChange: AddOnOpenChange } = useDisclosure();
  const { isOpen: EditIsOpen, onOpenChange: EditOnOpenChange } =
    useDisclosure();
  const [selectedWelcomeCard, setSelectedWelcomeCard] = useState({});
  const [refresh, setRefresh] = useState(false);

  const renderCell = (welcome, columnKey) => {
    const cellValue = welcome[columnKey];
    switch (columnKey) {
      case "welcome_card_image":
        return (
          <div className="flex items-center">
            <WelcomeImageComponent
              imageId={welcome.id}
              card_id={welcome.id}
              ImageUrl={welcome.welcome_card_image}
            />
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[welcome.status]}
            size="sm"
            variant="dot"
          >
            {welcome.status ? "active" : "inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="default" content="Edit Ad">
              <span
                className="text-lg  cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedWelcomeCard(welcome);
                  EditOnOpenChange(true);
                }}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Deactivate Ad">
              <span className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  handleDelete(welcome.id);
                }
                }
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      let response = await GetWelcomeList(
        GetWelcomeCardListUrl,
        page,
        rowsPerPage,
        session?.jwt
      );
      if (response.type == SERVER_FAILURE) {
        toastHandler(response.data.message);
        return;
      }
      let data = response.data;
      let total_pages = Math.floor(
        (data.document_count + rowsPerPage - 1) / rowsPerPage
      );
      setPages(total_pages);
      let response_data = welcomeFormatter(data.welcome_card_info);
      setData(response_data);
    }, 10);
  }, [page, status, session, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDelete = async (id) => {
    let response = await DeleteWelcomeRequest(DeleteWelcomeCardUrl, id, session?.jwt);
    if (response.type == SERVER_FAILURE) {
      toastHandler(response.data.message);
      return;
    }
    toastHandler("Ad Deleted Successfully");
    handleRefresh();
  }

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-end gap-3 items-end">
          <div className="flex gap-3">
            <Button
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
              onClick={() => {
                AddOnOpenChange(true);
              }}
            >
              Add Welcome Cards
            </Button>
          </div>
        </div>
      </div>
    );
  }, []);

  const bottomContent = React.useMemo(() => {
    return <CustomPagination page={page} pages={pages} setPage={setPage} />;
  }, [page, pages]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <>
      <CustomTableComponent
        columns={columns}
        data={data}
        renderCell={renderCell}
        topContent={topContent}
        bottomContent={bottomContent}
      />
      <WelcomeAddModalComponent
        isOpen={AddIsOpen}
        onOpenChange={AddOnOpenChange}
        handleRefresh={handleRefresh}
      />
      <WelcomeEditModalComponent
        selectedWelcomeCard={selectedWelcomeCard}
        isOpen={EditIsOpen}
        onOpenChange={EditOnOpenChange}
        handleRefresh={handleRefresh}
      />
    </>
  );
}
