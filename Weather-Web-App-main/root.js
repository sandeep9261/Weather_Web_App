var apiUrl = "https://api.openweathermap.org/data/2.5/weather?&units=metric";
var apiCoordsUrl = "https://api.openweathermap.org/geo/1.0/reverse?";
var key = "d0a9f589d90675ebe821cb66a988ce83";
async function checkByCoordinates(lat, lon) {
  try {
    const reverseLoacation = await fetch(apiCoordsUrl + `&lat=${lat}` + `&lon=${lon}` + `&appid=${key}`);
    var infos = await reverseLoacation.json();
    console.log(infos);
    var cityName = (document.getElementById("city").innerText = infos[0].name);
    const response = await fetch(
      apiUrl + `&lat=${lat}` + `&lon=${lon}` + `&appid=${key}`
    );
    var data = await response.json();
    var temp = (document.getElementById("temp").innerHTML = Math.round(
      data.main.temp
    ));
    var humidity = (document.getElementById("humidity").innerText =
      data.main.humidity + " %");
    var wind = (document.getElementById("wind").innerText =
      data.wind.speed + " km/h");

    var icons = data.weather[0].main;
    console.log(data);
    var weather_icon = (document.getElementById("weather-icon").src =
      "images/" + `${icons}` + ".png");

    var desc = (document.getElementById("desc").innerText =
      data.weather[0].description);
  } catch (error) {
    console.log("error");
  }
}
function currentLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
  function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    checkByCoordinates(lat, lon);
  }
}

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + `&q=${city}` + `&appid=${key}`);
    var data = await response.json();
    console.log(data);

    var temp = (document.getElementById("temp").innerHTML = Math.round(
      data.main.temp
    ));

    var cityName = (document.getElementById("city").innerText = data.name);

    var humidity = (document.getElementById("humidity").innerText =
      data.main.humidity + " %");

    var wind = (document.getElementById("wind").innerText =
      data.wind.speed + " km/h");

    var icons = data.weather[0].main;
    // console.log(icons);

    var weather_icon = (document.getElementById("weather-icon").src =
      "images/" + `${icons}` + ".png");

    var desc = (document.getElementById("desc").innerText =
      data.weather[0].description);
  } catch (error) {
    alert(data.message);
  }
}
function search() {
  const city = document.getElementById("cityName").value;
  if (city !== "") {
    checkWeather(city);
    console.log(city);
  } else {
    alert("Enter city name ...!");
  }
}
// console.log(api+key+units);
