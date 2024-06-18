import {
  listedByOptions,
  listingTypeOptions,
  propertyTypeOptions,
  FarmLandPropertyTypeOptions,
  furnishingOptions,
  possessionTypeOptions,
  facingOptions,
}
from "@/validationSchema/InvestmentPropertySchema"

function timeStamptoLocalDate(timestamp) {
  let date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

function decimalFormatter(number) {
  return number.toFixed(2).toString();
}

function investmentFormatter(properties) {
  let data = [];
  properties.forEach((property) => {
    let propertyData = {};
    propertyData["id"] = property.id;
    propertyData["project_title"] = property.project_title;
    propertyData["address"] = property.address;
    propertyData["price"] = decimalFormatter(property.price);
    propertyData["images"] = property.images;
    propertyData["project_logo"] = property.project_logo;
    propertyData["listed_by"] = property.listed_by;
    propertyData["created_at"] = timeStamptoLocalDate(property.created_at);
    propertyData["location"] = property.location;
    propertyData["status"] = property.status ? true : false;
    propertyData["category"] = property.category;
    propertyData["is_investment_property"] = property.is_investment_property;
    propertyData["listing_type"] = property.listing_type;
    propertyData["description"] = property.description;
    propertyData["roi_percentage"] = property.roi_percentage;
    propertyData["view_count"] = property.view_count;
    propertyData["available_shares"] = property.available_shares;
    data.push(propertyData);
  });
  return data;
}


function ResidentialPropertyDetailsFormatter(property) {
  // create a formatter on the basis of above
  let propertyDetails = {};
  propertyDetails["id"] = property.id;
  propertyDetails["project_title"] = property.project_title;
  propertyDetails["address"] = property.address;
  propertyDetails["price"] = decimalFormatter(property.price);
  propertyDetails["listed_by"] = property.listed_by;
  // Get the index of the value from the options listedByOptions
  let index = listedByOptions.findIndex(
    (option) => option.value == property.listed_by
  );
  propertyDetails["listed_by"] = index.toString();
  propertyDetails["location"] = {
    lat: property.location.coordinates[1],
    lng: property.location.coordinates[0],
  
  };
  propertyDetails["status"] = property.status == "active" ? true : false;
  propertyDetails["category"] = property.category;
  propertyDetails["is_investment_property"] = property.is_investment_property;
  propertyDetails["region_id"] = property.region_id;
  propertyDetails["listing_type"] = property.listing_type;
  // Get the index of the value from the options listingTypeOptions
  index = listingTypeOptions.findIndex(
    (option) => option.value == property.listing_type
  );
  propertyDetails["listing_type"] = index.toString();
  propertyDetails["bedrooms"] = property.property_info.bedrooms;
  propertyDetails["property_type"] = property.property_info.property_type;
  // Get the index of the value from the options propertyTypeOptions
  index = propertyTypeOptions.findIndex(
    (option) => option.value == property.property_info.property_type
  );
  propertyDetails["property_type"] = index.toString();
  propertyDetails["bathrooms"] = property.property_info.bathrooms;
  propertyDetails["furnishing"] = property.property_info.furnishing;
  // Get the index of the value from the options furnishingOptions
  index = furnishingOptions.findIndex(
    (option) => option.value == property.property_info.furnishing
  );
  propertyDetails["furnishing"] = index.toString();
  propertyDetails["built_up_area"] = property.property_info.built_up_area;
  propertyDetails["carpet_area"] = property.property_info.carpet_area;
  propertyDetails["maintenance"] = property.property_info.maintenance;
  propertyDetails["floor_no"] = property.property_info.floor_no;
  propertyDetails["car_parking"] = property.property_info.car_parking;
  propertyDetails["facing"] = property.property_info.facing;
  // Get the index of the value from the options facingOptions
  index = facingOptions.findIndex((option) => option.value == property.property_info.facing);
  propertyDetails["facing"] = index.toString();
  propertyDetails["balcony"] = property.property_info.balcony;
  propertyDetails["possession_type"] = property.possession_type;
  // Get the index of the value from the options possessionTypeOptions
  index = possessionTypeOptions.findIndex(
    (option) => option.value == property.possession_type
  );
  propertyDetails["possession_type"] = index.toString();
  propertyDetails["description"] = property.description;
  propertyDetails["video_url"] = property.video_url;
  propertyDetails["roi_percentage"] = property.roi_percentage;
  return propertyDetails;

}

function CommercialPropertyDetailsFormatter(property) {
  // create a formatter on the basis of above
  let propertyDetails = {};
  propertyDetails["id"] = property.id;
  propertyDetails["project_title"] = property.project_title;
  propertyDetails["address"] = property.address;
  propertyDetails["price"] = decimalFormatter(property.price);
  propertyDetails["listed_by"] = property.listed_by;
  // Get the index of the value from the options listedByOptions
  let index = listedByOptions.findIndex(
    (option) => option.value == property.listed_by
  );
  propertyDetails["listed_by"] = index.toString();
  propertyDetails["location"] = {
    lat: property.location.coordinates[1],
    lng: property.location.coordinates[0],
  
  };
  propertyDetails["status"] = property.status == "active" ? true : false;
  propertyDetails["category"] = property.category;
  propertyDetails["is_investment_property"] = property.is_investment_property;
  propertyDetails["region_id"] = property.region_id;
  propertyDetails["listing_type"] = property.listing_type;
  // Get the index of the value from the options listingTypeOptions
  index = listingTypeOptions.findIndex(
    (option) => option.value == property.listing_type
  );
  propertyDetails["listing_type"] = index.toString();
  propertyDetails["property_type"] = property.property_info.property_type;
  // Get the index of the value from the options propertyTypeOptions
  index = propertyTypeOptions.findIndex(
    (option) => option.value == property.property_info.property_type
  );
  propertyDetails["property_type"] = index.toString();
  propertyDetails["bathrooms"] = property.property_info.bathrooms;
  propertyDetails["furnishing"] = property.property_info.furnishing;
  // Get the index of the value from the options furnishingOptions
  index = furnishingOptions.findIndex(
    (option) => option.value == property.property_info.furnishing
  );
  propertyDetails["furnishing"] = index.toString();
  propertyDetails["facing"] = property.property_info.facing;
  // Get the index of the value from the options facingOptions
  index = facingOptions.findIndex((option) => option.value == property.property_info.facing);
  propertyDetails["facing"] = index.toString();
  propertyDetails["built_up_area"] = property.property_info.built_up_area;
  propertyDetails["carpet_area"] = property.property_info.carpet_area;
  propertyDetails["maintenance"] = property.property_info.maintenance;
  propertyDetails["floor_no"] = property.property_info.floor_no;
  propertyDetails["car_parking"] = property.property_info.car_parking;
  propertyDetails["possession_type"] = property.possession_type;
  // Get the index of the value from the options possessionTypeOptions
  index = possessionTypeOptions.findIndex(
    (option) => option.value == property.possession_type
  );
  propertyDetails["possession_type"] = index.toString();
  propertyDetails["description"] = property.description;
  propertyDetails["video_url"] = property.video_url;
  propertyDetails["roi_percentage"] = property.roi_percentage;
  return propertyDetails;
    
}


function FarmPropertyDetailsFormatter(property) {
  // create a formatter on the basis of above
  let propertyDetails = {};
  propertyDetails["id"] = property.id;
  propertyDetails["project_title"] = property.project_title;
  propertyDetails["address"] = property.address;
  propertyDetails["price"] = decimalFormatter(property.price);
  propertyDetails["listed_by"] = property.listed_by;
  // Get the index of the value from the options listedByOptions
  let index = listedByOptions.findIndex(
    (option) => option.value == property.listed_by
  );
  propertyDetails["listed_by"] = index.toString();
  propertyDetails["location"] = {
    lat: property.location.coordinates[1],
    lng: property.location.coordinates[0],
  
  };
  propertyDetails["status"] = property.status == "active" ? true : false;
  propertyDetails["category"] = property.category;
  propertyDetails["is_investment_property"] = property.is_investment_property;
  propertyDetails["region_id"] = property.region_id;
  propertyDetails["listing_type"] = property.listing_type;
  // Get the index of the value from the options listingTypeOptions
  index = listingTypeOptions.findIndex(
    (option) => option.value == property.listing_type
  );
  propertyDetails["listing_type"] = index.toString();
  propertyDetails["property_type"] = property.property_info.property_type;
  // Get the index of the value from the options propertyTypeOptions
  index = FarmLandPropertyTypeOptions.findIndex(
    (option) => option.value == property.property_info.property_type
  );
  propertyDetails["property_type"] = index.toString();
  propertyDetails["bathrooms"] = property.property_info.bathrooms;
  propertyDetails["facing"] = property.property_info.facing;
  // Get the index of the value from the options facingOptions
  index = facingOptions.findIndex((option) => option.value == property.property_info.facing);
  propertyDetails["facing"] = index.toString();
  propertyDetails["length"] = property.property_info.length;
  propertyDetails["breadth"] = property.property_info.breadth;
  propertyDetails["plot_area"] = property.property_info.plot_area;
  propertyDetails["possession_type"] = property.possession_type;
  // Get the index of the value from the options possessionTypeOptions
  index = possessionTypeOptions.findIndex(
    (option) => option.value == property.possession_type
  );
  propertyDetails["possession_type"] = index.toString();
  propertyDetails["description"] = property.description;
  propertyDetails["video_url"] = property.video_url;
  propertyDetails["roi_percentage"] = property.roi_percentage;
  return propertyDetails;
}



export { timeStamptoLocalDate, decimalFormatter, investmentFormatter, ResidentialPropertyDetailsFormatter, CommercialPropertyDetailsFormatter, FarmPropertyDetailsFormatter };