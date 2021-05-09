// 1. Build a search bar
// 2. Need API to pull up weather
// 3. Save to Local Storage
var date = moment().format("ll");
var searchHandler = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var responseContainer = document.querySelector("#current-result");
var deleteBtn = $("dlt-btn");

// Current temperature variables
const cityTempDiv = document.createElement('div');
const cityDetailsDiv = document.createElement('div');
var cityNameEl = document.createElement("div");
var currentTempEl = document.createElement("div");
var humidityEl = document.createElement("div");
var windEl = document.createElement("div");
var uvIndexContainer = document.createElement("div");
var uvIndexEl = document.createElement("h4");
var uvValueDisplay = document.createElement("div");

// 5 day forecast variables
var forecastContainer = document.querySelector("#forecast-result");

var searchWrapperEl = document.querySelector("#search-wrapper");
var searchHistoryDiv = document.querySelector("#search-history");
var cityCount = 1;


//Main Weather Function
$(document).ready(function(){
 var submitBtn = $(".btn-info");
 var userInput = $("#search-input");
 var apiKey = "723971c9098a844f6ba34be5f5895d70"
 
    submitBtn.on("click", function(event){
        event.preventDefault();

        var userSearch = $(userInput).val().trim();
        console.log('userSearch:', userSearch);



        if($(userInput).val()){
            $(userInput).val("")
        }
       
        getWeather(userSearch)

        if (localStorage.getItem("history") != null) {
            var historyTmp = localStorage.getItem("history");
            var oldhistoryarray = historyTmp.split("|");
        
            $("#lastResults").empty();
        
            for (var i = 0; i < oldhistoryarray.length; i++) {
              $("#lastResults").append("<p>" + oldhistoryarray[i] + "</p>");
            }
          }

          //Storing result in previous History localstorage
          if (localStorage.getItem("history") != null) {
            var historyTmp = localStorage.getItem("history");
            historyTmp += userSearch;
            localStorage.setItem("history", historyTmp);
        
          } else {
            var historyTmp = "|";
            localStorage.setItem("history", historyTmp);
          }

          function clearHistory() {
            var searchedCities = JSON.parse(localStorage.getItem("searchedCities"));
            for (var i = 0; i < searchedCities.length; i++) {
                $("city-" + searchedCities[i]).remove();
            }
            localStorage.clear("searchedCities");
        };
        clearHistory();
    })

function getWeather(userSearch){
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiKey}`
    console.log('url:', url)
    
    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log('data:', data)
                
                var temp = data.main.temp //drilling down to get info
                console.log('temp:', temp)
                $(".tempurature").append(temp) //making the data show up on page
                 
                //trying to figure out how to convert to F

                // function temperature (temp) {
                //     valNum = parseFloat(temp);
                //     document.getElementById("temp").innerHTML = ((temp-273.15)*1.8)+32;
                //   }
                //   temperature();

                //   $(".tempurature").append(valNum)

                var sky = data.weather.O //drilling down to get info
                console.log('sky:', sky)
                $(".sky").append(sky) //making the data show up on page

                var wind = data.wind.speed //drilling down to get info
                console.log('wind:', wind)
                $(".wind").append(wind) //making the data show up on page


                
                
            })
            
        } else{
            alert("Please add an actual city, dummy")
        }
        
        // remove previously searched weather info
        var removePrevious = function () {
            cityNameEl.remove();
            uvIndexContainer.remove();
            forecastContainer.innerHTML = "";
            currentTempEl.remove();
            humidityEl.remove();
            windEl.remove();
        };

    }) .catch(function(error){
        console.log("its dead jim")
    })

    

}



})









