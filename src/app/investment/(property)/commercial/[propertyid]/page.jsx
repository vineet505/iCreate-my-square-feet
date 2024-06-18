"use client"
import React from "react";
import PageHeader from "@/components/Headers/PageHeader";
import { UpdateCommercialPropertyForm } from "@/components/Investment/property/UpdateCommercialPropertyForm";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { GetPropertyDetailsRequest } from "@/lib/Investment/InvestmentpropertyHandler";
import { GetPropertyDetailsUrl } from "@/static/ApiEndpoints";
import { CommercialPropertyDetailsFormatter } from "@/components/Investment/investmentFormatter";
import { CommercialPropertyInitialValues } from "@/validationSchema/InvestmentPropertySchema";



const Page = ({ params }) => {
  const propertyId = params.propertyid;
  const { data: session, status } = useSession();
  const [initialValues, setInitialValues] = useState(CommercialPropertyInitialValues);

  useEffect(() => {
    if (status === "loading") return;

    setTimeout(async () => {
      const response = await GetPropertyDetailsRequest(
        GetPropertyDetailsUrl, propertyId
      );
      setInitialValues(CommercialPropertyDetailsFormatter(response.data));
    }, 1);
  }
  , [status, session, propertyId]);

  return (
    <>
      <PageHeader title={"Edit Commerical Property"} />
      <UpdateCommercialPropertyForm initialValues={initialValues} propertyid={propertyId} />

    </>
  );
};

export default Page;
