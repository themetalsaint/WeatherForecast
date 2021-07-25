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

    $(".toggle").hide();
    var submitBtn = $(".btn-info");
    var deleteBtn = $("#dlt-btn");
    var userInput = $("#search-input");
    var apiKey = "723971c9098a844f6ba34be5f5895d70"
 
    submitBtn.on("click", function(event){
        event.preventDefault();
        $(".town").empty();
        $(".icon").empty();
        $(".sky").empty();
        $(".wind").empty();
        $(".tempurature").empty();
        $("#lastResults").empty();
        $(".uv").empty()

        var userSearch = $(userInput).val().trim();
        console.log('userSearch:', userSearch);



        if($(userInput).val()){
            $(userInput).val("")
        }
       
        getWeather(userSearch);
        fiveDayForecast(userSearch);
        var newCity = userSearch;

        if(localStorage.getItem("history") === null){
            localStorage.setItem("history", "[]")
        }
    var searchHistory = JSON.parse(localStorage.getItem("history"));

        if(!searchHistory.includes(newCity)){
            searchHistory.push(newCity)
        }
        localStorage.setItem("history", JSON.stringify(searchHistory));

        if(localStorage.getItem("history") !== null){
            var cityHistory = JSON.parse(localStorage.getItem("history"));
        
        console.log(cityHistory)

        for (let index = 0; index < cityHistory.length; index++) {
            makeLink(cityHistory[index])
            
        }
    }
})

    function makeLink(text){
        var link = $("<li class='link'>");
        link.text(text)
        var results = $("#lastResults");
        results.prepend(link);
    }
    $(document).on("click", ".link", function(){
        getWeather(this.innerHTML)
    })

    deleteBtn.on("click", function(){
        $("#lastResults").empty()
        localStorage.clear()
        location.reload()
    })

function getWeather(userSearch){
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=${apiKey}&units=imperial`
    console.log('url:', url)
        $(".town").empty();
        $(".icon").empty();
        $(".sky").empty();
        $(".wind").empty();
        $(".tempurature").empty();
        $(".uv").empty();

    fetch(url).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log('data:', data)
                
                var temp = data.main.temp //drilling down to get info
                console.log('temp:', temp)
                $(".tempurature").append("The temperature is: " + temp + " F") //making the data show up on page
              

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
    
    })

    

}

    //function for 5 Day

 function fiveDayForecast(userSearch){
     var forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${userSearch}&appid=${apiKey}&units=imperial`
 
     fetch(forecastUrl) 
     .then(function(res){
         if (res.ok){
             res.json().then(function(data){
                 $("#forecast-wrapper").empty();
                 $(".searchHistory").empty();
                //  console.log(data);
                 var fiveDayData = data;
                 fiveDayData.length = 5;
                console.log(fiveDayData);
                $(".searchHistory").text("Search History");
                $(".toggle").show();
                for (let i = 0; i < fiveDayData.length; i++) {
                    var fiveDay = fiveDayData;
                            // console.log("Five Day Forecast Data: ", fiveDay);
                            // console.log("Date: ", data.list[i])
                            var time = i * 8 + 4;
                            var date = new Date(data.list[time].dt * 1000)
                            var day = date.getDate();
                            //How to get long month
                            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
                            var options = { month: 'long' };
                            var longMonth = (new Intl.DateTimeFormat('en-US', options).format(date));
                            var year = date.getFullYear();
                            var fiveDate = (longMonth + ' ' + day + ', ' + year);
                            // console.log("City name: ", fiveDay.city.name);
                            var fiveTemp = ('Temp: ' + fiveDay.list[i].main.temp + ' F');
                            var fiveDesc = ("Sky: " + fiveDay.list[i].weather[0].description);
                            var fiveHumidity = ("Humidity: " + fiveDay.list[i].main.humidity + '%');
                            var fiveWind = ('Wind: ' + fiveDay.list[i].wind.speed + ' MPH');
                            var thisIcon = (fiveDay.list[i].weather[0].icon);
                            var fiveIcon = (`https://openweathermap.org/img/wn/${thisIcon}@2x.png`);
                            var lat = (fiveDay.city.coord.lat);
                            var lon = (fiveDay.city.coord.lon);
                            $("#forecast-wrapper").append(`
                            <div class="card fiveCard">
                                <div class="card-body">
                                    <div class="date">${fiveDate}</div>
                                     <div class="fiveIcon"><img src="${fiveIcon}"></div>
                                    <div class="temp">${fiveTemp}</div>
                                    <div class="description">${fiveDesc}</div>
                                    <div class="fiveHumidity">${fiveHumidity}</div>
                                    <div class="fiveDayWind">${fiveWind}</div>
                                </div>
                            </div>
                            `)
                        }
                        fetchUV(lat, lon)
                    })
                }
     })
    
    .catch(function(error){
        console.log(error);
    })
 
    }
        


    //function to get UV

    function fetchUV(lat, lon) {
        var UV = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`

        fetch(UV) 
        .then(function(res){
            if (res.ok){
                res.json().then(function(data){
                    $(".uv").empty()
                    $(".uv").text("UV index at Noon: "+ data.value + "%" )
                })
            }
        })
        .catch(function(error){
            console.log(error);
        })
    }

})








