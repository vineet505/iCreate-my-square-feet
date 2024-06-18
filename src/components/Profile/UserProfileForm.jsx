"use client";
import React from "react";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import LoadingSpinner from "../Loading/LoadingSpinner";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { MailIcon } from "@/icons/MailIcon";
import { ContactIcon } from "@/icons/ContactIcon";
import { Button } from "@nextui-org/react";
import { toastHandler } from "../Toaster/ToasterHandler";
import { UpdateUserDetailsSchema } from "@/validationSchema/UserProfileUpdateRequest";
import { Formik } from "formik";
import { UpdateUserDetails } from "@/lib/Users/UserHandler";
import { UpdateAdminUserDetailsUrl } from "@/static/ApiEndpoints";

const UserProfileForm = () => {
  const { data: session, status, update } = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  let initialValues = {
    legal_name: session?.user?.user_details?.legal_name || "",
    email: session?.user?.user_details?.email_id || "",
    number: session?.user?.user_details?.mobile_number || "",
    password: "",
  };

  const toggleVisibility = () => setIsVisible(!isVisible);

  const submitHandler = (values) => {
    const request_body = {
      legal_name: values.legal_name,
      email: values.email,
      mobile: values.number,
      password: values.password,
    };
    setIsLoading(true);
    setTimeout(async () => {
      const response = await UpdateUserDetails(
        UpdateAdminUserDetailsUrl,
        request_body,
        session?.jwt
      );
      setIsLoading(false);
      toastHandler(response.data.message);
      update(
        {
          ...session,
          user: {
            ...session.user,
            user_details: {
              ...session.user.user_details,
              legal_name: values.legal_name,
              email_id: values.email,
              mobile_number: values.number,
            },
          },
        }
      )
    }, 10);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UpdateUserDetailsSchema}
      onSubmit={submitHandler}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
          <div className="flex flex-wrap w-full ml-4 gap-4 h-full ">
            <div className="w-full md:w-[20%]  my-4 ">
              <Input
                {...formik.getFieldProps("legal_name")}
                key={"legal_name"}
                isInvalid={formik.errors.legal_name}
                errorMessage={formik.errors.legal_name}
                className="w-full "
                radius="sm"
                type="text"
                labelPlacement={"outside-left"}
                placeholder="Enter your Name"
                startContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none " />
                }
              />
            </div>
            <div className="w-full md:w-[20%] my-4 ">
              <Input
                key={"email"}
                isInvalid={formik.errors.email}
                errorMessage={formik.errors.email}
                {...formik.getFieldProps("email")}
                className="w-full  "
                radius="sm"
                type="email"
                labelPlacement={"outside-left"}
                placeholder="Enter your email"
                startContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none " />
                }
              />
            </div>
            <div className="w-full md:w-[20%] my-4 ">
              <Input
                key={"number"}
                isInvalid={formik.errors.number}
                errorMessage={formik.errors.number}
                {...formik.getFieldProps("number")}
                className="w-full  "
                radius="sm"
                type="text"
                labelPlacement={"outside-left"}
                placeholder="Enter your Number"
                startContent={
                  <ContactIcon className="text-2xl rotate-90 text-default-400 pointer-events-none " />
                }
              />
            </div>
            <div className="w-full md:w-[20%] h-full my-4">
              <Input
                key={"password"}
                isInvalid={formik.errors.password}
                errorMessage={formik.errors.password}
                {...formik.getFieldProps("password")}
                radius="sm"
                className="w-full "
                labelPlacement={"outside-left"}
                placeholder="Enter your password"
                startContent={
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
            <Button
              onClick={() => formik.handleSubmit()}
              type="submit"
              isLoading={isLoading}
              color="default"
              radius="sm"
              className="my-4 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
            >
              Save
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default UserProfileForm;
