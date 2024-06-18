import React from "react";
import { useState } from "react";
import { Formik } from "formik";
import { VerifyResetPassword } from "@/lib/AuthRequestHandler";
import LoginButton from "../Buttons/LoginButton";
import { ResetPasswordValidation } from "@/validationSchema/AuthRequestValidation";
import { ResetPasswordInitialValues, SERVER_FAILURE } from "@/static/Static";
import Image from "next/image";
import { toastHandler } from "../Toaster/ToasterHandler";
import { VerifyResetPasswordUrl } from "@/static/ApiEndpoints";
import PasswordInput from "../Input/PasswordInput";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const ResetPasswordComponent = () => {
  const [isVisibleP1, setIsVisibleP1] = useState(false);
  const [isVisibleP2, setIsVisibleP2] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email_id = searchParams.get("email_id");
  const token = searchParams.get("reset_token");

  const submitHandler = (values) => {
    setSubmitLoading(true);
    setTimeout(async () => {
      const response = await VerifyResetPassword(
        VerifyResetPasswordUrl,
        email_id,
        token,
        values.password1
      );
      toastHandler(response.data.message);
      setSubmitLoading(false);
      if (response.type != SERVER_FAILURE) router.push("/login");
    }, 10);
  };

  const toggleVisibilityP1 = () => setIsVisibleP1(!isVisibleP1);
  const toggleVisibilityP2 = () => setIsVisibleP2(!isVisibleP2);

  function validate(values) {

    const errors = {};

    if (values.password1 != values.password2) {
        errors.password2 = 'Passwords do not match';
    }
    return errors;
};

  return (
    <div className="w-[100%] md:w-[50%] h-full py-4 px-[24px] rounded-r-md bg-white dark:bg-[#15171c]">
      <h1 className="text-[32px] text-[#5d5c61] dark:text-white mb-1 text-center">
        Reset Password
      </h1>
      <p className="text-[#5d5c61] dark:text-white mb-2 text-[12px] text-center">
        Hello There !
      </p>
      <Formik
        initialValues={ResetPasswordInitialValues}
        validationSchema={ResetPasswordValidation}
        onSubmit={submitHandler}
        validate={validate}
      >
        {(formik) => (
          <form
            onSubmit={formik.handleSubmit}
            noValidate
            className="mt-5"
            autoComplete="off"
          >
            <div className="flex w-full">
              <PasswordInput
                formik_props={formik.getFieldProps("password1")}
                toggleVisibility={toggleVisibilityP1}
                isVisible={isVisibleP1}
                formik_change={formik.handleChange}
                placeholder="Password"
              />
            </div>
            <div className="text-sm text-gray-400 px-1 pt-1">
              {formik.errors.password1}
            </div>

            <div className="flex w-full mt-2">
              <PasswordInput
                formik_props={formik.getFieldProps("password2")}
                toggleVisibility={toggleVisibilityP2}
                isVisible={isVisibleP2}
                formik_change={formik.handleChange}
                placeholder="Confirm Password"
              />
            </div>
            <div className="text-sm text-gray-400 px-1 pt-1">
              {formik.errors.password2}
            </div>

            <LoginButton text="Reset Password" submitLoading={submitLoading} />

            <div
              className="text-center pt-[8px] pb-[32px] text-sm text-[#5d5c61] cursor-pointer  dark:text-white "
              onClick={() => router.push("/login")}
            >
              Login
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

export default ResetPasswordComponent;
