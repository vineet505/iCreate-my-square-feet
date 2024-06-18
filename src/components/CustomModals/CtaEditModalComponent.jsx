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
import { EditCTACardUrl } from "@/static/ApiEndpoints";
import { UpdateCtaRequest } from "@/lib/Cta/CtaHandler";
import { toastHandler } from "../Toaster/ToasterHandler";
import { AddCtaSchema } from "@/validationSchema/CtaRequestSchema";

export default function CtaEditModalComponent({
 selectedCtaCard,
  isOpen,
  onOpenChange,
  handleRefresh,
}) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    title: selectedCtaCard.title,
    cta_text: selectedCtaCard.description,
    video_url: selectedCtaCard.video_url,
  };

  const submitHandler = async (values) => {
    let request_body = {
      card_id: selectedCtaCard.id,
      title: values.title,
      cta_text: values.cta_text,
      video_url: values.video_url,
    };
    setIsLoading(true);
    let response = await UpdateCtaRequest(EditCTACardUrl, request_body, session?.jwt);
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
              <ModalHeader className="flex flex-col gap-1">Edit CTA Card</ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  enableReinitialize={true}
                  validationSchema={AddCtaSchema}
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
                            label={"Video URL"}
                            {...formik.getFieldProps("video_url")}
                            isInvalid={
                              formik.errors["video_url"] &&
                              formik.touched["video_url"]
                            }
                            errorMessage={
                              formik.errors["video_url"] &&
                              formik.touched["video_url"]
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
                          Update
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
