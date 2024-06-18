function timeStamptoLocalDate(timestamp) {
  let date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

function decimalFormatter(number) {
  return number.toFixed(2).toString();
}

function recommendationFormatter(propertys) {
  let data = [];
  propertys.forEach((property) => {
    let propertyData = {};
    propertyData["id"] = property.id;
    propertyData["title"] = property.project_title;
    propertyData["price"] = property.price;
    propertyData["description"] = property.description;
    propertyData["address"] = property.address;
    propertyData["created_at"] = timeStamptoLocalDate(property.created_at);
    propertyData["project_logo"] = property.project_logo;
    propertyData["status"] = property.status == "active" ? true : false;
    data.push(propertyData);
  });
  return data;
}

export { timeStamptoLocalDate, decimalFormatter, recommendationFormatter };
