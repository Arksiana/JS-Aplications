function attachEvents() {
    const locationName = document.getElementById('location').value
    document.getElementById('submit').addEventListener('click', () => getWeather(locationName))

}

attachEvents();

async function getWeather(locationName) {
    const forecastBlock = document.getElementById('forecast')

    const weatherSymbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'degrees': '°'
    }

    const forecast = await getForecast(locationName)
    const currentW = Object.values(forecast.current)
    const upcomingW = Object.values(forecast.upcoming)


    forecastBlock.style.display = 'block'
    const divElementCurrent = document.createElement('div')
    divElementCurrent.className = 'forecasts'
    divElementCurrent.innerHTML = `<span class='condition symbol'>${weatherSymbols[currentW[0].condition]}</span>
<span class='condition'>
    <span class='forecast-data'>${currentW[1]}</span>
    <span class='forecast-data'>${currentW[0].low}${weatherSymbols['degrees']}/${currentW[0].high}${weatherSymbols['degrees']}</span>
    <span class='forecast-data'>${currentW[0].condition}</span>
</span>
    `

    upcomingW[0].forEach(e => {
        const divElementUpcoming = document.createElement('div')
        divElementUpcoming.className = 'forecasts-info'
        divElementUpcoming.innerHTML = `
<span class='upcoming'>
    <span class='symbol'>${weatherSymbols[e.condition]}</span>
    <span class='forecast-data'>${e.low}${weatherSymbols['degrees']}/${e.high}${weatherSymbols['degrees']}</span>
    <span class='forecast-data'>${e.condition}</span>
</span>
    `
        document.getElementById('upcoming').appendChild(divElementUpcoming)
        })
    
    document.getElementById('current').appendChild(divElementCurrent)
    
}

async function getForecast(name) {
    const code = await getLocationCode(name)
    const [current, upcoming] = await Promise.all([
        getCurrent(code),
        getUpcoming(code)
    ])

    return { current, upcoming }
}

async function getLocationCode(name) {
    const url = `http://localhost:3030/jsonstore/forecaster/locations`
    const res = await fetch(url)
    const data = await res.json()

    const location = data.find(l => l.name == name)

    return location.code

}

async function getCurrent(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/today/` + code
    const res = await fetch(url)
    const data = await res.json()

    return data
}


async function getUpcoming(code) {
    const url = `http://localhost:3030/jsonstore/forecaster/upcoming/` + code
    const res = await fetch(url)
    const data = await res.json()

    return data
}