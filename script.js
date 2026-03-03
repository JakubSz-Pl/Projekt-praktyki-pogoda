const apiKey = "5bc794f045a5b618fe7551d6454f2c9e";
let locationCity = "Warsaw";





async function getWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${locationCity}&appid=${apiKey}&units=metric&lang=pl`
        );
        const data = await response.json();
        let daysData = [];
        for (let i = 0; i < data.list.length; i += 8) {
            daysData.push(data.list[i]);
        }
        console.log(daysData)
        return daysData;
    } catch (error) {
        console.error("Error:", error);
        return [];
    }
}


async function changeTemp() {

    const daysData = await getWeather(locationCity);

    const daysListTemp = document.getElementsByClassName("temp");

    for (let i = 0; i < daysListTemp.length; i++) {
        if (daysData[i]) {
            daysListTemp[i].innerHTML = daysData[i].main.temp + "°C";
        }
    }
}

async function changePressure() {

    const daysData = await getWeather(locationCity);

    const daysListTemp = document.getElementsByClassName("pressure");

    for (let i = 0; i < daysListTemp.length; i++) {
        if (daysData[i]) {
            daysListTemp[i].innerHTML = daysData[i].main.pressure + "hP";
        }
    }
}
async function changeFeelTemp() {

    const daysData = await getWeather(locationCity);

    const daysListTemp = document.getElementsByClassName("feelsLikeTemp");

    for (let i = 0; i < daysListTemp.length; i++) {
        if (daysData[i]) {
            daysListTemp[i].innerHTML = daysData[i].main.feels_like + "°C";
        }
    }
}
async function changeWindSpeed() {

    const daysData = await getWeather(locationCity);

    const daysListTemp = document.getElementsByClassName("windSpeed");

    for (let i = 0; i < daysListTemp.length; i++) {
        if (daysData[i]) {
            daysListTemp[i].innerHTML = daysData[i] .wind.speed + "km/h";
        }
    }
}

changeFeelTemp();
changePressure();
changeTemp();
changeWindSpeed();




function changeLocation() {
    let input = document.querySelector(".locationInput");
    let value = input.value;

    document.getElementById("location").innerText = value;
    locationCity = value;
    
changeFeelTemp();
changePressure();
changeTemp();
changeWindSpeed();
}