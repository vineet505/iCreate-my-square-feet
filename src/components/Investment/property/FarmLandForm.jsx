"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { GetRegionListRequest } from "@/lib/Region/RegionRequestHandler";
import { AddPropertyRequest } from "@/lib/Investment/InvestmentpropertyHandler";

import { GetRegionListUrl, AddFarmPropertyUrl } from "@/static/ApiEndpoints";
import { toastHandler } from "@/components/Toaster/ToasterHandler";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import {
  FarmLandKeyAndLabels,
  FarmLandPropertyInitialValues,
  FarmLandPropertyRequestSchema,
  listedByOptions,
  listingTypeOptions,
  FarmLandPropertyTypeOptions,
  possessionTypeOptions,
  facingOptions,
  listedByLotsOptions,
} from "@/validationSchema/InvestmentPropertySchema";
import { PropertyFormComponent } from "../PropertyFormComponent";

export const FarmLandForm = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [keyLabels, setkeyLables] = useState(FarmLandKeyAndLabels);
  const [regionList, setRegionList] = useState([]);
  const router = useRouter();

  const [location, setLocation] = useState({
    lat: 22,
    lng: 77,
  });

  let locationHandler = (lat, long) => {
    setLocation({ lat: lat, lng: long });
  };

  useEffect(() => {
    if (status === "loading") return;

    setTimeout(async () => {
      const response = await GetRegionListRequest(GetRegionListUrl);
      let options = response.data.region_list.map((region) => {
        return { value: region.id, label: region.title };
      });
      setRegionList(options);
      setkeyLables((old) => {
        old.select[0].options = options;
        return old;
      });
    }, 1);
  }, [status, session]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  let submitHandler = (values, formik) => {
    let request_body = {
      is_investment_property: values.is_investment_property,
      region_id: regionList[parseInt(values.region_id)].value,
      listing_type: listingTypeOptions[parseInt(values.listing_type)].value,
      listed_by: listedByOptions[parseInt(values.listed_by)].value,
      property_type:
        FarmLandPropertyTypeOptions[parseInt(values.property_type)].value,
      length: values.length,
      breadth: values.breadth,
      plot_area: values.plot_area,
      facing: facingOptions[parseInt(values.facing)].value,
      possession_type:
        possessionTypeOptions[parseInt(values.possession_type)].value,
      description: values.description,
      project_title: values.project_title,
      price: values.price,
      video_url: values.video_url,
      address: values.address,
      location: {
        latitude: location.lat,
        longitude: location.lng,
      },
      roi_percentage: values.roi_percentage,
      property_posting_type:
        listedByLotsOptions[parseInt(values.listed_by_lots)].value,
      share_size: `${values.slot_size}`,
      share_quantity: values.quantity,
    };
    setIsLoading(true);
    setTimeout(async () => {
      const response = await AddPropertyRequest(
        AddFarmPropertyUrl,
        request_body,
        session?.jwt
      );
      setIsLoading(false);
      toastHandler(response.data.message);
      formik.resetForm();
      router.push(`/investment/imagegallery/${response.data.id}`);
    }, 5);
  };

  return (
    <PropertyFormComponent
      initialValues={FarmLandPropertyInitialValues}
      validationSchema={FarmLandPropertyRequestSchema}
      keyAndLabels={keyLabels}
      submitHandler={submitHandler}
      isLoading={isLoading}
      locationHandler={locationHandler}
    />
  );
};
