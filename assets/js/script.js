// 1. Build a search bar
// 2. Need API to pull up weather
// 3. Save to Local Storage

var searchformEl = document.querySelector('#searchForm');

function handleSearchFormSubmit(event){
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value

    if (!searchInputVal){
        console.error('Please type in a search option');
        
        
        return;
    }

    var queryString = './search-results.html?q=' + searchInputVal + '&format=' + formatInputVal;
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);







