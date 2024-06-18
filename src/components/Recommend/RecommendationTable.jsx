import React from "react";
import { Button, Chip, Tooltip, useDisclosure, Avatar } from "@nextui-org/react";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { columns } from "./staticdata";
import CustomTableComponent from "../CustomTable/CustomTableComponent";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useState, useEffect } from "react";
import CustomPagination from "../CustomPagination/CustomPagination";
import {
  GetListofFeaturedPropertiesUrl,
  DeleteFeaturedPropertyUrl,
  GetListofRecommendedPropertiesUrl,
  GetListofTopRatedPropertiesUrl,
  DeleteRecommendedPropertyUrl,
  DeleteTopRatedPropertyUrl,
} from "@/static/ApiEndpoints";
import {
  GetCustomerPicksByRegion,
  DeleteRecommendedProperties,
} from "@/lib/Recommendation/RecommendationHandler";
import { recommendationFormatter } from "./recommendationFormatter";
import RegionSelectComponent from "./RegionSelectComponent";
import RecommendPropertyModalComponent from "../CustomModals/RecommendPropertyModalComponent";
import { PlusIcon } from "@/icons/PlusIcon";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function RecommendationTable({
  type,
  regionList,
  currentRegion,
  setCurrentRegion,
}) {
  const { data: session, status } = useSession();
  const [data, setData] = React.useState([]);
  const rowsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const {
    isOpen: isOpenAdd,
    onOpen: OnOpenAdd,
    onOpenChange: onOpenChangeAdd,
  } = useDisclosure();

  const renderCell = (property, columnKey) => {
    const cellValue = property[columnKey];
    switch (columnKey) {
      case "project_logo":
        return (
          <div className="flex items-center my-5">
            <Avatar showFallback size="lg" name="Logo" src={property.project_logo}/>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap["true"]}
            size="sm"
            variant="dot"
          >
            {property.status ? "active" : "inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="danger" content="Deactivate property">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => handleDelete(property.id)}
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

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex-1 w-full md:[25%] lg:w-[60%] ">
          <h1 className="text-xl font-semibold text-default-900 mb-10 md:mb-0 capitalize">
            {type} Picks
          </h1>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[60%] lg:w-[35%] ">
          <div className="flex justify-end items-center gap-3 ">
            <RegionSelectComponent
              regionList={regionList}
              setCurrentRegion={setCurrentRegion}
              currentRegion={currentRegion}
            />
            <div>
              <Button
                className="bg-foreground text-background capitalize"
                startContent={<PlusIcon />}
                size="md"
                onClick={OnOpenAdd}
              >
                Pick {type}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }, [regionList, currentRegion, setCurrentRegion, OnOpenAdd, type]);

  const bottomContent = React.useMemo(() => {
    return <CustomPagination page={page} pages={pages} setPage={setPage} />;
  }, [page, pages]);

  useEffect(() => {
    if (regionList.length === 0 || currentRegion === "") {
      return;
    }
    setTimeout(async () => {
      setIsLoading(true);
      let api_url =
        type === "featured"
          ? GetListofFeaturedPropertiesUrl
          : type === "recommended"
          ? GetListofRecommendedPropertiesUrl
          : GetListofTopRatedPropertiesUrl;
      const response = await GetCustomerPicksByRegion(
        api_url,
        rowsPerPage,
        page,
        currentRegion
      );
      toastHandler(response.message);

      setData(recommendationFormatter(response.data.properties));
      let total_pages = Math.floor(
        (response.data.document_count + rowsPerPage - 1) / rowsPerPage
      );
      setPages(total_pages);
      setIsLoading(false);
    }, 1);
  }, [status, page, regionList, currentRegion, refresh, type]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  const handleDelete = async (id) => {
    let api_url =
      type === "recommended"
        ? DeleteRecommendedPropertyUrl
        : type === "featured"
        ? DeleteFeaturedPropertyUrl
        : DeleteTopRatedPropertyUrl;
    const response = await DeleteRecommendedProperties(
      api_url,
      id,
      currentRegion,
      session.jwt
    );
    toastHandler(response.data.message);
    handleRefresh();
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }
  return (
    <div className="my-10">
      <CustomTableComponent
        columns={columns}
        data={data}
        renderCell={renderCell}
        topContent={topContent}
        bottomContent={bottomContent}
      />
      <RecommendPropertyModalComponent
        type={type}
        currentRegion={currentRegion}
        isOpen={isOpenAdd}
        onOpenChange={onOpenChangeAdd}
        handleRefresh={handleRefresh}
      />
    </div>
  );
}
