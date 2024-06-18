import React from "react";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { PlusIcon } from "@/icons/PlusIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { EditIcon } from "@/icons/EditIcon";
import { columns } from "./staticdata";
import CustomTableComponent from "../CustomTable/CustomTableComponent";
import {
  GetAllRegions,
  ChangeRegionStatus,
} from "@/lib/Region/RegionRequestHandler";
import { GetAllRegionsUrl, ChangeRegionStatusUrl } from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useState, useEffect } from "react";
import { RegionFilterComponent } from "../CustomDropdowns/RegionFilterComponent";
import { regionFormatter } from "./regionFormatter";
import Link from "next/link";
import CustomPagination from "../CustomPagination/CustomPagination";
import { RegionImageComponent } from "../ImageComponent/RegionImageComponent";
import { useRouter } from "next/navigation";

const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function RegionTable() {
  const { data: session, status } = useSession();
  const [data, setData] = React.useState([]);
  const rowsPerPage = 4;
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [body, setBody] = useState({
    region: "",
    status: "",
  });
  const router = useRouter();

  const renderCell = (region, columnKey) => {
    const cellValue = region[columnKey];
    switch (columnKey) {
      case "icon":
        return (
          <div className="flex items-center">
            <RegionImageComponent
              ImageUrl={region.region_image_url}
              regionId={region.id}
              imageId={region.id}
            />
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize border-none gap-1 text-default-600"
            color={statusColorMap[region.status]}
            size="sm"
            variant="dot"
          >
            {region.status ? "active" : "inactive"}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit Region">
              <span
                onClick={() => {
                  router.push(`/region/updateregion/${region.id}`);
                }}
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Deactivate Region">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => changeRegionStatusHandler(region.id)}
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
      let response = await GetAllRegions(
        GetAllRegionsUrl,
        rowsPerPage,
        page,
        body,
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
      let response_data = regionFormatter(data.regions);
      setData(response_data);
    }, 10);
  }, [page, status, session, body, isLoading]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-end gap-3 items-end">
          <div className="flex gap-3">
            <RegionFilterComponent setBody={setBody} />
            <Button
              href={"/region/addregion"}
              as={Link}
              className="bg-foreground text-background"
              endContent={<PlusIcon />}
              size="sm"
            >
              Add Region
            </Button>
          </div>
        </div>
      </div>
    );
  }, []);

  const bottomContent = React.useMemo(() => {
    return <CustomPagination page={page} pages={pages} setPage={setPage} />;
  }, [page, pages]);

  let changeRegionStatusHandler = async (id) => {
    setIsLoading(true);
    let response = await ChangeRegionStatus(
      ChangeRegionStatusUrl,
      id,
      session?.jwt
    );
    toastHandler(response.data.message);
    setIsLoading(false);
  };

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
    </>
  );
}
