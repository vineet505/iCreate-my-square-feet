import { object, string } from "yup";

const UpdateUserDetailsSchema = object({
  email: string().email("Invalid email address").required("Required"),
  number: string()
    .required("Required")
    .min(12, "Minimum Length is 12 Characters"),
  legal_name: string()
    .required("Required")
    .min(4, "Minimum Length is Four Characters"),
  password: string()
    .required("Required")
    .min(4, "Minimum Length is Four Characters")
    .max(10, "Maximum Length is Ten Characters"),
});

const PostUserDetailsSchema = object({
  email: string().email("Invalid email address").required("Required"),
  number: string()
    .required("Required")
    .min(12, "Minimum Length is 12 Characters"),
  legal_name: string()
    .required("Required")
    .min(4, "Minimum Length is Four Characters"),
  password: string()
    .required("Required")
    .min(4, "Minimum Length is Four Characters")
    .max(10, "Maximum Length is Ten Characters"),
});

export { UpdateUserDetailsSchema, PostUserDetailsSchema };
