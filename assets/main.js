
const $ = document.querySelector.bind(document)
const APP_ID = 'ec8b5ff031147edc9161292009f5fa19'
const DEFAULT_VALUE = '--'

const searchInput = $("#search-input")
const cityName = $('.city-name')
const weatherIcon = $('.weather-icon')
const weatherState = $('.weather-state')
const temperture = $('.temperature')

const sunrise = $('.weather-sunrise')
const sunset = $('.weather-sunset')
const humidity = $('.weather-humidity')
const wind = $('.weather-wind')

const loadData = () => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=ninh+bình&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json()
            console.log(data);
            cityName.innerHTML = data.name || DEFAULT_VALUE
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperture.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE
            wind.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE
        })
}

loadData()


searchInput.addEventListener('change', (e) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${APP_ID}&units=metric&lang=vi`)
        .then(async res => {
            const data = await res.json()
            console.log(data);
            cityName.innerHTML = data.name || DEFAULT_VALUE
            weatherState.innerHTML = data.weather[0].description || DEFAULT_VALUE;
            weatherIcon.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            temperture.innerHTML = Math.round(data.main.temp) || DEFAULT_VALUE

            sunrise.innerHTML = moment.unix(data.sys.sunrise).format('H:mm') || DEFAULT_VALUE
            sunset.innerHTML = moment.unix(data.sys.sunset).format('H:mm') || DEFAULT_VALUE
            humidity.innerHTML = data.main.humidity || DEFAULT_VALUE
            wind.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE
        })
})
