// 1. Build a search bar
// 2. Need API to pull up weather
// 3. Save to Local Storage
var date = moment().format("ll");
var searchHandler = document.querySelector("#search-form");
var searchBar = document.querySelector("#search-bar");
var responseContainer = document.querySelector("#current-result");

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
    var deleteBtn = $("dlt-btn");
    var userInput = $("#search-input");
    var apiKey = "723971c9098a844f6ba34be5f5895d70"
 
    submitBtn.on("click", function(event){
        event.preventDefault();
        $(".town").empty();
        $(".icon").empty();
        $(".sky").empty();
        $(".wind").empty();
        $(".tempurature").empty();
      
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
          if (localStorage.getItem("history") !== null && localStorage.getItem("history") !== userSearch) {
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
        
        function storeHistory() {
            // variables to store storage keys for if statements
            var userSearch = document.querySelector("#search-bar").value.trim().toUpperCase();
        
            if (!userSearch) {
                return;
            };
        
            var previousSearchCity = JSON.parse(localStorage.getItem("searchedCities")) || [];
            previousSearchCity.push(userSearch);
            localStorage.setItem("searchedCities", JSON.stringify(previousSearchCity));
        
            // clear search bar after clicking search button
            document.querySelector("#search-bar").value = "";
        
            // call function to remove previously searched weather
            removePrevious();
        };
        
        function loadHistory() {
            if (localStorage.getItem("searchedCities")) {
                var previousSearchCity = JSON.parse(localStorage.getItem("searchedCities"));
                for (var i = 0; i < previousSearchCity.length; i++) {
                    createBtn(previousSearchCity[i]);
                }
            };
        
        
            for (i = 0; i < document.getElementsByClassName("btn").length; i++) {
                document.getElementsByClassName("btn")[i].addEventListener('click', function () {
                    var btnClicked = this.getAttribute("data-city");
                    weatherRequest(btnClicked);
                    console.log(btnClicked);
                    removePrevious();
                });
            }
        };
        
    })

function getWeather(userSearch){
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiKey}&units=imperial`
    console.log('url:', url)
    
    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log('data:', data)
                
                var temp = data.main.temp //drilling down to get info
                console.log('temp:', temp)
                $(".tempurature").append("The temperature is: " + temp + " F") //making the data show up on page
              
                //trying to figure out how to convert to F

                // function temperature (temp) {
                //     valNum = parseFloat(temp);
                //     document.getElementById("temp").innerHTML = ((temp-273.15)*1.8)+32;
                //   }
                //   temperature();

                //   $(".tempurature").append(valNum)

                var sky = data.weather[0].description //drilling down to get info
                console.log('sky:', sky)
                $(".sky").append("The sky is: " + sky) //making the data show up on page
                 
                var wind = data.wind.speed //drilling down to get info
                console.log('wind:', wind)
                $(".wind").append("The wind speed is: " + wind + " MPH") //making the data show up on page
                

                var town = data.name
                $(".town").append(town)

                var icon = data.weather[0].icon
                $(".icon").append(`<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`)
                
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
    loadHistory();
    deleteBtn.addEventListener("click", clearHistory);


})








