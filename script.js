// Set up DOM references to table, and inputs + their search buttons, and a reset button.
let $tbody = document.querySelector("tbody");

let $words = document.querySelector("#words");
let $datetimeSearch = document.querySelector("#searchdt");
let $citySearch = document.querySelector("#searchcity");
let $stateSearch = document.querySelector("#searchstate");
let $countrySearch = document.querySelector("#searchcountry");
let $shapeSearch = document.querySelector("#searchshape");
let $resetButan = document.querySelector("#reset");

// Set up event listeners for each filter input button click
$datetimeSearch.addEventListener("click", dtClick);
$citySearch.addEventListener("click", cityClick);
$stateSearch.addEventListener("click", stateClick);
$countrySearch.addEventListener("click", countryClick);
$shapeSearch.addEventListener("click", shapeClick);
$resetButan.addEventListener("click", resetTable);

// Set up variables for filtered data and original data
const oldData = dataSet;
let filterData = dataSet;

// Set up some variables for pagination
let currentPage = 1;
let recordsPerPage = 250;

// Functions for the event listeners for the filters
function dtClick() {
    let dtFilter = $words.value.trim();

    filterData = dataSet.filter(function(ufo) {
        let dtUfo = ufo.datetime;

        return dtUfo === dtFilter;
    });
    changePage(1, filterData);
    currentPage = 1;
}

function cityClick() {
    let cityFilter = $words.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let cityUfo = ufo.city.toLowerCase();

        return cityUfo === cityFilter;
    });
    changePage(1, filterData);
    currentPage = 1;
}

function stateClick() {
    let stateFilter = $words.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let stateUfo = ufo.state.toLowerCase();

        return stateUfo === stateFilter;
    });
    changePage(1, filterData);
    currentPage = 1;
}

function countryClick() {
    let countryFilter = $words.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let countryUfo = ufo.country.toLowerCase();

        return countryUfo === countryFilter;
    });
    changePage(1, filterData);
    currentPage = 1;
}

function shapeClick() {
    let shapeFilter = $words.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let shapeUfo = ufo.shape.toLowerCase();

        return shapeUfo === shapeFilter;
    });
    changePage(1, filterData);
    currentPage = 1;
}

function resetTable() {
    filterData = oldData;
    changePage(1, filterData);
}

// functions to move through the pagination
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        changePage(currentPage, filterData);
    }
}

function nextPage() {
    if (currentPage < numPages(filterData)) {
        currentPage++;
        changePage(currentPage, filterData);
    }
}

// PAGINATE
function changePage(page, ufos) {
    // Set DOM variables for elements that will change as page changes
    let $nextPage = document.getElementById("nextpage");
    let $nextPage2 = document.getElementById("nextpage2");
    let $prevPage = document.getElementById("prevpage");
    let $prevPage2 = document.getElementById("prevpage2");
    let $ufoTable = document.getElementById("ufotable");
    let $page = document.getElementById("page");
    let $page2 = document.getElementById("page2");

    // I cut this bit out from the source  because I don't understand it yet
    // if (page < 1) page = 1;
    // if (page > numPages(filterData)) page = numPages(filterData);

    // Reset the table for each page
    $ufoTable.innerHTML = "";

    // Do this here so it doesn't happen lots of times if it was in the for loop
    ufoLength = ufos.length;

    // THIS VARIABLE can't use i for insertRow if you're multiplying it by 1000!
    let counter=0

    // THE PAGINATION LOOP: set i to current page - 1, multiplied by how many records we want on each page, so we can get the proper index from our dataset.  Page 1 will get us started at index 0, 2 index 1000, etc 
    for (var i = (page-1) * recordsPerPage; i < (page * recordsPerPage) && i < ufoLength; i++) {
        // insert row # not in the thousands and increment the counter
        let $row = $ufoTable.insertRow(counter);
        counter++

        // find the right row to populate our table
        let tableKeys = Object.values(ufos[i]);
        for (var j = 0; j < 7; j++) {
            //Insert cells into the row
            let $cell = $row.insertCell(j);
            $cell.innerText = tableKeys[j];
        }
    }

    // Set the page element to display current page
    $page.innerHTML = page + " (of " + numPages(filterData) + ")";
    //$page2.innerHTML = page + " (of " + numPages(filterData) + ")";

    // Conditionals to show/hide buttons if we're on the first or last page, or not
    if (page === 1) {
        $prevPage.style.visibility = "hidden";
        //$prevPage2.style.visibility = "hidden";
    }
    else {
        $prevPage.style.visibility = "visible";
        //$prevPage2.style.visibility = "visible";
    }

    if (page == numPages(filterData)) {
        $nextPage.style.visibility = "hidden";
        //$nextPage2.style.visibility = "hidden";
    }
    else {
        $nextPage.style.visibility = "visible";
        //$nextPage2.style.visibility = "visible";
    }
}

// a function to tell us how many pages we'll be needing
function numPages(ufos) {
    return Math.ceil(ufos.length / recordsPerPage);
}

// Do things when the window loads the page
window.onload = function() {
    changePage(1, filterData);
}