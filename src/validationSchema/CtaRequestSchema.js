import { object, string } from "yup";

export const AddCtaSchema = object({
  title: string().required("Title is required"),
  cta_text: string().required("CTA Text is required"),
  description: string().required("Description is required"),
  cta_url: string().required("CTA URL is required"),
  
});
