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
      
        var userSearch = $(userInput).val().trim();
        console.log('userSearch:', userSearch);



        if($(userInput).val()){
            $(userInput).val("")
        }
       
        getWeather(userSearch)
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
    


})








