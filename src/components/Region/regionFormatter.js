
function timeStamptoLocalDate(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }
  
  function decimalFormatter(number) {
    return number.toFixed(2).toString();
  }

`
{
    "title": "Chandigarh",
    "description": "Chandigarh",
    "is_active": true,
    "icon_image_key": "region_icons/Chandigarh.jpeg",
    "location": {
        "type": "Point",
        "coordinates": [
            76.768066,
            30.741482
        ]
    },
    "top_properties": [],
    "featured_properties": [],
    "recommended_properties": [],
    "created_at": 1698837485.9900787,
    "updated_at": 1698837485.9900787,
    "id": "654234fcf2a58030c9e4b8cb",
    "region_icon_image": "https://d18ecvyudwyhaj.cloudfront.net/region_icons/Chandigarh.jpeg?Expires=1701871452&Signature=f04m3SmxV-Avs8l~Ngq5DNqWzEy1om3zV-KVs7zSLBr7navmW75aZW4M931sr3p4Zn9ir9N4U80z8mz4N1lkwJESO8tnqvFiUJVXnh4mhFONG6NKhHCvqfLakUVjXwP6WffYQ9Q4yNio1zDWlzj8aYHE0aoP5VRrVlUZIH56WP7d87iwNX0AZ9qs2fZWZotBsUTtInkY3cMI-VODtHuZGWmOnYDEsynEyoVmZxiah~1itciy~j6Y6HPPxcy5-Z3VNKM2HjfQaxqtZXNCH8j1kRoeE6yPel6sm1kBMwvfUYN9q6oQzzRKFLbe9jqAKFS6vSqIncPP7FSMHKpDRojYVQ__&Key-Pair-Id=APKA3AZEV42MC5XFS4BU"
}
`

function regionFormatter(regions) {
  let data = [];
  regions.forEach((region) => {
    let regionData = {};
    regionData["id"] = region.id;
    regionData["title"] = region.title;
    regionData["description"] = region.description;
    regionData["created_at"] = timeStamptoLocalDate(region.created_at);
    regionData["region_image_url"] = region.region_icon_image;
    regionData["status"] = region.is_active ? true : false;
    data.push(regionData);
  });
  return data;
}

export { timeStamptoLocalDate, decimalFormatter, regionFormatter };