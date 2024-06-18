import { object, string, boolean, number } from "yup";

export const listingTypeOptions = [
  { value: "sell", label: "Sell" },
  { value: "rent", label: "Rent" },
  { value: "others", label: "Others" },
];

export const listedByOptions = [
  { value: "broker", label: "Broker" },
  { value: "owner", label: "Owner" },
];

export const propertyTypeOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "flat", label: "Flat" },
  { value: "farm_house", label: "Farm House" },
  { value: "villa", label: "Villa" },
];

export const FarmLandPropertyTypeOptions = [
  { value: "agriculture_land", label: "Agriculture Land" },
  { value: "farm_house", label: "Farm House" },
];

export const furnishingOptions = [
  { value: "furnished", label: "Furnished" },
  { value: "semi_furnished", label: "Semi Furnished" },
  { value: "unfurnished", label: "Unfurnished" },
];

export const facingOptions = [
  { value: "north", label: "North" },
  { value: "east", label: "East" },
  { value: "west", label: "West" },
  { value: "south", label: "South" },
  { value: "north_east", label: "North East" },
  { value: "north_west", label: "North West" },
  { value: "south_east", label: "South East" },
  { value: "south_west", label: "South West" },
];

export const possessionTypeOptions = [
  { value: "ready_to_move", label: "Ready To Move" },
  { value: "under_construction", label: "Under Construction" },
  { value: "others", label: "Others" },
];

export const regionOptions = [];

const ResidentialPropertyInitialValues = {
  is_investment_property: null,
  region_id: "",
  listing_type: "",
  listed_by: "",
  property_type: "",
  bedrooms: "",
  bathrooms: "",
  furnishing: "",
  built_up_area: "",
  carpet_area: "",
  maintenance: "",
  floor_no: "",
  car_parking: "",
  facing: "",
  balcony: null,
  possession_type: "",
  description: "",
  project_title: "",
  price: "",
  video_url: "",
  address: "",
  roi_percentage: "",
};

const ResidentialKeyAndLabels = {
  checkbox: [
    {
      key: "is_investment_property",
      label: "Is Investment Property",
      type: "checkbox",
    },
    { key: "balcony", label: "Balcony", type: "checkbox" },
  ],
  select: [
    {
      key: "region_id",
      label: "Region",
      type: "select",
      options: regionOptions,
    },
    {
      key: "listing_type",
      label: "Listing Type",
      type: "select",
      options: listingTypeOptions,
    },
    {
      key: "listed_by",
      label: "Listed By",
      type: "select",
      options: listedByOptions,
    },
    {
      key: "property_type",
      label: "Property Type",
      type: "select",
      options: propertyTypeOptions,
    },
    {
      key: "furnishing",
      label: "Furnishing",
      type: "select",
      options: furnishingOptions,
    },
    {
      key: "facing",
      label: "Facing",
      type: "select",
      options: facingOptions,
    },
    {
      key: "possession_type",
      label: "Possession Type",
      type: "select",
      options: possessionTypeOptions,
    },
  ],
  number: [
    { key: "bedrooms", label: "Bedrooms", type: "number" },
    { key: "bathrooms", label: "Bathrooms", type: "number" },
    { key: "built_up_area", label: "Built Up Area", type: "number" },
    { key: "carpet_area", label: "Carpet Area", type: "number" },
    { key: "maintenance", label: "Maintenance", type: "number" },
    { key: "floor_no", label: "Floor No", type: "number" },
    { key: "car_parking", label: "Car Parking", type: "number" },
    { key: "price", label: "Price", type: "number" },
    { key: "roi_percentage", label: "ROI Percentage", type: "number" },
  ],
  textarea: [{ key: "description", label: "Description", type: "textarea" }],
  text: [
    { key: "project_title", label: "Project Title", type: "text" },
    { key: "video_url", label: "Video URL", type: "text" },
    { key: "address", label: "Address", type: "text" },
  ],
};

const ResidentialPropertyRequestSchema = object({
  is_investment_property: boolean().default(false),
  region_id: string().required("Select Region."),
  listing_type: string().required("Select Listing Type."),
  listed_by: string().required("Select Listed By."),
  property_type: string().required("Select Property Type."),
  bedrooms: number().integer().default(0),
  bathrooms: number().integer().default(0),
  furnishing: string().required("Select Furnishing."),
  built_up_area: number().positive().required("Enter Built Up Area."),
  carpet_area: number().positive().required("Enter Carpet Area."),
  maintenance: number().positive().required("Enter Maintenance."),
  floor_no: number().integer().default(0),
  car_parking: number().integer().default(0),
  facing: string().required("Select Facing."),
  balcony: boolean().default(false),
  possession_type: string().required("Select Possession Type."),
  description: string().required("Enter Description."),
  project_title: string().required("Enter Project Title."),
  price: number().positive().required("Enter Price."),
  video_url: string(),
  address: string().required("Enter Address."),
  roi_percentage: number().positive().required("Enter ROI Percentage."),
  //   Implement Location later
});

const CommercialPropertyRequestSchema = object({
  is_investment_property: boolean().default(false),
  region_id: string().required(),
  listing_type: string().required("Select Listing Type."),
  listed_by: string().required("Select Listed By."),
  property_type: string(),
  bathrooms: number().integer(),
  furnishing: string().required("Select Furnishing."),
  built_up_area: number().positive(),
  carpet_area: number().positive(),
  maintenance: number().positive(),
  car_parking: number().integer(),
  facing: string().required("Select Facing."),
  possession_type: string().required("Select Possession Type."),
  description: string(),
  project_title: string(),
  price: number().positive(),
  video_url: string(),
  address: string(),
  roi_percentage: number(),
});

const CommercialPropertyInitialValues = {
  is_investment_property: false,
  region_id: "",
  listing_type: "",
  listed_by: "",
  property_type: "",
  bathrooms: "",
  furnishing: "",
  built_up_area: "",
  carpet_area: "",
  maintenance: "",
  car_parking: "",
  facing: "",
  possession_type: "",
  description: "",
  project_title: "",
  price: "",
  video_url: "",
  address: "",
  roi_percentage: "",
};

const CommercialKeyAndLabels = {
  checkbox: [
    {
      key: "is_investment_property",
      label: "Is Investment Property",
      type: "checkbox",
    },
  ],
  select: [
    {
      key: "region_id",
      label: "Region",
      type: "select",
      options: regionOptions,
    },
    {
      key: "listing_type",
      label: "Listing Type",
      type: "select",
      options: listingTypeOptions,
    },
    {
      key: "listed_by",
      label: "Listed By",
      type: "select",
      options: listedByOptions,
    },
    {
      key: "property_type",
      label: "Property Type",
      type: "select",
      options: [
        { value: "office", label: "Office" },
        { value: "shop", label: "Shop" },
        { value: "showroom", label: "Showroom" },
        { value: "commercial_land", label: "Commercial Land" },
        { value: "industrial_building", label: "Industrial Building" },
        { value: "industrial_shed", label: "Industrial Shed" },
        { value: "warehouse", label: "Warehouse" },
      ],
    },
    {
      key: "furnishing",
      label: "Furnishing",
      type: "select",
      options: furnishingOptions,
    },
    {
      key: "facing",
      label: "Facing",
      type: "select",
      options: facingOptions,
    },
    {
      key: "possession_type",
      label: "Possession Type",
      type: "select",
      options: possessionTypeOptions,
    },
  ],

  number: [
    { key: "bathrooms", label: "Bathrooms", type: "number" },
    { key: "built_up_area", label: "Built Up Area", type: "number" },
    { key: "carpet_area", label: "Carpet Area", type: "number" },
    { key: "maintenance", label: "Maintenance", type: "number" },
    { key: "car_parking", label: "Car Parking", type: "number" },
    { key: "price", label: "Price", type: "number" },
    { key: "roi_percentage", label: "ROI Percentage", type: "number" },
  ],

  textarea: [{ key: "description", label: "Description", type: "textarea" }],

  text: [
    { key: "project_title", label: "Project Title", type: "text" },
    { key: "video_url", label: "Video URL", type: "text" },
    { key: "address", label: "Address", type: "text" },
  ],
};

const FarmLandPropertyRequestSchema = object({
  is_investment_property: boolean().default(false),
  region_id: string().required(),
  listing_type: string().required("Select Listing Type."),
  property_type: string(),
  listed_by: string().required("Select Listed By."),
  length: number().positive(),
  breadth: number().positive(),
  plot_area: number().positive(),
  facing: string().required("Select Facing."),
  possession_type: string().required("Select Possession Type."),
  description: string(),
  project_title: string(),
  price: number().positive(),
  video_url: string(),
  address: string(),
  roi_percentage: number(),
});

const FarmLandPropertyInitialValues = {
  is_investment_property: false,
  region_id: "",
  listing_type: "",
  listed_by: "",
  property_type: "",
  length: "",
  breadth: "",
  plot_area: "",
  facing: "",
  possession_type: "",
  description: "",
  project_title: "",
  price: "",
  video_url: "",
  address: "",
  roi_percentage: "",
};

const FarmLandKeyAndLabels = {
  checkbox: [
    {
      key: "is_investment_property",
      label: "Is Investment Property",
      type: "checkbox",
    },
  ],
  select: [
    {
      key: "region_id",
      label: "Region",
      type: "select",
      options: regionOptions,
    },
    {
      key: "listing_type",
      label: "Listing Type",
      type: "select",
      options: listingTypeOptions,
    },
    {
      key: "listed_by",
      label: "Listed By",
      type: "select",
      options: listedByOptions,
    },
    {
      key: "property_type",
      label: "Property Type",
      type: "select",
      options: [
        { value: "agriculture_land", label: "Agriculture Land" },
        { value: "farm_house", label: "Farm House" },
      ],
    },
    {
      key: "facing",
      label: "Facing",
      type: "select",
      options: facingOptions,
    },
    {
      key: "possession_type",
      label: "Possession Type",
      type: "select",
      options: possessionTypeOptions,
    },
  ],

  number: [
    { key: "length", label: "Length", type: "number" },
    { key: "breadth", label: "Breadth", type: "number" },
    { key: "plot_area", label: "Plot Area", type: "number" },
    { key: "price", label: "Price", type: "number" },
    { key: "roi_percentage", label: "ROI Percentage", type: "number" },
  ],

  textarea: [{ key: "description", label: "Description", type: "textarea" }],

  text: [
    { key: "project_title", label: "Project Title", type: "text" },
    { key: "video_url", label: "Video URL", type: "text" },
    { key: "address", label: "Address", type: "text" },
  ],
};

export const PropertyCandlestickSchema = object({
  price: number().positive().required("Enter Price."),
  date: string().required("Enter Date."),
});

export {
  ResidentialPropertyRequestSchema,
  ResidentialPropertyInitialValues,
  ResidentialKeyAndLabels,
  CommercialPropertyRequestSchema,
  CommercialPropertyInitialValues,
  CommercialKeyAndLabels,
  FarmLandPropertyRequestSchema,
  FarmLandPropertyInitialValues,
  FarmLandKeyAndLabels,
};
