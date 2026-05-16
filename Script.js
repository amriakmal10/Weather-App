const API_BASE = 'https://weather-proxy.freecodecamp.rocks/api/city';

async function getWeather(city) {
  try {
    const response = await fetch(`${API_BASE}/${encodeURIComponent(city)}`);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

async function showWeather(city) {
  const panel = document.getElementById('weather-panel');
  panel.classList.add('loading');

  const data = await getWeather(city);

  panel.classList.remove('loading');

  if (!data) {
    alert('Something went wrong, please try again later.');
    return;
  }

  const na = 'N/A';

  // Location
  document.getElementById('location').textContent = data.name ?? na;

  const temp = data.main?.temp;
  document.getElementById('main-temperature').textContent =
    temp !== undefined ? `${temp}° C` : na;

  // Feels like
  const feelsLike = data.main?.feels_like;
  document.getElementById('feels-like').textContent =
    feelsLike !== undefined ? `${feelsLike}° C` : na;

  // Humidity
  const humidity = data.main?.humidity;
  document.getElementById('humidity').textContent =
    humidity !== undefined ? `${humidity}%` : na;

  // Wind speed
  const windSpeed = data.wind?.speed;
  document.getElementById('wind').textContent =
    windSpeed !== undefined ? `${windSpeed} m/s` : na;

  // Wind gust
  const gust = data.wind?.gust;
  document.getElementById('wind-gust').textContent =
    gust !== undefined ? `${gust} m/s` : na;

  // Weather condition + icon
  const weatherInfo = data.weather?.[0];
  document.getElementById('weather-main').textContent = weatherInfo?.main ?? na;

  const iconEl = document.getElementById('weather-icon');
  if (weatherInfo?.icon) {
    iconEl.src = weatherInfo.icon;
    iconEl.alt = weatherInfo.description ?? 'Weather icon';
    iconEl.classList.remove('hidden');
  } else {
    iconEl.src = '';
    iconEl.classList.add('hidden');
  }
}


document.getElementById('get-weather-btn').addEventListener('click', () => {
  const city = document.getElementById('city-select').value.trim();
  if (!city) return;
  showWeather(city);
});