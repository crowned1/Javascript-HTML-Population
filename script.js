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

// Set up a function to render the table
function renderTable(ufos) {
    $tbody.innerHTML= "";
    for (var i = 0, ii=ufos.length; i < ii; i++) {
        // Insert rows into our table
        var $row = $tbody.insertRow(i);
        var tableKeys = Object.values(ufos[i]);

        for (var j = 0; j < 7; j++) {
            // Insert cells into the row
            var $cell = $row.insertCell(j);
            $cell.innerText = tableKeys[j];
        }
    }
}

function dtClick() {
    let dtFilter = $datetimeInput.value.trim();

    filterData = dataSet.filter(function(ufo) {
        let dtUfo = ufo.datetime;

        return dtUfo === dtFilter;
    });
    renderTable(filterData);
}

function cityClick() {
    let cityFilter = $cityInput.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let cityUfo = ufo.city.toLowerCase();

        return cityUfo === cityFilter;
    });
    renderTable(filterData);
}

function stateClick() {
    let stateFilter = $stateInput.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let stateUfo = ufo.state.toLowerCase();

        return stateUfo === stateFilter;
    });
    renderTable(filterData);
}

function countryClick() {
    let countryFilter = $countryInput.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let countryUfo = ufo.country.toLowerCase();

        return countryUfo === countryFilter;
    });
    renderTable(filterData);
}

function shapeClick() {
    let shapeFilter = $shapeInput.value.trim().toLowerCase();

    filterData = dataSet.filter(function(ufo) {
        let shapeUfo = ufo.shape.toLowerCase();

        return shapeUfo === shapeFilter;
    });
    renderTable(filterData);
}

function resetTable() {
    filterData = oldData;
    renderTable(filterData);
}
renderTable(filterData);