"use client"
import React from "react";
import PageHeader from "@/components/Headers/PageHeader";
import { UpdateFarmPropertyForm } from "@/components/Investment/property/UpdateFarmPropertyForm";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { GetPropertyDetailsRequest } from "@/lib/Investment/InvestmentpropertyHandler";
import { GetPropertyDetailsUrl } from "@/static/ApiEndpoints";
import { FarmPropertyDetailsFormatter } from "@/components/Investment/investmentFormatter";
import { FarmLandPropertyInitialValues } from "@/validationSchema/InvestmentPropertySchema";

const Page = ({ params }) => {
  const propertyId = params.propertyid;
  const { data: session, status } = useSession();
  const [initialValues, setInitialValues] = useState(FarmLandPropertyInitialValues);
  useEffect(() => {
    if (status === "loading") return;

    setTimeout(async () => {
      const response = await GetPropertyDetailsRequest(
        GetPropertyDetailsUrl, propertyId
      );
      setInitialValues(FarmPropertyDetailsFormatter(response.data));
    }, 1);
  }
  , [status, session, propertyId]);
  return (
    <>
      <PageHeader title={"Edit Farm Property"} />
      <UpdateFarmPropertyForm initialValues={initialValues} propertyid={propertyId} />
    </>
  );
};

export default Page;
