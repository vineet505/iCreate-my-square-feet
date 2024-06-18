import { object, string } from "yup";

export const AddWelcomeCardsSchema = object({
  title: string().required("Title is required"),
  cta_text: string().required("CTA Text is required"),
  video_url: string().required("Video Url is required"),
});
