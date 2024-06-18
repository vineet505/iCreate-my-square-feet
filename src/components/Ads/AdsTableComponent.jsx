import React from "react";
import { Button, Chip, Tooltip, useDisclosure } from "@nextui-org/react";
import { PlusIcon } from "@/icons/PlusIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { EditIcon } from "@/icons/EditIcon";
import { columns } from "./staticdata";
import CustomTableComponent from "../CustomTable/CustomTableComponent";
import { GetAdsList, DeleteAdsRequest } from "@/lib/Ads/AdsHandler";
import { GetAdsListUrl,DeleteAdsUrl } from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useState, useEffect } from "react";
import { adsFormatter } from "./adsFormatter";
import CustomPagination from "../CustomPagination/CustomPagination";
import { AdsImageComponent } from "../ImageComponent/AdsImageComponent";
import AdsAddModalComponent from "../CustomModals/AdsAddModalComponent";
import AdsEditModalComponent from "../CustomModals/AdsEditModalComponent";
const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function AdsTable() {
  const { data: session, status } = useSession();
  const [data, setData] = React.useState([]);
  const rowsPerPage = 4;
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState(1);
  const { isOpen: AddIsOpen, onOpenChange: AddOnOpenChange } = useDisclosure();
  const { isOpen: EditIsOpen, onOpenChange: EditOnOpenChange } =
    useDisclosure();
  const [selectedAds, setSelectedAds] = useState({});
  const [refresh, setRefresh] = useState(false);

  const renderCell = (ads, columnKey) => {
    const cellValue = ads[columnKey];
    switch (columnKey) {
      case "icon":
        return (
          <div className="flex items-center">
            <AdsImageComponent
              imageId={ads.id}
              card_id={ads.id}
              ImageUrl={ads.ad_image_url}
            />
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[ads.status]}
            size="sm"
            variant="dot"
          >
            {ads.status ? "active" : "inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="default" content="Edit Ad">
              <span
                className="text-lg  cursor-pointer active:opacity-50"
                onClick={() => {
                  setSelectedAds(ads);
                  EditOnOpenChange(true);
                }}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Deactivate Ad">
              <span className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  handleDelete(ads.id);
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
      let response = await GetAdsList(
        GetAdsListUrl,
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
      let response_data = adsFormatter(data.ads_card_info);
      setData(response_data);
    }, 10);
  }, [page, status, session, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleDelete = async (id) => {
    let response = await DeleteAdsRequest(DeleteAdsUrl, id, session?.jwt);
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
              Add Ads
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
      <AdsAddModalComponent
        isOpen={AddIsOpen}
        onOpenChange={AddOnOpenChange}
        handleRefresh={handleRefresh}
      />
      <AdsEditModalComponent
        selectedAds={selectedAds}
        isOpen={EditIsOpen}
        onOpenChange={EditOnOpenChange}
        handleRefresh={handleRefresh}
      />
    </>
  );
}
