let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let now = new Date();
let currentDay = document.querySelector(".current-day");
currentDay.innerHTML = days[now.getDay()];
let currentTime = document.querySelector(".current-time");
let minutes = now.getMinutes();
if (minutes < 10) {
  currentTime.innerHTML = `${now.getHours()}:0${minutes}`;
} else {
  currentTime.innerHTML = `${now.getHours()}:${minutes}`;
}

function updateWeather(response) {
  let todayTemperature = document.querySelector("#current-temp");
  let newTodayTemperature = `${Math.round(response.data.main.temp)}°C`;
  todayTemperature.innerHTML = newTodayTemperature;
}
function searchCity(event) {
  event.preventDefault();
  let newCity = document.querySelector("#enter-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${newCity.value}`;
  let apiKey = "5df8b506b715f17ed0c74fd6fd849642";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

let citySearchForm = document.querySelector("#search-form");
citySearchForm.addEventListener("submit", searchCity);

function useUserLocation(response) {
  updateWeather(response);
  let newCity = document.querySelector("#enter-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
}
function determineCoordinates(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "5df8b506b715f17ed0c74fd6fd849642";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(useUserLocation);
}
function findUserLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(determineCoordinates);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", findUserLocation);

/*function displayCelsius(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-temp");
  currentDegree.innerHTML = "19";
}
function displayFahrenheit(event) {
  event.preventDefault();
  let currentDegree = document.querySelector("#current-temp");
  currentDegree.innerHTML = `${Math.round((19 * 9) / 5 + 32)}`;
}

let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", displayCelsius);
let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", displayFahrenheit);*/
