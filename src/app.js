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

function displayCurrentWeather(response){
    console.log(response.data);
    let temperatureElement=document.querySelector("#temp");
    let cityElememt=document.querySelector("#city");
    let descElement=document.querySelector("#w-desc");
    let humidityElement=document.querySelector("#humidity");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");
    console.log(dateElement);
    console.log(descElement);
    console.log(formatDate(response.data.dt * 1000));
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    cityElememt.innerHTML=response.data.name;
    descElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML="Last updated: "+ formatDate(response.data.dt * 1000);
    //formatDate(response.data.dt * 1000);
}


let apiKey="a22b7ad6acc07bc299f05b8bfe2089f5";
let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;
console.log(apiUrl)

axios.get(apiUrl).then(displayCurrentWeather)