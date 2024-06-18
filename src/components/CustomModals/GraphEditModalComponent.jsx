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
import { PropertyCandlestickSchema } from "@/validationSchema/InvestmentPropertySchema";
import { useState } from "react";
import { getDateFromTimestamp, convertToUnixTimestamp  } from "@/utility/utils";
import { useSession } from "next-auth/react";
import { SetPropertyCandlesRequest } from "@/lib/Investment/InvestmentpropertyHandler";
import { SetPropertyCandlesUrl } from "@/static/ApiEndpoints";

export default function GraphEditModalComponent({
  isOpen,
  onOpenChange,
  existingDates,
  old_candle_data,
  selected,
  handleRefresh,
  property_id,
}) {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    date: getDateFromTimestamp(old_candle_data[selected]?.time),
    price: old_candle_data[selected]?.price,
  };

  const submitHandler = (values) => {
    let candle_data = old_candle_data.map((candle) => {
      if (parseInt(candle.id.split("-")[1]) == parseInt(selected)) {
        return {
          timestamp: convertToUnixTimestamp(values.date),
          price: values.price,
        };
      }
      return {
        timestamp: candle.time,
        price: candle.price,
      };
    });

    let request_body = {
      property_id: property_id,
      candle_data: candle_data,
    };
    // Sort the candles
    request_body.candle_data.sort((a, b) => {
      return a.timestamp - b.timestamp;
    });
    setTimeout(async () => {
      setIsLoading(true);
      SetPropertyCandlesRequest(
        SetPropertyCandlesUrl,
        request_body,
        session?.jwt
      )
        .then((response) => {
          setIsLoading(false);
          onOpenChange(false);
          handleRefresh();
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }, 1);
  };

  const validate = (values) => {
    const errors = {};
    if (
      existingDates
        .filter((date, index) => index !== selected)
        .includes(getDateFromTimestamp(values.date))
    ) {
      errors.date = "Date already exists.";
    }
    return errors;
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Candle
              </ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={initialValues}
                  validationSchema={PropertyCandlestickSchema}
                  onSubmit={submitHandler}
                  validateOnChange={true}
                  validate={validate}
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
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-1">
                          {/* Date */}
                          <div className="flex-auto mx-2 my-2 ">
                            <Input
                              type="date"
                              size="sm"
                              label={"Date"}
                              {...formik.getFieldProps("date")}
                              isInvalid={formik.errors["date"]}
                              errorMessage={formik.errors["date"]}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex-auto mx-2 my-2 ">
                          <Input
                            type="number"
                            size="sm"
                            label={"Price"}
                            {...formik.getFieldProps("price")}
                            isInvalid={
                              formik.errors["price"] && formik.touched["price"]
                            }
                            errorMessage={
                              formik.errors["price"] && formik.touched["price"]
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
                            onClose();
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
