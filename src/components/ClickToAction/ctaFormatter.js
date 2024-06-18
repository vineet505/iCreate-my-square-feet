
function timeStamptoLocalDate(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }
  
  function decimalFormatter(number) {
    return number.toFixed(2).toString();
  }

function ctaFormatter(cta) {
  let data = [];
  cta.forEach((cta) => {
    let ctaData = {};
    ctaData["id"] = cta.id;
    ctaData["title"] = cta.title;
    ctaData["description"] = cta.cta_text;
    ctaData["url"] = cta.cta_url;
    ctaData["cta_text"] = cta.cta_text;
    ctaData["created_at"] = timeStamptoLocalDate(cta.created_at);
    ctaData["updated_at"] = timeStamptoLocalDate(cta.updated_at);
    ctaData["status"] = cta.status == "ACTIVE"
    ctaData["cta_card_image"] = cta.cta_card_image;
    data.push(ctaData);
  });
  return data;
}

export { timeStamptoLocalDate, decimalFormatter, ctaFormatter };