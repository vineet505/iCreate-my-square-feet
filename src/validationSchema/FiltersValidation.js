import { number, object, date, string} from "yup";

const BuySellFiltersValidationSchema = object({
  min_date: date().nullable(),
  max_date: date().nullable(),
});

const UsersFilterValidationSchema = object({
  legal_name: string().nullable(),
  email: string().nullable(),
  mobile_number: string().nullable(),
});

const RegionFilterValidationSchema = object({
  region: string().nullable(),
  status: string().nullable(),
});

export { BuySellFiltersValidationSchema, UsersFilterValidationSchema , RegionFilterValidationSchema};
