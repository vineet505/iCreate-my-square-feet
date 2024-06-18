"use client";
import React from "react";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { Button } from "@nextui-org/react";
import { toastHandler } from "../Toaster/ToasterHandler";
import { AddRegionRequest } from "@/lib/Region/RegionRequestHandler";
import { AddRegionUrl } from "@/static/ApiEndpoints";
import { AddRegionSchema } from "@/validationSchema/RegionSchema";
import { Formik } from "formik";
import RegionMapComponent from "../Map/RegionMapComponent";
import { useRouter } from 'next/navigation'

export const RegionForm = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState({
    lat: 22.719568,
    lng: 75.857727,
  });
  const [initialValues, setInitialValues] = useState({
    region_title: "",
    region_description: "",
    region_lat: 22,
    region_long: 77,
  });
  const router = useRouter(); 

  if (status === "loading") {
    return <LoadingSpinner />;
  }


  let locationHandler = (lat,long) => {
    setLocation({lat:lat,lng:long})
  }

  let submitHandler = (values, formik) => {
    const request_body = {
      title: values.region_title,
      description: values.region_description,
      latitude: location.lat,
      longitude: location.lng,
    };
    setIsLoading(true);
    setTimeout(async () => {
      const response = await AddRegionRequest(AddRegionUrl, request_body, session?.jwt);
      setIsLoading(false);
      toastHandler(response.data.message);
      formik.resetForm();

      router.push('/region');

    }, 10);
  };

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
                value={location.lat}
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
                value={location.lng}
              />

            </div>
            <div className="w-full my-2">
              <RegionMapComponent locationHandler={locationHandler} />
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
