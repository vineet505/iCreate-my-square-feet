import React from "react";
import {
  Input,
  Checkbox,
  Select,
  SelectSection,
  SelectItem,
  Textarea,
  Button,
} from "@nextui-org/react";
import { Formik } from "formik";
import RegionMapComponent from "../Map/RegionMapComponent";
import { useCallback, useEffect, useState } from "react";
import { listedByLotsOptions } from "@/validationSchema/InvestmentPropertySchema";
export const PropertyFormComponent = ({
  locationHandler,
  initialValues,
  validationSchema,
  keyAndLabels,
  submitHandler,
  isLoading,
}) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedLot, setSelectedLot] = useState(
    initialValues.listed_by_lots ||
      listedByLotsOptions[0].value ||
      listedByLotsOptions[3].value
  );

  useEffect(() => {
    setFormValues((prevValues) => ({
      ...prevValues,
      is_investment_property: false,
      balcony: false,
      listed_by_lots:
        prevValues.listed_by_lots ||
        listedByLotsOptions[0].value ||
        listedByLotsOptions[3].value,
    }));
  }, [initialValues]);

  const MapComponent = useCallback(
    <div className="flex flex-wrap w-full md:w-1/2 my-2">
      <RegionMapComponent locationHandler={locationHandler} />
    </div>,
    []
  );
  let ans = (x, y) => {
    if (!x || !y) {
      return 0;
    }
    const data = x / y;
    // setFormValues((prev) => ({ ...prev, quantity: data }));
    return data;
  };

  return (
    <Formik
      initialValues={formValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
      validateOnChange={true}
      validateOnBlur={true}
      initialTouched={false}
      enableReinitialize={true}
    >
      {(formik) => {
        useEffect(() => {
          // Set initial values based on selectedLot
          if (selectedLot === "custom_sqft" || selectedLot === "single_user") {
            formik.setFieldValue("quantity", 0);
            formik.setFieldValue("slot_size", 0);
          } else {
            const { carpet_area, slot_size } = formik.values;
            if (carpet_area && slot_size) {
              const quantity = carpet_area / slot_size;
              formik.setFieldValue("quantity", quantity);
            } else {
              formik.setFieldValue("quantity", 0);
            }
          }
        }, [selectedLot, formik.values.carpet_area, formik.values.slot_size]);

        return (
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="on">
            <div className="flex flex-wrap h-full ">
              <div className="w-full md:w-1/2 flex flex-wrap">
                {keyAndLabels.text.map((item, index) => {
                  return (
                    <div key={index} className="flex-1 mx-2 my-2 ">
                      <Input
                        {...formik.getFieldProps(item.key)}
                        size="sm"
                        label={item.label}
                        isInvalid={
                          formik.errors[item.key] && formik.touched[item.key]
                        }
                        errorMessage={
                          formik.errors[item.key] && formik.touched[item.key]
                        }
                      />
                    </div>
                  );
                })}

                <div className="flex flex-wrap my-2">
                  {keyAndLabels.number.map((item, index) => {
                    return (
                      <div key={index} className="flex-auto mx-2 my-2 ">
                        <Input
                          type="number"
                          size="sm"
                          label={item.label}
                          {...formik.getFieldProps(item.key)}
                          isInvalid={
                            formik.errors[item.key] && formik.touched[item.key]
                          }
                          errorMessage={
                            formik.errors[item.key] && formik.touched[item.key]
                          }
                        />
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap w-full my-2">
                  {keyAndLabels.checkbox.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className=" w-full md:w-[30%] mx-2 my-2 "
                      >
                        <Checkbox
                          {...formik.getFieldProps(item.key)}
                          color="default"
                          size="sm"
                          label={item.label}
                        >
                          {item.label}
                        </Checkbox>
                      </div>
                    );
                  })}
                </div>
              </div>

              {MapComponent}
            </div>

            <div className=" w-full flex flex-wrap h-full my-2">
              {keyAndLabels.select.map((item, index) => {
                return (
                  <div key={index} className=" w-full md:w-[15%] mx-2 my-2 ">
                    <Select
                      size="sm"
                      label={item.label}
                      {...formik.getFieldProps(item.key)}
                      isInvalid={
                        formik.errors[item.key] && formik.touched[item.key]
                      }
                      errorMessage={
                        formik.errors[item.key] && formik.touched[item.key]
                      }
                      onChange={(e) => {
                        formik.handleChange(e);
                        item.key == "listed_by_lots" &&
                          setSelectedLot(
                            listedByLotsOptions[parseInt(e.target.value)].value
                          );
                      }}
                    >
                      <SelectSection label={item.label}>
                        {item?.options?.map((option, index) => {
                          return (
                            <SelectItem key={index} value={option.value}>
                              {option.label}
                            </SelectItem>
                          );
                        })}
                      </SelectSection>
                    </Select>
                  </div>
                );
              })}
              {selectedLot !== "custom_sqft" &&
                selectedLot !== "single_user" && (
                  <>
                    <div className=" w-full md:w-[15%] mx-2 my-2 ">
                      <Input
                        type="number"
                        size="sm"
                        label={selectedLot}
                        {...formik.getFieldProps("slot_size")}
                        isInvalid={
                          formik.errors["slot_size"] &&
                          formik.touched["slot_size"]
                        }
                        errorMessage={
                          formik.errors["slot_size"] &&
                          formik.touched["slot_size"]
                        }
                      />
                    </div>
                    <div className=" w-full md:w-[15%] mx-2 my-2 ">
                      <Input
                        {...formik.getFieldProps("quantity")}
                        size="sm"
                        label={"Quantity"}
                        value={formik.values.quantity}
                        readOnly
                      />
                    </div>
                  </>
                )}
            </div>
            <div className="flex flex-wrap  w-full ">
              {keyAndLabels.textarea.map((item, index) => {
                return (
                  <div key={index} className=" w-full  mx-2 my-2 ">
                    <Textarea
                      size="lg"
                      label={item.label}
                      {...formik.getFieldProps(item.key)}
                      isInvalid={
                        formik.errors[item.key] && formik.touched[item.key]
                      }
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex  ">
              <Button
                onClick={() => formik.handleSubmit(formik)}
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
        );
      }}
    </Formik>
  );
};
