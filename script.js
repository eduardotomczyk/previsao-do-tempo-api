const API_KEY = 'Sua_Chave_API_Aqui'; // Substitua pela sua chave da API do OpenWeatherMap

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');

// Função para buscar clima
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

// Função para mostrar os dados na tela
function displayWeather(data) {
  const weatherDiv = document.getElementById('weatherResult');
  weatherDiv.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temperatura: ${data.main.temp}°C</p>
    <p>Sensação térmica: ${data.main.feels_like}°C</p>
    <p>Umidade: ${data.main.humidity}%</p>
    <p>Descrição: ${data.weather[0].description}</p>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}" />
  `;
}

// Evento do botão
searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (!city) {
    alert('Digite o nome de uma cidade');
    return;
  }
  getWeather(city);
});
