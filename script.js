const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const error404 = document.querySelector('.not-found');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const cityHide = document.querySelector('.city-hide');

search.addEventListener('click', () => {
    const APIKey = '5a3d90f7c005b7a5e35bbccb1e0e7421'; // Replace with your API key
    const city = document.querySelector('.search-box input').value.trim();

    if (city === '') return;

    // Hide previous content and prepare for new data
    container.classList.add('loading');
    error404.classList.remove('active');
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            container.classList.remove('loading');

            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                error404.classList.add('active');
                return;
            }

            // Update the UI with valid data
            container.style.height = '555px';
            cityHide.textContent = city;

            const img = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind-details span');

            switch (json.weather[0].main) {
                case 'Clear':
                    img.src = 'images/clear.png';
                    break;
                case 'Rain':
                    img.src = 'images/rain.png';
                    break;
                case 'Snow':
                    img.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    img.src = 'images/cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    img.src = 'images/mist.png';
                    break;
                default:
                    img.src = 'images/cloud.png';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
        })
        .catch(() => {
            alert('Error fetching weather data! Please try again later.');
            container.classList.remove('loading');
        });
});
