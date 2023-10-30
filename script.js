const apiurl = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apikey = "203cb2ca56dc4ccbdf1be19cfc8993b2";
const searchbtn = document.querySelector(".search-button");
const searchbox = document.querySelector(".search-text");
const weathericon = document.querySelector(".weather-icon");

async function checkWeather(location) {
    const response = await fetch(`${apiurl}${location}&appid=${apikey}`);
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".numbers1").innerHTML = data.main.humidity + "%";
    document.querySelector(".numbers2").innerHTML = new Date(data.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.querySelector(".numbers3").innerHTML = new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.querySelector(".numbers4").innerHTML = data.main.pressure;
    document.querySelector(".wind-speed-text").innerHTML = data.wind.speed + " KM/H";
    document.querySelector(".weather").innerHTML = data.weather[0].main;

    switch (true) {
        case (data.weather[0].id >= 701 && data.weather[0].id <= 781):
            weathericon.src = "mist.png";
            break;
        case (data.weather[0].id >= 200 && data.weather[0].id <= 232):
            weathericon.src = "thunder.png";
            break;
        case (data.weather[0].id >= 300 && data.weather[0].id <= 321):
        case (data.weather[0].id >= 500 && data.weather[0].id <= 531):
            weathericon.src = "rainy.png";
            break;
        case (data.weather[0].id >= 600 && data.weather[0].id <= 622):
            weathericon.src = "cold.png";
            break;
        case (data.weather[0].id >= 801 && data.weather[0].id <= 804):
            weathericon.src = "cloud.png";
            break;
        default:
            weathericon.src = "sun.png";
    }
}

searchbtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});

// Function for fetching forecast data
function getForecast() {
    function getForecast() {
        const newName = document.querySelector(".search-text").value;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${newName}&appid=${apikey}`)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < 5; i++) {

                    document.querySelector(".days-temp-"+  (i+1) ).innerHTML = Number(data.list[i].main.temp - 273.15).toFixed(2);
                  
                }
            })
            .catch(err => alert("Something Went Wrong: Try Checking Your Internet Connection"));
    }
}    

// function defaultScreen() {
//     document.querySelector(".search-text").value = "London";
//     getForecast();
// }

getForecast();

// Function to get the correct day name
function getDayName(day) {
    const today = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const adjustedDay = (today.getDay() + day) % 7;
    return days[adjustedDay];
}

// Set day names for the next 5 days
document.addEventListener("DOMContentLoaded", function() {
    for (let i = 1; i <= 5; i++) {
        const temperatureElement = document.querySelector(`.days-temp-${i}`);
        const dayElement = document.getElementById(`day${i}`);
        console.log(temperatureElement); // Check if the element is found

        if (temperatureElement && dayElement) {
            dayElement.innerHTML = getDayName(i);
        } else {
            console.error(`Element with class 'days-temp-${i}' or 'day${i}' not found!`);
        }
    }
});
