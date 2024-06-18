"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { Button } from "@nextui-org/react";
import { toastHandler } from "../Toaster/ToasterHandler";
import { GetRegionDetails, UpdateRegionRequest } from "@/lib/Region/RegionRequestHandler";
import { GetRegionDetailsUrl, UpdateRegionDetailsUrl } from "@/static/ApiEndpoints";
import { AddRegionSchema } from "@/validationSchema/RegionSchema";
import { Formik } from "formik";
import RegionMapComponent from "../Map/RegionMapComponent";
import { useRouter } from "next/navigation";

export const UpdateRegionForm = ({ regionId }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [fetchedLocation, setFetchedLocation] = useState({
    lat: 22.719568,
    lng: 75.857727,
  });
  const [initialValues, setInitialValues] = useState({
    region_title: "",
    region_description: "",
    region_lat: 22,
    region_long: 77,
  }); // [regionId

  let locationHandler = (lat, long) => {
    setInitialValues((prev) => {
      return { ...prev, region_lat: lat, region_long: long };
    });
  };

  let submitHandler = (values, formik) => {
    const request_body = {
      id : regionId,
      title: values.region_title,
      description: values.region_description,
      latitude: values.region_lat,
      longitude: values.region_long,
      is_active: true,
    };
    setIsLoading(true);
    setTimeout(async () => {
      const response = await UpdateRegionRequest(UpdateRegionDetailsUrl, request_body, session?.jwt);
      setIsLoading(false);
      toastHandler(response.data.message);
      formik.resetForm();

      router.push('/region');

    }, 10);
  };

  useEffect(() => {
    if (status === "authenticated") {
      const fetchData = async () => {
        const response = await GetRegionDetails(
          GetRegionDetailsUrl,
          regionId,
          session?.jwt
        );
        if (response.data) {
          setInitialValues({
            region_title: response.data.region.title,
            region_description: response.data.region.description,
            region_lat: response.data.region.location.coordinates[1],
            region_long: response.data.region.location.coordinates[0],
          });
          setFetchedLocation({
            lat: response.data.region.location.coordinates[1],
            lng: response.data.region.location.coordinates[0],
          });
        }
      };
      fetchData();
    }
  }, [status, session, regionId]);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddRegionSchema}
      onSubmit={submitHandler}
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize={true}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <div className=" w-full  h-full">
            <div className="w-full flex flex-wrap my-10 ">
              <Input
                {...formik.getFieldProps("region_title")}
                key={"Region Title"}
                variant="underlined"
                isInvalid={formik.errors.region_title}
                errorMessage={formik.errors.region_title}
                className="w-full mx-2 "
                radius="sm"
                type="text"
                label="Region Title"
                labelPlacement={"inside"}
              />

              <Input
                {...formik.getFieldProps("region_description")}
                key={"Region Description"}
                variant="underlined"
                isInvalid={formik.errors.region_description}
                errorMessage={formik.errors.region_description}
                className="w-full mx-2"
                radius="sm"
                type="text"
                label="Region Description"
                labelPlacement={"inside"}
              />

              <Input
                {...formik.getFieldProps("region_lat")}
                key={"Region Latitude"}
                variant="underlined"
                isInvalid={formik.errors.region_lat}
                errorMessage={formik.errors.region_lat}
                className="w-full mx-2"
                radius="sm"
                type="text"
                label="Region Latitude"
                labelPlacement={"inside"}
              />

              <Input
                {...formik.getFieldProps("region_long")}
                key={"Region Longitude"}
                variant="underlined"
                isInvalid={formik.errors.region_long}
                errorMessage={formik.errors.region_long}
                className="w-full mx-2"
                radius="sm"
                type="text"
                label="Region Longitude"
                labelPlacement={"inside"}
              />
            </div>
            <div className="w-full my-2">
              <RegionMapComponent locationHandler={locationHandler} 
                fetchedLocation={fetchedLocation}
                isNew={false}
              />
            </div>

            <div className="flex justify-end ">
              <Button
                onClick={() => formik.handleSubmit(formik)}
                type="submit"
                isLoading={isLoading}
                color="default"
                radius="sm"
                className="my-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
