const createVenueHTML = (name, location, iconSource) => {
    return `<h2>${name}</h2>
    <img class="venueimage" src="${iconSource}"/>
    <h3>Address:</h3>
    <p>${location.address}</p>
    <p>${location.city}</p>
    <p>${location.country}</p>`;
  }
  
  const createWeatherHTML = (currentDay) => {
    console.log(currentDay)
    return `<h2>${weekDays[(new Date()).getDay()]}</h2>
          <h2>Temperature: ${kelvinToFahrenheit(currentDay.main.temp)}&deg;F</h2>
          <h2>Condition: ${currentDay.weather[0].description}</h2>
        <img src="https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png">`;
  }
  
  const kelvinToFahrenheit = k => ((k - 273.15) * 9 / 5 + 32).toFixed(0);

const setDate = () => {
    let date = new Date();
    let day = date.getDate().toString();
    let year = date.getFullYear().toString();
    let month = date.getMonth() + 1;
    let strMonth = month.toString();

    if (strMonth.length === 1) {
        month = '0' + strMonth;
    }
    if (day.length === 1) {
        day = '0' + day;
    }
    const finalDate = `${year}${month}${day}`
    return finalDate;
}
