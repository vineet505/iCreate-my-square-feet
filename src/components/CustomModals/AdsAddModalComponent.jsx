import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Input,
} from "@nextui-org/react";
import { Formik } from "formik";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { AddAdsUrl } from "@/static/ApiEndpoints";
import { SetAdsRequest } from "@/lib/Ads/AdsHandler";
import { toastHandler } from "../Toaster/ToasterHandler";
import { AddAdsSchema } from "@/validationSchema/AdsRequestSchema";

export default function AdsAddModalComponent({
  isOpen,
  onOpenChange,
  handleRefresh,
}) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    title: "",
    cta_text: "",
    cta_url: "",
  };

  const submitHandler = async (values) => {
    let request_body = {
      title: values.title,
      cta_text: values.cta_text,
      cta_url: values.cta_url,
    };
    setIsLoading(true);
    let response = await SetAdsRequest(AddAdsUrl, request_body, session?.jwt);
    toastHandler(response.data.message);
    setIsLoading(false);
    onOpenChange(false);
    handleRefresh();
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Ads</ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={AddAdsSchema}
                  onSubmit={submitHandler}
                  validateOnChange={true}
                  validateOnBlur={true}
                  initialTouched={false}
                >
                  {/* Datetime and Input Component for Price and Time */}
                  {(formik) => (
                    <form
                      onSubmit={formik.handleSubmit}
                      noValidate
                      autoComplete="off"
                    >
                      <div className="flex flex-col gap-1">
                        <div className="flex-auto mx-2 my-2 ">
                          <Input
                            type="text"
                            size="sm"
                            label={"Title"}
                            {...formik.getFieldProps("title")}
                            isInvalid={
                              formik.errors["title"] && formik.touched["title"]
                            }
                            errorMessage={
                              formik.errors["title"] && formik.touched["title"]
                            }
                          />
                        </div>
                        <div className="flex-auto mx-2 my-2 ">
                          <Input
                            type="text"
                            size="sm"
                            label={"CTA Text"}
                            {...formik.getFieldProps("cta_text")}
                            isInvalid={
                              formik.errors["cta_text"] &&
                              formik.touched["cta_text"]
                            }
                            errorMessage={
                              formik.errors["cta_text"] &&
                              formik.touched["cta_text"]
                            }
                          />
                        </div>
                        <div className="flex-auto mx-2 my-2 ">
                          <Input
                            type="text"
                            size="sm"
                            label={"CTA URL"}
                            {...formik.getFieldProps("cta_url")}
                            isInvalid={
                              formik.errors["cta_url"] &&
                              formik.touched["cta_url"]
                            }
                            errorMessage={
                              formik.errors["cta_url"] &&
                              formik.touched["cta_url"]
                            }
                          />
                        </div>
                      </div>
                      <div className="flex justify-end mt-5 ">
                        <Button
                          color="danger"
                          variant="flat"
                          onPress={onClose}
                          className="my-4 mx-2"
                        >
                          Close
                        </Button>
                        <Button
                          onClick={() => {
                            formik.handleSubmit(formik);
                          }}
                          type="submit"
                          isLoading={isLoading}
                          color="default"
                          radius="sm"
                          className="my-4 mx-2 bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                        >
                          Save
                        </Button>
                      </div>
                    </form>
                  )}
                </Formik>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
