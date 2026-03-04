const apiKey = "";
let locationCity = "Tel aviv";
let weatherChart;
let isDark = true;
document.getElementById("location").innerText = locationCity;



// Pobranie danych z api i wporwadzenie ich do tabeli co jeden dzien

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

//zmiana light mode / dark mode 

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
        document.querySelector("table").style.display = "table";
        document.querySelector(".chart-section").style.display = "block";
        document.querySelector(".fw-bold").style.display = "block";
        document.getElementById("location").innerText = capitalizeFirstLetter(locationCity);
}

function hideContent(){
        document.querySelector("table").style.display = "table";
        document.querySelector(".chart-section").style.display = "block";
        document.querySelector(".fw-bold").style.display = "block";
        document.getElementById("location").innerText = capitalizeFirstLetter(locationCity);
}


//update lokacji po wyszukaniu

async function changeLocation() {
    let input = document.querySelector(".locationInput");
    let value = input.value.trim();
    locationCity = value;
    
    const weatherData = await getWeather();

    if (weatherData.length > 0) {
        showContent()
        updateData();
    } else {
        hideContent()
    }
}




//stworzenie wykresu
async function generateChart(){

const xValues = ["Dzień 1","Dzień 2","Dzień 3","Dzień 4","Dzień 5"];

const ctx = document.getElementsByClassName('weatherChart');

let chartDaysData = await getWeather();  //wlasna lokalna tabela

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



//pomocnicza funkcja do pierwszej wielkej litery
function capitalizeFirstLetter(str) {
return str.charAt(0).toUpperCase() + str.slice(1);
}


//aktualzowanie wykresu
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




//Aktualizowanie danych w tabeli - funkcje//



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
//update tabeli oraz wykresu//

function updateData(){
changeFeelTemp();
changePressure();
changeTemp();
changeWindSpeed();
updateChart()
}
