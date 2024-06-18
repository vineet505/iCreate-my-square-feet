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
import { BuySellFiltersValidationSchema } from "@/validationSchema/FiltersValidation";

const initialValues = {
  min_date: new Date().toISOString().split("T")[0],
  max_date: new Date().toISOString().split("T")[0],
};

const BuySellDropDownComponent = ({setBody}) => {
  const filterPoints = [
    { label: "Quantity", key: "quantity" },
    { label: "Amount", key: "amount" },
    { label: "Average Price", key: "avg_price" },
  ];

  const submitHandler = (values) => {
    setBody(
      {
        min_date: new Date(values.min_date).getTime(),
        max_date: new Date(values.max_date).getTime()
      }
    )
  };

  const resetHandler = (valueResetter) => {
    setBody(
      {
        min_date: 0,
        max_date: new Date().toISOString().split("T")[0],
      }
    ) 
    valueResetter.resetForm()
  };

  const content = (
    <PopoverContent>
      <Formik
        initialValues={initialValues}
        validationSchema={BuySellFiltersValidationSchema}
        onSubmit={submitHandler}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <div className="px-1 ">
              {/* {filterPoints.map((point, index) => (
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
                  placeholder={"0"}
                />
              ))} */}
              <Input
                  key={"min_date"}
                  isInvalid={formik.errors["min_date"]}
                  errorMessage={formik.errors["min_date"]}
                  className="w-full my-2"
                  size="sm"
                  type="date"
                  labelPlacement={"outside"}
                  label={"From Date"}
                  {...formik.getFieldProps("min_date")}
                />
              <Input
                  key={"max_date"}
                  isInvalid={formik.errors["max_date"]}
                  errorMessage={formik.errors["max_date"]}
                  className="w-full my-2"
                  size="sm"
                  type="date"
                  labelPlacement={"outside"}
                  label={"To Date"}
                  {...formik.getFieldProps("max_date")}
                />
              <div className="flex mt-2 justify-around items-center">
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
        <div className="mr-4 bg-[#270000] dark:bg-white dark:text-black cursor-pointer text-white px-3 rounded-md py-2">
          <FilterOutlined />
        </div>
      </PopoverTrigger>
      {content}
    </Popover>
  );
};

export default BuySellDropDownComponent;
