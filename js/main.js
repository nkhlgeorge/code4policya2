// make what will later be visualization instances global variables
// alert(sammy.first_name);
var sammy
var first_name

// define global dataset
let travelData;
let countryInput, countryOutput;


// read in filtered dataset with the closest date
d3.csv("data/OxCGRT_latest_onerowpercountry_01092021_0100.csv", (data) => {
    // replace key strings with readable ones
    data['C8_quarantine'] = data['C8_International travel controls'];
    data['C5_publicTransport'] = data['C5_Close public transport'];
    data['H6_FacialCoverings'] = data['H6_Facial Coverings']
    return data;
}).then( data => {

    // attribute travelData to this data
    travelData = data

    // Analyze the dataset in the web console, it looks clean and beautiful
    console.log(travelData);

})

//show filtered row data in the console based on search bar input
function ShowInput(d){

    console.log(document.getElementById("country").value);
    countryInput = document.getElementById("country").value;

    countryOutput = travelData.filter(function(country){
        // filter based on search bar input
        return country.CountryName.toLowerCase() === countryInput.toLowerCase()
    })
    //show them in the console
    console.log(countryOutput);
    console.log(countryOutput[0]);

    // tease out relevant information and put them in the div
    document.getElementById("heading").innerHTML =
        countryOutput[0].CountryName

    // parses date and reorders to display MM/DD/YYYY

    document.getElementById("row1").innerHTML =
        ("as of " + countryOutput[0].Date.substr(4,2)
            + "/" + countryOutput[0].Date.substr(6,2) 
            + "/" + countryOutput[0].Date.substr(0,4)
            + ":")

    // defined three variables that contain the ordinal scale information of each column
    var quarantineInfo = document.getElementById("row2").innerHTML =
        countryOutput[0].C8_quarantine

    // similar across other columns
    var publicTransportInfo = document.getElementById("row3").innerHTML =
        countryOutput[0].C5_publicTransport

    var facialCoveringsInfo = document.getElementById("row4").innerHTML =
        countryOutput[0].H6_FacialCoverings

    // Story 5: to-do articulate restriction levels based on the conditions (hint: google if, then function in js)
    // add if then statement to translate quarantineInfo, publicTransportInfo, and facialCoveringsInfo into the three boxes,
    // Note: remember to change the elementId into public-transportation, facial-coverings, respectively.
    if (quarantineInfo == 2){
        document.getElementById("quarantine").innerHTML =
            "Depending on your country of origin, you may need to quarantine. Please refer to guidance from the country's health agency for specific instructions."
    } else if (quarantineInfo == 0){
        document.getElementById("quarantine").innerHTML =
            "There is no quarantine requirement. Lucky you!"
    } else if (quarantineInfo == 1){
        document.getElementById("quarantine").innerHTML =
            "Temperature screening at airports, random Covid testing, and quarantine for detected high temperatures."
    } else if (quarantineInfo == 3){
        document.getElementById("quarantine").innerHTML =
            "Quarantine for all arrivals, and travel bans from some countries. Check your country of origin against the list of banned countries."
    } else if (quarantineInfo == 4){
        document.getElementById("quarantine").innerHTML =
            "Oh my, border is closed! I don't even know how you got in! Border control!"
    } else if (quarantineInfo == ""){
        document.getElementById("quarantine").innerHTML =
            "No data"
    }

    // the other two columns go here
    if (publicTransportInfo == 0){
        document.getElementById("public-transportation").innerHTML =
            "Public transportation is functioning normally, but please travel safe!"
    } else if (publicTransportInfo == 1){
        document.getElementById("public-transportation").innerHTML =
            "Public transportation is limited to some routes and capacity is reduced. Check for active routes, or try walking for a change!"
    } else if (publicTransportInfo == 2){
        document.getElementById("public-transportation").innerHTML =
            "Ahh, public transportation is closed. Please google 'car renting'!"
    } else if (publicTransportInfo == ""){
        document.getElementById("public-transportation").innerHTML =
            "No data available"
    }

    if (facialCoveringsInfo  == 0){
        document.getElementById("facial-coverings").innerHTML =
            "You don't have to wear a mask in public. Is it 2019 again?"
    } else if (facialCoveringsInfo  == 1){
        document.getElementById("facial-coverings").innerHTML =
            "Mask wearing is not a must, but recommended."
    } else if (facialCoveringsInfo  == 2){
        document.getElementById("facial-coverings").innerHTML =
            "You need to wear a mask in some public places and around people. Don't forget to bring one!"
    } else if (facialCoveringsInfo == 3){
        document.getElementById("facial-coverings").innerHTML =
            "You need to wear a mask in all public places, and when social distancing is not possible."
    }  else if (facialCoveringsInfo == 4){
        document.getElementById("facial-coverings").innerHTML =
            "In some regions - or the entire country - you have to wear a mask outside of your home, no matter what!"
    }  else if (facialCoveringsInfo == ""){
        document.getElementById("facial-coverings").innerHTML =
            "No data available"
    }}

// When the user clicks on <div>, open the popup
function myFunction() {
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}

function mySecondFunction(){
    var secondpopup = document.getElementById("myPopup1");
    secondpopup.classList.toggle("show");
}

function myThirdFunction(){
    var thirdpopup = document.getElementById("myPopup2");
    thirdpopup.classList.toggle("show");
}

// Searchbar Enter Function
var input = document.getElementById("country");

// Execute a function when the user enters a key on the keyboard
input.addEventListener("keyup", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Triggers this function linked to searchbar in HTML
    document.getElementById("search-function").click();
  }
});

