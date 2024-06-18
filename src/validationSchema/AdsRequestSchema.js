import { object, string } from "yup";

export const AddAdsSchema = object({
  title: string().required("Title is required"),
  cta_text: string().required("CTA Text is required"),
  cta_url: string().required("CTA Url is required"),
});
