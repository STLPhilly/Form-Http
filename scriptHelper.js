require('isomorphic-fetch');

// This function will alert if the form is empty, and return values for if our placeholder 'testInput' is a number or not.
function validateInput(testInput) {
    if (testInput == ""){
        alert("All fields are required");
    }
    else if (isNaN(testInput)){
        return "Not a number";
    }
    else{
        return "Is a number";
    };
};

// This function will change our CSS and HTML based on fuelLevel and cargoLevel, it will also alert based on isNan or String.
function formSubmission(document, pilot, copilot, fuelLevel, cargoLevel) {
    

    if (validateInput(pilot) == "Is a number" || validateInput(copilot) == "Is a number"){
        alert("Error: Invalid name(s).")
    }
    else if (validateInput(fuelLevel) == "Not a number" || validateInput(cargoLevel) == "Not a number"){
        alert("Error: invalid value(s).")
    }

    // This function will change the CSS data based on our form.

    // Here we change the status of our pilots to be ready.
    document.getElementById("pilotStatus").innerHTML = `${pilot} is Ready.` 
    document.getElementById("copilotStatus").innerHTML = `${copilot} is Ready.` 

    // In our if statements we change status to failing status.
    if(fuelLevel < 10000){
        document.getElementById("fuelStatus").innerHTML = "There is not enough fuel for the journey."
    }

    if(cargoLevel > 10000){
        document.getElementById("cargoStatus").innerHTML = "There is too much mass for the shuttle to take off."
    }

    if(fuelLevel < 10000 || cargoLevel > 10000){
        document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch."
        document.getElementById("launchStatus").style.color = "red";
        document.getElementById("faultyItems").style.visibility = "visible";
    }
    
    // But in our else statement, we are saying that everything is passing and good to go.
    else{
        document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch."
        document.getElementById("launchStatus").style.color = "green";
        document.getElementById("faultyItems").style.visibility = "visible";
    }
}


// async is in reference to HTTP Asynchronous meaning that it's waiting for data.
// This function is FETCHING the .json and places the array of objects into a variable.
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
        });

    return planetsReturned;
}

// This function is randomizing the planets after the data is converted into Javascript friendly variables initialized in script.js 
function pickPlanet() {
    let num = Math.random(4*10)*6
    let planet = Math.floor(num)
    console.log(planet)
    return planet;
}

// This function is inserting our HTML into our index.html file, using template literals to insert the information gathered through our listedPlanets, that was gathered with myFetch(), and selected with pickPlanet().
function addDestinationInfo(document, name, diameter, star, distance, moons, image) {
    document.getElementById("missionTarget").innerHTML =
                `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name} </li>
                    <li>Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance} </li>
                    <li>Number of Moons: ${moons} </li>
                </ol>
                <img src="${image}">`

}



module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;