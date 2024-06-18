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
import { useCallback, useState, useEffect } from "react";
export const UpdatePropertyFormComponent = ({
  locationHandler,
  initialValues,
  validationSchema,
  keyAndLabels,
  submitHandler,
  isLoading,
}) => {
  const [formvalues, setFormValues] = useState(initialValues);

  const MapComponent = useCallback(
    <div className="flex flex-wrap w-full md:w-1/2 my-2">
      <RegionMapComponent
        locationHandler={locationHandler}
        isNew={false}
        fetchedLocation={initialValues.location}
      />
    </div>,
    [locationHandler, initialValues]
  );
  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);
  return (
    <Formik
      initialValues={formvalues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={submitHandler}
      validateOnChange={true}
      validateOnBlur={true}
      initialTouched={false}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
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
                      value={formik.values[item.key] || ""}
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
                        value={formik.values[item.key] || ""}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap w-full my-2">
                {keyAndLabels.checkbox.map((item, index) => {
                  if (formvalues[item.key] === undefined || formvalues[item.key]==null) return null;
                  return (
                    <div key={index} className=" w-full md:w-[30%] mx-2 my-2 ">
                      <Checkbox
                        {...formik.getFieldProps(item.key)}
                        color="default"
                        size="sm"
                        label={item.label}
                        isSelected={formik.values[item.key] || false}
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
                if(formvalues[item.key] === undefined || formvalues[item.key] === null || formvalues[item.key] === ""){
                    return null;
                }
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
                    defaultSelectedKeys={(formvalues[item.key])}
                    
                  >
                    <SelectSection label={item.label}>
                      {item.options.map((option, index) => {
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
                    errorMessage={
                      formik.errors[item.key] && formik.touched[item.key]
                    }
                    value={formik.values[item.key] || ""}
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
      )}
    </Formik>
  );
};
