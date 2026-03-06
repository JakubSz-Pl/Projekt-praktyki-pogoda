let locationCity = "Tel aviv";
let weatherChart;
let isDark = true;
document.getElementById("location").innerText = locationCity;

import { getApiKey } from './config.js';

console.log();
const apiKey = getApiKey();

//update lokacji po wyszukaniu

document.getElementById("buttonChangeLocation").addEventListener("click", changeLocation);

async function changeLocation() {
    let input = document.querySelector(".locationInput");
    let value = input.value.trim();
    locationCity = value;
    const weatherData = await getWeatherForecast();

    if (weatherData.length > 0) {
        showContent()
        updateData();
    } else {
        hideContent()
    }
}

//obsluga ladowania

function showLoading(){
    document.getElementById("loading").style.display = "block";
    
}

function hideLoading(){
    document.getElementById("loading").style.display = "none";
}

function showError(errorText){
  document.querySelector("#error").style.display = "block";
  document.querySelector(".errortext").innerHTML = errorText;
}






async function getWeatherForecast() {

    hideContent();
    showLoading();
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${locationCity}&appid=${apiKey}&units=metric&lang=pl`);
        const data = await response.json();
<<<<<<< Updated upstream
        document.getElementById("location").innerText = data.city.name;
=======
        hideLoading();
         if(response.status == 404){
            showError("Nie znaleziono miasta");
            hideContent();
            return[];
        }if ( response.status == 400) {
            showError("Złe zapytanie");
            hideContent();
            return[];
        }if ( response.status == 401) {
            showError("Zły klucz api");
            hideContent();
            return[];
        } else  {
          showContent();
>>>>>>> Stashed changes
        let daysData = [];
        for (let i = 0; i < data.list.length; i += 8) {
            daysData.push(data.list[i]);
        }
        return daysData;
        }

}


//Get current weather//

async function getCurrentWeather() {
  try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationCity}&appid=${apiKey}&units=metric&lang=pl`);
        const data = await response.json();
        console.log(data)
        document.getElementById("location").innerText = data.name;
        return data;
  }catch(error){
    console.log(error)
  }
}




//zmiana light mode / dark mode 

document.getElementById("buttonChangeDarkMode").addEventListener("click", toggleLightMode);

function toggleLightMode() {

  document.body.classList.toggle("light");
  
  if(isDark == true){
    document.querySelector(".lightMode").innerHTML = "Light Mode"
    isDark = false;
  }else{
    document.querySelector(".lightMode").innerHTML = "Dark Mode"
    isDark = true;
  }
}


function showContent(){
<<<<<<< Updated upstream
        document.querySelector("table").style.display = "table";
        document.querySelector(".chart-section").style.display = "block";
        document.querySelector(".fw-bold").style.display = "block";
}

function hideContent(){
        document.querySelector("table").style.display = "none";
        document.querySelector(".chart-section").style.display = "none";
        document.querySelector(".fw-bold").style.display = "none";
        document.getElementById("location").innerText = "Nie znaleziono Miasta";
=======
        document.querySelector("main").style.display = "grid";
        document.querySelector(".utility").style.display = "none"
        document.querySelector("#error").style.display = "none";
}

function hideContent(){
        document.querySelector("main").style.display = "none";
        document.querySelector(".utility").style.display = "block"
>>>>>>> Stashed changes
}



<<<<<<< Updated upstream
async function changeLocation() {
    let input = document.querySelector(".locationInput");
    let value = input.value.trim();
    locationCity = value;
    
    const weatherData = await getWeather();

    if (weatherData.length > 0) {
        showContent();
        updateData();
        
    } else {
        hideContent()
    }
}
=======
>>>>>>> Stashed changes




//stworzenie wykresu
async function generateChart(){

const xValues = ["Dzień 1","Dzień 2","Dzień 3","Dzień 4","Dzień 5"];

const ctx = document.getElementsByClassName('weatherChart');

let chartDaysData = await getWeatherForecast();  //wlasna lokalna tabela

weatherChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: xValues,
    datasets: [
      {
        data: [
          chartDaysData[0].main.temp,
          chartDaysData[1].main.temp,
          chartDaysData[2].main.temp,
          chartDaysData[3].main.temp,
          chartDaysData[4].main.temp
        ],
        borderColor: "#008bc2",
        backgroundColor: "rgba(3, 104, 158, 0.46)",
        fill: true,
        borderWidth: 3,
        pointBackgroundColor: "#008bc2",
        pointBorderColor: "#008bc2",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 7,
        tension: 0.4
        
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#dadada",
          font: {
            size: 18
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: "#dadada",

        },
        grid: {
          color: "rgba(255, 255, 255, 0.05)"
        }
      }
    },
  }
});
}



//aktualzowanie wykresu
async function updateChart() {
    const newChartData = await getWeatherForecast();

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




//Aktualizowanie danych w tabeli - funkcje//



async function changeTempForecast() {

    const daysData = await getWeatherForecast();

    const daysListTemp = document.getElementsByClassName("temp");

    for (let i = 0; i < daysListTemp.length; i++) {
        if (daysData[i]) {
            daysListTemp[i].innerHTML = daysData[i].main.temp + "°C";
        }
    }
}

async function changePressureForecast() {

    const daysData = await getWeatherForecast();

    const daysListTemp = document.getElementsByClassName("pressure");

    for (let i = 0; i < daysListTemp.length; i++) {
        if (daysData[i]) {
            daysListTemp[i].innerHTML = daysData[i].main.pressure + "hP";
        }
    }
}
async function changeFeelTempForecast() {

    const daysData = await getWeatherForecast();

    const daysListTemp = document.getElementsByClassName("feelsLikeTemp");

    for (let i = 0; i < daysListTemp.length; i++) {
        if (daysData[i]) {
            daysListTemp[i].innerHTML = daysData[i].main.feels_like + "°C";
        }
    }
}

//Pobranie aktualnej pogody//



async function updateCurrentWeather() {
  let data = await getCurrentWeather();
  document.querySelector("#currentTemp").innerHTML = data.main.temp ;
  document.querySelector("#currentHumidity").innerHTML = data.main.humidity;
  document.querySelector("#currentFeels").innerHTML = data.main.feels_like;
  document.querySelector("#currentPressure").innerHTML = data.main.pressure ;
}




//update tabeli oraz wykresu//


function updateData(){
changeFeelTempForecast();
changePressureForecast();
changeTempForecast();
updateChart()
updateCurrentWeather();
}
