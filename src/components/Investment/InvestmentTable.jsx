import React from "react";
import { useRouter } from "next/navigation";
import { Button, Chip, Tooltip } from "@nextui-org/react";
import { PlusIcon } from "@/icons/PlusIcon";
import { EyeIcon } from "@/icons/EyeIcon";
import { DeleteIcon } from "@/icons/DeleteIcon";
import { EditIcon } from "@/icons/EditIcon";
import { columns } from "./staticdata";
import { GetPropertyList } from "@/lib/Investment/InvestmentpropertyHandler";
import { GetPropertyListUrl } from "@/static/ApiEndpoints";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { SERVER_FAILURE } from "@/static/Static";
import { toastHandler } from "../Toaster/ToasterHandler";
import { useState, useEffect } from "react";
import { investmentFormatter } from "./investmentFormatter";
import CustomTableComponent from "../CustomTable/CustomTableComponent";
import AddInvestmentDropdown from "../CustomDropdowns/AddInvestmentDropdown";
import CustomPagination from "../CustomPagination/CustomPagination";
import { ProjectIconImageComponent } from "../ImageComponent/ProjectIconImageComponent";
const statusColorMap = {
  true: "success",
  false: "danger",
};

export default function InvestmentTable() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [data, setData] = React.useState([]);
  const rowsPerPage = 5;
  const [page, setPage] = React.useState(1);
  const [pages, setPages] = useState(1);

  const renderCell = React.useCallback(
    (property, columnKey) => {
      const cellValue = property[columnKey];
      if (property.category == "farm") property.category = "farms";

      switch (columnKey) {
        case "project_logo":
          return (
            <div className="flex items-center">
              <ProjectIconImageComponent
                ImageUrl={property.project_logo}
                property_id={property.id}
                imageId={property.id}
              />
            </div>
          );
        case "description":
          return (
            <div className="flex items-center">
              <p className="text-default-700">
                {property.description.toString().substr(0, 25)}...
              </p>
            </div>
          );
        case "status":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[property.status]}
              size="sm"
              variant="dot"
            >
              {property.status ? "active" : "inactive"}
            </Chip>
          );
        case "is_investment_property":
          return (
            <Chip
              className="capitalize border-none gap-1 text-default-600"
              color={statusColorMap[property.is_investment_property]}
              size="sm"
              variant="dot"
            >
              {property.is_investment_property ? "Investment" : "Sell"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center gap-2">
              <Tooltip content="View">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() =>
                    router.push(`/investment/imagegallery/${property.id}`)
                  }
                >
                  <EyeIcon />
                </span>
              </Tooltip>
              <Tooltip content="Edit Property">
                <span
                  className="text-lg text-default-400 cursor-pointer active:opacity-50"
                  onClick={() =>
                    router.push(
                      `/investment/${property.category}/${property.id}`
                    )
                  }
                >
                  <EditIcon />
                </span>
              </Tooltip>
              <Tooltip color="danger" content="Delete Property">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <DeleteIcon />
                </span>
              </Tooltip>
            </div>
          );
        default:
          return cellValue;
      }
    },
    [router]
  );

  useEffect(() => {
    if (status == "loading") return;
    setTimeout(async () => {
      let response = await GetPropertyList(
        GetPropertyListUrl,
        rowsPerPage,
        page
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
      let response_data = investmentFormatter(data.properties);
      setData(response_data);
    }, 10);
  }, [page, status]);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4 ">
        <div className="flex justify-end gap-3 items-end">
          <div className="flex gap-3">
            <AddInvestmentDropdown>
              <Button
                className="bg-foreground text-background"
                endContent={<PlusIcon />}
                size="sm"
              >
                Add New
              </Button>
            </AddInvestmentDropdown>
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
        data={data}
        columns={columns}
        topContent={topContent}
        bottomContent={bottomContent}
        renderCell={renderCell}
      />
    </>
  );
}
