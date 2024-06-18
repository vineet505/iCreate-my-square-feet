import { object, string, number } from "yup";


const AddRegionSchema = object({
  region_title: string()
    .required("Required")
    .min(3, "Minimum Length is Three Characters"),
  region_description: string()
    .required("Required")
    .min(4, "Minimum Length is Four Characters"),
  region_lat: number(),
  region_lng: number(),

});

export { AddRegionSchema };
