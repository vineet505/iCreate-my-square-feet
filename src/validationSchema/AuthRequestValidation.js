import { object, string } from "yup";

const LoginValidationSchema = object({
    email: string().email("Invalid email address").required("Required"),
    password: string()
      .min(4, "Minimum Length is Four Characters")
      .max(10, "Maximum Length is Ten Characters"),
  });

const ForgotRequestValidation = object({
    email: string().email("Invalid email address").required("Required"),
  });

const ResetPasswordValidation = object({
  "password1": string()
    .min(4, "Minimum Length is Four Characters")
    .max(10, "Maximum Length is Ten Characters"),
  "password2": string()
    .min(4, "Minimum Length is Four Characters")
    .max(10, "Maximum Length is Ten Characters"),
});


export {LoginValidationSchema, ForgotRequestValidation, ResetPasswordValidation}