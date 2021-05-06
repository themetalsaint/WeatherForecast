// 1. Build a search bar
// 2. Need API to pull up weather
// 3. Save to Local Storage

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




            })

        } else{
            alert("Please add an actual city, dummy")
        }


    }) .catch(function(error){
        console.log("its dead jim")
    })

    



}




})



// var searchformEl = document.querySelector('#searchForm');

// function handleSearchFormSubmit(event){
//     event.preventDefault();

//     var searchInputVal = document.querySelector('#search-input').value

//     if (!searchInputVal){
//         console.error('Please type in a search option');
        
        
//         return;
//     }

//     var queryString = `./search-results.html?q=${searchInputVal} + &format= + formatInputVal`;
// }

// searchFormEl.addEventListener('submit', handleSearchFormSubmit);







