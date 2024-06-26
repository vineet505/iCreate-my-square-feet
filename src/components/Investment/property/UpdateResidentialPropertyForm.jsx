"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GetRegionListRequest } from "@/lib/Region/RegionRequestHandler";
import { UpdatePropertyRequest } from "@/lib/Investment/InvestmentpropertyHandler";
import {
  GetRegionListUrl,
  UpdateResidentialPropertyUrl,
} from "@/static/ApiEndpoints";
import { toastHandler } from "@/components/Toaster/ToasterHandler";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import {
  ResidentialPropertyRequestSchema,
  ResidentialKeyAndLabels,
  listedByOptions,
  listingTypeOptions,
  propertyTypeOptions,
  furnishingOptions,
  possessionTypeOptions,
  facingOptions,
} from "@/validationSchema/InvestmentPropertySchema";
import { UpdatePropertyFormComponent } from "../UpdatePropertyFormComponent";
export const UpdateResidentialPropertyForm = ({ initialValues, property_id }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [keyLabels, setkeyLables] = useState(ResidentialKeyAndLabels);
  const [regionList, setRegionList] = useState([]);
  const [formValues, setFormValues] = useState(initialValues);
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
  }, [status]);

  useEffect(() => {
    if(initialValues.region_id){
      initialValues.region_id = (regionList.findIndex(
        (region) => region.value === initialValues.region_id
      )).toString();
    }
    
    setFormValues(initialValues);
    setLocation({
      lat: initialValues?.location?.lat,
      lng: initialValues?.location?.lng,
    });
  }, [initialValues, status, regionList]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  // Change the region in select

  let submitHandler = (values, formik) => {
    let request_body = {
      is_investment_property: values.is_investment_property,
      region_id: regionList[parseInt(values.region_id)].value,
      listing_type: listingTypeOptions[parseInt(values.listing_type)].value,
      listed_by: listedByOptions[parseInt(values.listed_by)].value,
      property_type: propertyTypeOptions[parseInt(values.property_type)].value,
      bedrooms: values.bedrooms,
      bathrooms: values.bathrooms,
      furnishing: furnishingOptions[parseInt(values.furnishing)].value,
      built_up_area: values.built_up_area,
      carpet_area: values.carpet_area,
      maintenance: values.maintenance,
      floor_no: values.floor_no,
      car_parking: values.car_parking,
      facing: facingOptions[parseInt(values.facing)].value,
      balcony: values.balcony,
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
    };
    setIsLoading(true);
    setTimeout(async () => {
      const response = await UpdatePropertyRequest(
        UpdateResidentialPropertyUrl,
        request_body,
        property_id,
        session?.jwt
      );
      setIsLoading(false);
      toastHandler(response.data.message);
      formik.resetForm();
      router.push(`/investment/`);
    }, 5);
  };

  return (
    <UpdatePropertyFormComponent
      initialValues={formValues}
      validationSchema={ResidentialPropertyRequestSchema}
      keyAndLabels={keyLabels}
      submitHandler={submitHandler}
      isLoading={isLoading}
      locationHandler={locationHandler}
    />
  );
};
