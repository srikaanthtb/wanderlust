// Foursquare API Info
const clientId = '0WW5QBUKBXTKYKVK405YHNCMJU2ITH4F2SYGJBCXTUVSHLZV';
const clientSecret = '00EOPRYSV0SJJY4PXGK3HE5XBVGBACZNTZ43ZDAMFAGQQ55Y';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// OpenWeather Info
const openWeatherKey = '7dd6a402beafe24c172e052efd6521c5';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDiv = $("#weather1");
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
const getVenues = async () => {
const city = $input.val();
const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    const venues = jsonResponse.response.groups[0].items.map(item => item.venue);
    const venuesid = jsonResponse.response.groups[0].items.map(item => item.venue.id);
    console.log(venues);
    return venues;
  }
} catch (error) {
  console.log(error);
}
}

const getVenuesid = async () => {
const city = $input.val();
const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180101`;
try {
  const response = await fetch(urlToFetch);
  if (response.ok) {
    const jsonResponse = await response.json();
    const venuesid = jsonResponse.response.groups[0].items.map(item => item.venue.id);
    return venuesid;
  }
} catch (error) {
  console.log(error);
}
}


const getImage = async (venuesid) => {
  try {
    const urlToFetch = `https://api.foursquare.com/v2/venues/${venuesid}/photos`;
    const response = await fetch(urlToFetch);
    if (response.ok) {
  const jsonResponse = await response.json();
  console.log(response);
  }
  } catch (error){
    console.log(error);
  }
}

const getForecast = async () => {
  try {
    const urlToFetch = `${weatherUrl}?&q=${$input.val()}&APPID=${openWeatherKey}`;
    const response = await fetch(urlToFetch);
    if (response.ok) {
  const jsonResponse = await response.json();
  return jsonResponse;
}
  } catch (error){
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  const weatherContent = createWeatherHTML(day);
  $weatherDiv.append(weatherContent);

};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  getVenuesid();
  getImage();
  return false;
}

$submit.click(executeSearch)
