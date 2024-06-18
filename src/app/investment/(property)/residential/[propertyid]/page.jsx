"use client"
import React from "react";
import PageHeader from "@/components/Headers/PageHeader";
import { UpdateResidentialPropertyForm } from "@/components/Investment/property/UpdateResidentialPropertyForm";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { GetPropertyDetailsRequest } from "@/lib/Investment/InvestmentpropertyHandler";
import { GetPropertyDetailsUrl } from "@/static/ApiEndpoints";
import { ResidentialPropertyDetailsFormatter } from "@/components/Investment/investmentFormatter";
import { ResidentialPropertyInitialValues } from "@/validationSchema/InvestmentPropertySchema";

const Page = ({ params }) => {
  const propertyId = params.propertyid;
  const { data: session, status } = useSession();
  const [initialValues, setInitialValues] = useState(ResidentialPropertyInitialValues);

  useEffect(() => {
    if (status === "loading") return;

    setTimeout(async () => {
      const response = await GetPropertyDetailsRequest(
        GetPropertyDetailsUrl, propertyId
      );
      setInitialValues(ResidentialPropertyDetailsFormatter(response.data));
    }, 1);
  }
  , [status, session, propertyId]);


  return (
    <>
      <PageHeader title={"Edit Residential Property"} />
      <UpdateResidentialPropertyForm initialValues={initialValues} property_id={propertyId} />
    </>
  );
};

export default Page;
