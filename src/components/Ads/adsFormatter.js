
function timeStamptoLocalDate(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }
  
  function decimalFormatter(number) {
    return number.toFixed(2).toString();
  }

function adsFormatter(ads) {
  let data = [];
  ads.forEach((ad) => {
    let adData = {};
    adData["id"] = ad.id;
    adData["title"] = ad.title;
    adData["description"] = ad.cta_text;
    adData["url"] = ad.cta_url;
    adData["created_at"] = timeStamptoLocalDate(ad.created_at);
    adData["updated_at"] = timeStamptoLocalDate(ad.updated_at);
    adData["status"] = ad.status == "ACTIVE"
    adData["ad_image_url"] = ad.ads_card_image;
    data.push(adData);
  });
  return data;
}

export { timeStamptoLocalDate, decimalFormatter, adsFormatter };