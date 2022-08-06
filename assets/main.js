
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


// assistant

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition

const recognition = new SpeechRecognition();
const synth = window.speechSynthesis
recognition.lang = 'vi-VI'
recognition.continuous = false
const microphone = document.querySelector(".microphone")

const speak = (text) => {
    if (synth.speaking) {
        console.error('Busy. Speaking...')
        return
    }
    const utter = new SpeechSynthesisUtterance(text)

    utter.onend = () => {
        console.log('SpeechSynthesisUtterance.onend')
    }

    utter.onerror = (error) => {
        console.error('SpeechSynthesisUtterance.onerror', error)
    }

    synth.speak(utter)
}

const handleVoice = (text) => {
    const handleText = text.toLowerCase()

    // "thời tiết tại Ninh Bình" => ["thời tiết tại", "Ninh Bình"]
    if (handleText.includes('thời tiết tại')) {
        const location = handleText.split('tại')[1].trim()

        searchInput.value = location
        const changeEvent = new Event('change')
        searchInput.dispatchEvent(changeEvent)
        return
    }
    // "thay đổi màu nền"
    if (handleText.includes('thay đổi màu nền')) {
        const color = handleText.split('màu nền')[1].trim()
        const container = document.querySelector('.container')
        container.style.background = color
        return
    }

    // 'màu nền mặc định'
    if (handleText.includes('màu nền mặc định')) {
        container.style.background = ''
        return
    }

    //
    if (handleText.includes('mấy giờ')) {
        const textToSpeech = `${moment().hours()} hours ${moment().minutes()} minutes`
        return
    }

    speak('Try again')

}


microphone.addEventListener("click", (e) => {
    e.preventDefault()

    recognition.start()
    microphone.classList.add('recording')
})

recognition.onspeechend = () => {
    recognition.stop()
    microphone.classList.remove('recording')
}

recognition.onerror = (err) => {
    console.error("lỗi", err)
    microphone.classList.remove('recording')

}

recognition.onresult = (e) => {
    console.log('onresult', e)

    const text = e.results[0][0].transcript
    handleVoice(text)
}
