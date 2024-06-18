import React from "react";
import { FilterOutlined } from "@ant-design/icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Button,
} from "@nextui-org/react";
import { Formik } from "formik";
import { UsersFilterValidationSchema } from "@/validationSchema/FiltersValidation";

const initialValues = {
   "legal_name": "",
    "email": "",
    "mobile_number": "",
};

export const UsersFilterComponent = ({setBody}) => {
  const filterPoints = [
    { label: "Name", key: "legal_name" },
    { label: "Email", key: "email" },
    { label: "Mobile Number", key: "mobile_number" },
  ];

  const submitHandler = (values) => {
    setBody(
      {
        legal_name: values.legal_name,
        email: values.email,
        mobile_number: values.mobile_number,
      }
    )
  };

  const resetHandler = (valueResetter) => {
    setBody(
      {
        legal_name: "",
        email: "",
        mobile_number: "",
      }
    ) 
    valueResetter.resetForm()
  };

  const content = (
    <PopoverContent>
      <Formik
        initialValues={initialValues}
        validationSchema={UsersFilterValidationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <div className="px-1 pb-2">
              {filterPoints.map((point, index) => (
                <Input
                  key={point.key}
                  isInvalid={formik.errors[point.key]}
                  errorMessage={formik.errors[point.key]}
                  className="w-full my-2"
                  size="sm"
                  type="text"
                  labelPlacement={"outside"}
                  label={point.label}
                  {...formik.getFieldProps(point.key)}
                />
              ))}
              <div className="flex mt-4 justify-around items-center">
                <Button
                  radius="md"
                  size="sm"
                  className=" text-white "
                  color="danger"
                  onClick={()=> resetHandler(formik)}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  radius="md"
                  size="sm"
                  className="bg-gradient-to-r  from-cyan-500 to-blue-500 text-white "
                >
                  Filter
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </PopoverContent>
  );
  return (
    <Popover key={"foreground"} placement="bottom-end" color="default">
      <PopoverTrigger>
        <div className="mr-2 bg-[#270000] dark:bg-white cursor-pointer text-white dark:text-black px-3 rounded-md  flex items-center">
          <FilterOutlined />
        </div>
      </PopoverTrigger>
      {content}
    </Popover>
  );
};

