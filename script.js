
const apiKey = "";
async function getWeather(city) {
    
    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=pl`);
        let data = await response.json();
        let daysData = [];
        for (let i = 0; i < 40; i += 8) {
            daysData.push(data.list[i]);
            }

        return daysData
    } catch (error) {
        console.error("error:", error);
    }
}

let daysData = getWeather("Warsaw");
console.log(daysData);
const daysListTemp = document.getElementsByClassName("temp");
console.log(daysListTemp);
for (let i = 0; i < daysListTemp.length; i++) {
  daysListTemp[i].innerHTML = daysData[i].main.temp;
}