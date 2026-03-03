const apiKey = "5bc794f045a5b618fe7551d6454f2c9e";
let locationCity = "tel aviv";
let weatherChart;




document.getElementById("location").innerText = locationCity;
async function getWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationCity}&appid=${apiKey}&units=metric&lang=pl`);
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

async function changeLocation() {
    let input = document.querySelector(".locationInput");
    let value = input.value.trim();
    locationCity = value;
    
    const weatherData = await getWeather();

    if (weatherData.length > 0) {
        document.querySelector("table").style.display = "table";
        document.getElementById("location").innerText = value;
        updateChart();
        updateData();
    } else {
        document.getElementById("location").innerText = "Nie znaleziono miasta";
        console.log("Nie znaleziono miasta");
        document.querySelector("table").style.display = "none";
    }
}

async function generateChart(){

const xValues = ["Dzien 1","Dzien 2","Dzien 3","Dzien 4","Dzien 5"];

const ctx = document.getElementById('weatherChart');

let chartDaysData = await getWeather();
weatherChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{ 
      data: [chartDaysData[0].main.temp,chartDaysData[1].main.temp,chartDaysData[2].main.temp,chartDaysData[3].main.temp,chartDaysData[4].main.temp],
      borderColor: "yellow",
      pointRadius: 2,
      tension: 0.4,
    }]
  },
  options: {
    plugins: {
      legend: { display: false }
    }
  }
});
}

async function updateChart() {
    const newChartData = await getWeather();

    weatherChart.data.datasets[0].data = [
        newChartData[0].main.temp,
        newChartData[1].main.temp,
        newChartData[2].main.temp,
        newChartData[3].main.temp,
        newChartData[4].main.temp
    ];

    weatherChart.update();
}


generateChart();
updateData();



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


function updateData(){
changeFeelTemp();
changePressure();
changeTemp();
changeWindSpeed();
}
