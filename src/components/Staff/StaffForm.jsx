"use client";
import React from "react";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { toastHandler } from "../Toaster/ToasterHandler";
import { PostUserDetails } from "@/lib/Users/UserHandler";
import { PostUserDetailsSchema } from "@/validationSchema/UserProfileUpdateRequest";
import { PostUserDetailsUrl } from "@/static/ApiEndpoints";
import { Formik } from "formik";

export const StaffForm = () => {
  const { data: session, status, update } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  let initialValues = {
    legal_name: "",
    email: "",
    number: "",
    password: "",
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const submitHandler = (values, formik) => {
    const request_body = {
      legal_name: values.legal_name,
      email_id: values.email,
      mobile_number: values.number,
      password: values.password,
      user_type: "staff",
      password_confirmed: values.password,
    };
    setIsLoading(true);
    setTimeout(async () => {
      const response = await PostUserDetails(PostUserDetailsUrl, request_body);
      setIsLoading(false);
      toastHandler(response.data.message);
      formik.resetForm();
    }, 10);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={PostUserDetailsSchema}
      onSubmit={submitHandler}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <div className=" w-full  h-full">
            <div className="w-full ">
              <Input
                {...formik.getFieldProps("legal_name")}
                key={"legal_name"}
                variant="underlined"
                isInvalid={formik.errors.legal_name}
                errorMessage={formik.errors.legal_name}
                className="w-full "
                radius="sm"
                type="text"
                label="Legal Name"
                labelPlacement={"inside"}
              />
            </div>
            <div className="w-full my-4 ">
              <Input
                key={"email"}
                variant="underlined"
                label="Email"
                isInvalid={formik.errors.email}
                errorMessage={formik.errors.email}
                {...formik.getFieldProps("email")}
                className="w-full  "
                radius="sm"
                type="email"
                labelPlacement={"inside"}
              />
            </div>
            <div className="w-full my-4 ">
              <Input
                key={"number"}
                label="Mobile Number"
                variant="underlined"
                isInvalid={formik.errors.number}
                errorMessage={formik.errors.number}
                {...formik.getFieldProps("number")}
                className="w-full  "
                radius="sm"
                type="text"
                labelPlacement={"inside"}
              />
            </div>
            <div className="w-full h-full my-4">
              <Input
                key={"password"}
                label={<span className="w-[50px]">Password</span>}
                isInvalid={formik.errors.password}
                variant="underlined"
                errorMessage={formik.errors.password}
                {...formik.getFieldProps("password")}
                radius="sm"
                className="w-full "
                labelPlacement={"inside"}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
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
