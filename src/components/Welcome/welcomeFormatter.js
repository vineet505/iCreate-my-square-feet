
function timeStamptoLocalDate(timestamp) {
    let date = new Date(timestamp * 1000);
    return date.toLocaleString();
  }
  
  function decimalFormatter(number) {
    return number.toFixed(2).toString();
  }

function welcomeFormatter(welcomeCards) {
  let data = [];
  welcomeCards.forEach((welcomeCard) => {
    let welcomeCardData = {};
    welcomeCardData["id"] = welcomeCard.id;
    welcomeCardData["title"] = welcomeCard.title;
    welcomeCardData["description"] = welcomeCard.cta_text;
    welcomeCardData["url"] = welcomeCard.cta_url;
    welcomeCardData["created_at"] = timeStamptoLocalDate(welcomeCard.created_at);
    welcomeCardData["updated_at"] = timeStamptoLocalDate(welcomeCard.updated_at);
    welcomeCardData["status"] = true
    welcomeCardData["video_url"] = welcomeCard.video_url
    welcomeCardData["welcome_card_image"] = welcomeCard.welcome_card_image;
    data.push(welcomeCardData);
  });
  return data;
}

export { timeStamptoLocalDate, decimalFormatter, welcomeFormatter };