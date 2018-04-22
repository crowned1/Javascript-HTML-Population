// Set up DOM references to table, and inputs + their search buttons
let $tbody = document.querySelector("tbody");

let $datetimeInput = document.querySelector("#datetime");
let $datetimeSearch = document.querySelector("#searchdt");

let $cityInput = document.querySelector("#city");
let $citySearch = document.querySelector("#searchcity");

let $stateInput = document.querySelector("#state");
let $stateSearch = document.querySelector("#searchstate");

let $countryInput = document.querySelector("#country");
let $countrySearch = document.querySelector("#searchcountry");

let $shapeInput = document.querySelector("#shape");
let $shapeSearch = document.querySelector("#searchshape");

let $resetButan = document.querySelector("#reset");

// Set up event listeners for each filter input
$datetimeSearch.addEventListener("click", dtClick);
$citySearch.addEventListener("click", cityClick);
$stateSearch.addEventListener("click", stateClick);
$countrySearch.addEventListener("click", countryClick);
$shapeSearch.addEventListener("click", shapeClick);
$resetButan.addEventListener("click", resetTable);

// Set up variables for filtered data and original data
const oldData = dataSet
let filterData = dataSet

// Pagination time!
let currentPage = 1;
let recordsPerPage = 1000;

// I think this is made obsolete by pagination
// // Set up a function to render the table
// function renderTable(ufos) {
//     $tbody.innerHTML= "";
//     for (var i = 0, ii=ufos.length; i < ii; i++) {
//         // Insert rows into our table
//         var $row = $tbody.insertRow(i);
//         var tableKeys = Object.values(ufos[i]);

//         for (var j = 0; j < 7; j++) {
//             // Insert cells into the row
//             var $cell = $row.insertCell(j);
//             $cell.innerText = tableKeys[j];
//         }
//     }
// }

// this stuff might be too
function dtClick() {
    let dtFilter = $datetimeInput.value.trim();

    filterData = dataSet.filter(function(ufo) {
        let dtUfo = ufo.datetime;

        return dtUfo === dtFilter;
    });
    changePage(1, filterData);
    currentPage = 1;
}

function cityClick() {
    let cityFilter = $cityInput.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let cityUfo = ufo.city.toLowerCase();

        return cityUfo === cityFilter;
    });
    changePage(1, filterData);
    currentPage = 1;
}

function stateClick() {
    let stateFilter = $stateInput.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let stateUfo = ufo.state.toLowerCase();

        return stateUfo === stateFilter;
    });
    changePage(1, filterData);
    currentPage = 1;
}

function countryClick() {
    let countryFilter = $countryInput.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let countryUfo = ufo.country.toLowerCase();

        return countryUfo === countryFilter;
    });
    changePage(1, filterData);
    currentPage = 1;
}

function shapeClick() {
    let shapeFilter = $shapeInput.value.trim().toLowerCase();

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

function changePage(page, ufos) {
    let $nextPage = document.getElementById("nextpage");
    let $nextPage2 = document.getElementById("nextpage2");
    let $prevPage = document.getElementById("prevpage");
    let $prevPage2 = document.getElementById("prevpage2");
    let $ufoTable = document.getElementById("ufotable");
    let $page = document.getElementById("page");
    let $page2 = document.getElementById("page2");

    // I cut this bit out from the code because I don't understand it yet
    // if (page < 1) page = 1;
    // if (page > numPages(filterData)) page = numPages(filterData);

    $ufoTable.innerHTML = "";
    ufoLength = ufos.length;
    let counter=0
    for (var i = (page-1) * recordsPerPage; i < (page * recordsPerPage) && i < ufoLength; i++) {
        let $row = $ufoTable.insertRow(counter);
        counter++
        let tableKeys = Object.values(ufos[i]);
        for (var j = 0; j < 7; j++) {
            //Insert cells into the row
            let $cell = $row.insertCell(j);
            $cell.innerText = tableKeys[j];
        }
    }
    $page.innerHTML = page;
    $page2.innerHTML = page;

    if (page === 1) {
        $prevPage.style.visibility = "hidden";
        $prevPage2.style.visibility = "hidden";
    }
    else {
        $prevPage.style.visibility = "visible";
        $prevPage2.style.visibility = "visible";
    }

    if (page == numPages(filterData)) {
        $nextPage.style.visibility = "hidden";
        $nextPage2.style.visibility = "hidden";
    }
    else {
        $nextPage.style.visibility = "visible";
        $nextPage2.style.visibility = "visible";
    }
}

function numPages(ufos) {
    return Math.ceil(ufos.length / recordsPerPage);
}

window.onload = function() {
    changePage(1, filterData);
}