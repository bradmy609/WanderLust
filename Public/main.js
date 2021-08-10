// Foursquare API Info
const clientId = 'JQWZ0PNV1STVC3QNSNDHSZQ1W2JIXIXZG5SFPNQVMF2A5R32';
const clientSecret = 'P0NFG4FJK1AOM1XVXMLCBUXZI1AJT2EZ10WYA32XUS11CONT';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';
const limit = 10;

// OpenWeather Info
const openWeatherKey = 'a4fe8bdf1f17c3a76aaab96df8366815';
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';


// Sets YYYYMMDD date string format
const date = setDate();

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
  const urlToFetch = `${url}${city}&limit=${limit}&client_id=${clientId}&client_secret=${clientSecret}&v=${date}`
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const venues = jsonResponse.response.groups[0].items.map(item => item.venue)
      console.log(venues);
      return venues;
    }
  } catch(error) {
    console.log(error);
  }
}

const getForecast = async () => {
  const urlToFetch = `${weatherUrl}${$input.val()}&APPID=${openWeatherKey}`
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      return jsonResponse;
    }
  } catch(error) {
    console.log(error);
  }
}


// Render functions
const renderVenues = (venues) => {
  const randNum = () => {return Math.floor(Math.random() * 10)};
  const usedIndexes = [];
  $venueDivs.forEach(($venue) => {
    let index = randNum();
    while (usedIndexes.includes(index)) {
      index = randNum();
    }
    usedIndexes.push(index);
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = venueIcon.prefix + 'bg_64' + venueIcon.suffix;
    const venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
}

const renderForecast = (day) => {
  // Add your code here:
  const weatherContent = createWeatherHTML(day);
  console.log(weatherContent);
  $weatherDiv.append(weatherContent);
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDiv.empty();
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => {return renderVenues(venues)})
  getForecast().then(forecast => {return renderForecast(forecast)})
  return false;
}

$submit.click(executeSearch)