function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function formatHourOnly(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  return hours
}

function displayCurrentWeather(response){
    console.log(response.data);
    let temperatureElement=document.querySelector("#temp");
    let cityElememt=document.querySelector("#city");
    let descElement=document.querySelector("#w-desc");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    let iconElement=document.querySelector("#icon")
    
    cTemp = response.data.main.temp;
    console.log("1 "+cTemp);
    console.log(dateElement);
    console.log(descElement);
    console.log(formatDate(response.data.dt * 1000));
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElememt.innerHTML=response.data.name;
    descElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML="Last updated: "+ formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(response)
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" class="fCast-Icon"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function displayForecastDays(response) {
  let forecastDaysElement = document.querySelector("#forecast-days");
  forecastDaysElement.innerHTML = null;
  let forecastDays = null;
  forecast = response.data.list[0]
  let zeroHour=formatHourOnly(forecast.dt*1000);
  let firstIndex=0;
  if (zeroHour<=13){
      firstIndex=(13-zeroHour)/3;
  } else {
      firstIndex=((13-zeroHour)/3)+8;
  }
  console.log(response)
  console.log(zeroHour)
  console.log(firstIndex)
  for (let index = firstIndex; index < 40; index+=8) {
    forecast = response.data.list[index];
    console.log(forecast);
    forecastDaysElement.innerHTML += `<div class="col-2">
      <h3>
        ${formatDay(forecast.dt * 1000)}
      </h3>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png" class="fCast-Icon"
      />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}


function search(city) {
    let apiKey="a22b7ad6acc07bc299f05b8bfe2089f5";
    let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    console.log(apiUrl)
    axios.get(apiUrl).then(displayCurrentWeather)
    //new API for forecast
    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
    axios.get(apiUrl).then(displayForecastDays);

}

function handleSubmit(event){
    event.preventDefault();
    let cityInputElement=document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fTemp = (cTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fTemp);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(cTemp);
}
let cTemp = null;


let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let form=document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Altendorf");
//cTemp=document.querySelector("#temp")
