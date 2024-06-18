import React from "react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Formik } from "formik";
import { LoginUser } from "@/lib/AuthRequestHandler";
import LoginButton from "../Buttons/LoginButton";
import { LoginValidationSchema } from "@/validationSchema/AuthRequestValidation";
import {
  LoginInitialValues,
  SERVER_FAILURE,
} from "@/static/Static";
import Image from "next/image";
import { toastHandler } from "../Toaster/ToasterHandler";
import { LoginUrl } from "@/static/ApiEndpoints";
import EmailInput from "../Input/EmailInput";
import PasswordInput from "../Input/PasswordInput";
import { useRouter } from "next/navigation";


const LoginComponent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();

  const submitHandler = (values) => {
    setSubmitLoading(true);
    setTimeout(async () => {
      const response = await LoginUser(LoginUrl, values.email, values.password);
      if (response.type == SERVER_FAILURE) {
        toastHandler(response.data.message);
        setSubmitLoading(false);
        return
      }
      setSubmitLoading(false);
      signIn("credentials", {
        response: JSON.stringify(response),
        redirect: "/dashboard",
        callbackUrl: "/dashboard",
      });
    }, 10);
  };

  const toggleVisibility = () => setIsVisible(!isVisible);
  return (
    <div className="w-[100%] md:w-[50%] h-full py-4 px-[24px] rounded-r-md bg-white dark:bg-[#15171c]">
      <h1 className="text-[32px] text-[#5d5c61] dark:text-white mb-1 text-center">Log In</h1>
      <p className="text-[#5d5c61] dark:text-white mb-2 text-[12px] text-center">
        Hello There !
      </p>
      <Formik
        initialValues={LoginInitialValues}
        validationSchema={LoginValidationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} noValidate className="mt-5" autoComplete="off">
            <div className="flex w-full flex-wrap ">
              <EmailInput formik_props={formik.getFieldProps("email")} />
            </div>
            <div className="text-sm text-gray-400 pl-1  pb-[23px]">
              {formik.errors.email}
            </div>
            <div className="flex w-full">
              <PasswordInput
                formik_props={formik.getFieldProps("password")}
                toggleVisibility={toggleVisibility}
                isVisible={isVisible}
                formik_change={formik.handleChange}
              />
            </div>
            <div className="text-sm text-gray-400 px-1 pt-1">
              {formik.errors.password}
            </div>

            <LoginButton submitLoading={submitLoading} />

            <div className="text-center pt-[8px] pb-[32px] text-sm text-[#5d5c61] cursor-pointer  dark:text-white "
              onClick={() => router.push("/forgotpassword")}
            >
              Forgot Password?
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

export default LoginComponent;
