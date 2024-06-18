import React from "react";
import PageHeader from "@/components/Headers/PageHeader";
import { UpdateRegionForm } from "@/components/Region/UpdateRegionForm";

export default function Page({ params }) {
  const regionId = params.regionId;

  return (
    <>
      <PageHeader title="Update Region" />
      <UpdateRegionForm regionId={regionId} />
    </>
  );
}
