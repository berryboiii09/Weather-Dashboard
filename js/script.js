const API_KEY = "e414aac3321ffec35b9d5f1a7f94663b";

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const forecastContainer = document.getElementById("forecast");


async function getWeatherByCity(city) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const res = await fetch(weatherURL);
  const data = await res.json();

  if (data.cod !== 200) {
    alert("City not found!");
    return;
  }

  displayCurrentWeather(data);
  getForecast(data.coord.lat, data.coord.lon);
}

function getLocationWeather() {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      getWeatherByLocation(latitude, longitude);
    },
    () => alert("Location access denied!")
  );
}

async function getWeatherByLocation(lat, lon) {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const res = await fetch(weatherURL);
  const data = await res.json();

  displayCurrentWeather(data);
  getForecast(lat, lon);
}

function displayCurrentWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = `${Math.round(data.main.temp)} °C`;
  description.textContent = data.weather[0].description;

  const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

async function getForecast(lat, lon) {
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  const res = await fetch(forecastURL);
  const data = await res.json();

  forecastContainer.innerHTML = "";

  // Pick one data point per day at the same time (ex: 12:00)
  const dailyData = data.list.filter(item => item.dt_txt.includes("12:00"));

  const next3Days = dailyData.slice(1, 4);

  next3Days.forEach(day => {
    const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric"
    });

    const icon = day.weather[0].icon;
    const temp = Math.round(day.main.temp);

    const card = `
      <div class="forecast-day">
        <p>${date}</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="">
        <p>${temp}°C</p>
      </div>
    `;

    forecastContainer.innerHTML += card;
  });
}

searchBtn.addEventListener("click", () => {
  if (searchInput.value.trim() !== "") {
    getWeatherByCity(searchInput.value.trim());
  }
});

locationBtn.addEventListener("click", getLocationWeather);

function updateBackgroundByTime() {
  const hour = new Date().getHours();
  const body = document.body;

  if (hour >= 5 && hour < 12) {
    body.className = "morning";
  } else if (hour >= 12 && hour < 17) {
    body.className = "afternoon";
  } else if (hour >= 17 && hour < 20) {
    body.className = "evening";
  } else {
    body.className = "night";
  }
}

// Run on page load
updateBackgroundByTime();