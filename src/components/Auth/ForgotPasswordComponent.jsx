import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { RequestRestPasswordLink } from "@/lib/AuthRequestHandler";
import LoginButton from "../Buttons/LoginButton";
import { ForgotRequestValidation } from "@/validationSchema/AuthRequestValidation";
import {
  ForgotInitialValues,
  SERVER_FAILURE,
} from "@/static/Static";
import Image from "next/image";
import { toastHandler } from "../Toaster/ToasterHandler";
import { RequestForgotPasswordUrl } from "@/static/ApiEndpoints";
import EmailInput from "../Input/EmailInput";
import { useRouter } from "next/navigation";


const ForgotPasswordComponent = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  const submitHandler = (values) => {
    setSubmitLoading(true);
    setTimeout(async () => {
      const response = await RequestRestPasswordLink(RequestForgotPasswordUrl, values.email);
    toastHandler(response.data.message);
    setSubmitLoading(false);

    }, 10);
  };

  return (
    <div className="w-[100%] md:w-[50%] h-full py-4 px-[24px] rounded-r-md bg-white dark:bg-[#15171c]">
      <h1 className="text-[32px] text-[#5d5c61] dark:text-white mb-10 text-center">Reset Password</h1>
      
      <Formik
        initialValues={ForgotInitialValues}
        validationSchema={ForgotRequestValidation}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} noValidate className="my-5" autoComplete="off">
            <div className="flex w-full flex-wrap ">
              <EmailInput formik_props={formik.getFieldProps("email")} />
            </div>
            <div className="text-sm text-gray-400 pl-1 ">
              {formik.errors.email}
            </div>
            <div className="text-sm text-gray-400 px-1 pt-1">
              {formik.errors.password}
            </div>
            <LoginButton text="Send Link" submitLoading={submitLoading} />

            <div className="text-center pt-[8px] pb-[32px] text-sm text-[#5d5c61] cursor-pointer  dark:text-white "
              onClick={() => router.push("/login")}
            >
              Go back to Login
            </div>
          </form>
        )}
      </Formik>

      {/* Store Images */}
      <div className="flex h-[40px] justify-center gap-6">
        <Image alt="App Store" src="/appstore.png" width={120} height={100} />
        <Image alt="Play Store" src="/playstore.png" width={120} height={100} />
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
