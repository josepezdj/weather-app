
const form = document.getElementById('weather-form');
const search = document.getElementById('location');

const msgOne = document.querySelector('.message-1');
const msgTwo = document.querySelector('.message-2');

form.addEventListener('submit', e => {
    e.preventDefault();

    const userSearch = search.value
    const url = `http://localhost:3000/weather?address=${userSearch}`

    msgOne.textContent = 'Loading...'
    msgTwo.textContent = ''

    fetch(url).then(response => {
        response.json().then(data => {
            if(data.error) {
                msgTwo.textContent = data.error
            } else {
                msgOne.textContent = data.location
                msgTwo.textContent = `${data.forecast.forecast}. Temperature is ${data.forecast.temperature}ºC..`
            }
        })    
    })

})