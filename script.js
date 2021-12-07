

window.addEventListener("load", function() {
    document.addEventListener("submit", function(event) {

        event.preventDefault()
        let pilot = document.querySelector("input[name=pilotName]");
        let copilot = document.querySelector("input[name=copilotName]");
        let fuelLevel = document.querySelector("input[name=fuelLevel]");
        let cargoLevel = document.querySelector("input[name=cargoMass]");

        //function call
        formSubmission(document, pilot.value, copilot.value, fuelLevel.value, cargoLevel.value)
    });



// This is taking our myFetch function and inserting it into our placeholder listedPlanetResponse that is turning our function and json into a variable for use in our second function pickPlanet which will randomly generate a number.
    let listedPlanets;
    let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        console.log(listedPlanets);
    }).then(function () {

        let planet = listedPlanets[pickPlanet()]

        // The listedPlanets that was fetched is an array of 6 objects. Therefore our random number will be our index to choose which planet to display.
        addDestinationInfo(document, planet.name, planet.diameter, planet.star, planet.distance, planet.moons, planet.image)
    })

});

