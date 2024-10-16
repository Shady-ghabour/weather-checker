const inputForm = document.querySelector(".inputForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "96864beaa09e4c354a8666f6baa68de4";

inputForm.addEventListener("submit", async event => {
    event.preventDefault();

    const city = cityInput.value;
    if(city){

        try {
            const weatherData = await getData(city);
            displayData(weatherData);
            
        } catch (error) {
            console.error(error)
            displayError(error)
        }

    }else{
        displayError("Please write a city!");
    }
});

async function getData(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(url)
    
    if(!response.ok){
        throw new Error("Could not fetch the data"); 
    }else{
        return await response.json();
    }
    
}

function displayData (data){

    const{
        name: city,
        main: {temp, humidity},
        weather: [{description, id}]    
    } = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const emojiDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    cityDisplay.classList.add("city")

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    tempDisplay.classList.add("temp-display")

    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    humidityDisplay.classList.add("humidity-display")

    descriptionDisplay.textContent = description;
    descriptionDisplay.classList.add("description")
    
    emojiDisplay.textContent = getEmoji(id);
    emojiDisplay.classList.add("emoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(emojiDisplay);

}

function getEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "🌨️❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️🌤️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default:
            return "❓";
    }

}

function displayError (message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("error");

    card.textContent = "";
    card.style.display = "flex"
    card.appendChild(errorDisplay);
}