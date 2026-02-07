// Substitua pela sua chave da API do OpenWeatherMap
const API_KEY = 'SUA_CHAVE_API_AQUI';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherDiv = document.getElementById('weatherResult');


async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      alert('Cidade não encontrada');
      return;
    }

    displayWeather(data);
  } catch (error) {
    console.error(error);
    alert('Erro ao buscar o clima');
  }
}


function displayWeather(data) {
  weatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temperatura: ${data.main.temp}°C</p>
    <p>Sensação térmica: ${data.main.feels_like}°C</p>
    <p>Umidade: ${data.main.humidity}%</p>
    <p>Descrição: ${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
  `;

  changeBackground(data.weather[0].description);
}


function changeBackground(description) {
  const body = document.body;
  const desc = description.toLowerCase();

  if (desc.includes('sol') || desc.includes('claro') || desc.includes('céu limpo')) {
    body.style.background = 'linear-gradient(135deg, #f6d365, #fda085)'; // sol
  } else if (desc.includes('nuvem') || desc.includes('nublado')) {
    body.style.background = 'linear-gradient(135deg, #bdc3c7, #2c3e50)'; // nuvens
  } else if (desc.includes('chuva') || desc.includes('garoa') || desc.includes('tormenta')) {
    body.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)'; // chuva
  } else if (desc.includes('neve')) {
    body.style.background = 'linear-gradient(135deg, #e0eafc, #cfdef3)'; // neve
  } else if (desc.includes('névoa') || desc.includes('neblina') || desc.includes('mist')) {
    body.style.background = 'linear-gradient(135deg, #d7d2cc, #304352)'; // névoa
  } else {
    body.style.background = 'linear-gradient(135deg, #4facfe, #00f2fe)'; // padrão
  }
}


searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Digite o nome de uma cidade');
    return;
  }
  getWeather(city);
});
