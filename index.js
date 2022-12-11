//LEAVE THIS SH$T - JUST SELECTING HTML ELEMENTS

const body = document.querySelector("body");
const inputBox = document.querySelector("#inputBox");
const city = document.querySelector("#cityName");
const coord = document.querySelector("#coord");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const pressure = document.querySelector("#pressure");
const wind = document.querySelector("#wind");
const sun = document.querySelector("#sun");
const logoImg = document.querySelector("#logoImg");
const main = document.querySelector("main");
const countryImage = document.querySelector("#countryImage");
const locationName = document.querySelector("#locationName");
const lat = document.querySelector("#lat");
const lon = document.querySelector("#lon");
const logoDescription = document.querySelector("#logoDescription")

//variables to be used
let cityName;
let data;

//listen to keyup event in the inputBox - to run fetchData
inputBox.addEventListener("keyup", fetchData);

function fetchData(e){
    //only if "Enter" is pressed only then fetch data
    if(e.key == "Enter"){
        //get the city name
        cityName = inputBox.value;

        //fetch city weather data
        fetch(`https://api.weatherbit.io/v2.0/current?city=${cityName}&key=ef4ef42abe4e4ccfa5ba46fc8ea51116&include=minutely`)
        .then(response => response.json())
        .then(response => { //city weather data loaded
            console.log(response);
            //fetch for country's flag
            fetch(`https://countryflagsapi.com/png/${response.data[0].country_code}`)
            .then(img => {
                countryImage.src = img.url;
                console.log(countryImage);
            })
            .catch(err => console.log("Cant fetch country image"))

            //set location name
            locationName.innerHTML = response.data[0].city_name + ", " + response.data[0].country_code;

            //set coordinates - lat and lon
            lat.innerHTML = response.data[0].lat + " &degN";
            lon.innerHTML = response.data[0].lon + " &degE";

            //set temperature
            temp.innerHTML = response.data[0].app_temp + " &degC";

            //set humidity
            humidity.innerHTML = response.data[0].rh;

            //set pressure
            pressure.innerHTML = response.data[0].pres;

            //set wind
            wind.innerHTML = response.data[0].wind_spd + "\t" + response.data[0].wind_dir + "  &deg" + response.data[0].wind_cdir_full;

            //set sun - sunrise and sunset
            sun.innerHTML = "Sunrise: " + response.data[0].sunrise + "A.M.  Sunset: " + response.data[0].sunset + " P.M.";

            //set description
            logoImg.src = `./assets/icons/${response.data[0].weather.icon}.png`;
            logoDescription.innerHTML = response.data[0].weather.description;
            //console.log(`./assets/icons/${response.data[0].weather.icon}.png`);
        })
        .catch(err => { //Error: if location entered not found!
            main.innerHTML = `<div class = "notFound"><span style = "color: Red; font-weight: bold">Error</span>, Cannot Fetch Data</div>`
        })
    }
}