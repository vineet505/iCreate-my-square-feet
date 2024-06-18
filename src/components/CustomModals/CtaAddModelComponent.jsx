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
import { AddCTACardUrl } from "@/static/ApiEndpoints";
import { SetCtaRequest } from "@/lib/Cta/CtaHandler";
import { toastHandler } from "../Toaster/ToasterHandler";
import { AddCtaSchema } from "@/validationSchema/CtaRequestSchema";

const initialInputs = [
  {
    label: "Title",
    name: "title",
  },
  {
    label: "Description",
    name: "description",
  },
  {
    label: "Cta Text",
    name: "cta_text",
  },
  {
    label: "Cta Url",
    name: "cta_url",
  },
];

export default function CtaAddModalComponent({
  isOpen,
  onOpenChange,
  handleRefresh,
}) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = {
    title: "",
    description: "",
    cta_text: "",
    cta_url: "",
  };

  const submitHandler = async (values) => {
    let request_body = {
      title: values.title,
      description: values.description,
      cta_text: values.cta_text,
      cta_url: values.cta_url,
    };
    setIsLoading(true);
    let response = await SetCtaRequest(
      AddCTACardUrl,
      request_body,
      session?.jwt
    );
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
              <ModalHeader className="flex flex-col gap-1">
                Add Cta Cards
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
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
                        {initialInputs.map((item, index) => {
                          return (
                            <Input
                              key={index}
                              type="text"
                              size="sm"
                              className="my-2"
                              label={item.label}
                              {...formik.getFieldProps(item.name)}
                              isInvalid={
                                formik.errors[item.name] &&
                                formik.touched[item.name]
                              }
                              errorMessage={
                                formik.errors[item.name] &&
                                formik.touched[item.name]
                              }
                            />
                          );
                        })}
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
