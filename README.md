# Projekt praktyki pogoda
<<<<<<< Updated upstream
1. Pobrac folder z plikami
2. otworzyc script.js i wkleic apiKey z strony openweathermap.org do zmienej apiKey
3. otworzyć index.html
=======
------------Funkcje----------------
- Wyszukiwanie pogody dla dowolnego miasta
- Aktualna pogoda:
- temperatura
- temperatura odczuwalna
- ciśnienie
- wilgotność
- Prognoza pogody na 5 dni
- Wykres temperatury (Chart.js)
- Tryb Dark / Light Mode
- Obsługa ładowania danych
- Obsługa błędów (np. brak miasta, zły klucz API)

------------Technologie-------------
- HTML5
- CSS3
- JavaScript (ES6 modules)
- Bootstrap 5
- Chart.js
- OpenWeatherMap API

------Instalacja i uruchomienie-----

- Pobierz zip
- Wypakuj do folderu serweru

Miej na uwadzę że by stona dziala musi byc postawiona na serwerze, (np.Apache)

- Wejdź na stronę https://openweathermap.org/api
- Załóż konto
- Wygeneruj API Key

- W folderze projektu utwórz plik config.js:
//
export function getApiKey() {
    return "YOUR_API_KEY";
}
//
>>>>>>> Stashed changes
