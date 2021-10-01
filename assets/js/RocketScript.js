/** ********************************************** **
	@Author			Alex Wallot
	@Last Update	Friday, October 1, 2021

	Description     This file is for all the function i 
                    gonna use in quote-page.html.
*************************************************** **/

/* Display the input when the client choose type of building */


const STANDARD_PRICE = 7565;
const PREMIUM_PRICE = 12345;
const EXCELIUM_PRICE = 15400;

const STANDARD_FEES = 0.10;
const PREMIUM_FEES = 0.13;
const EXCELIUM_FEES = 0.16;

let dollarCAN = new Intl.NumberFormat("en-CA",{ style: 'currency', currency: 'CAD'});

/* Display the input when the client choose type of building */
function displayInputText(){
    displayNone();
    resetAll();
    if (document.getElementById("type").value == "residential") {
        var div = document.getElementsByClassName("residential")[0];
        div.style.display = "initial";
        div.style.marginBottom = "10%";
        
    } else if (document.getElementById("type").value == "commercial") {
        var div = document.getElementsByClassName("commercial")[0];
        div.style.display = "initial";
        div.style.marginBottom = "10%";
        
    }else if (document.getElementById("type").value == "corporate") {
        var div = document.getElementsByClassName("corporate")[0];
        div.style.display = "initial";
        div.style.marginBottom = "10%";
        
    }else if (document.getElementById("type").value == "hybrid") {
        var div = document.getElementsByClassName("hybrid")[0];
        div.style.display = "initial";
        div.style.marginBottom = "10%";					
    }
}

/* Reset all input value when the client change the type of building */
function resetAll() {
    /* Reset input in type of building */
    var list = ["residential","commercial","corporate","hybrid"];
    for (let index = 0; index < list.length; index++) {
        var listInput  = document.getElementsByClassName(list[index])[0].getElementsByTagName("input")
        for (let i = 0; i < listInput.length; i++) {
            listInput[i].value = "";
        }
    }

    /* Reset input in result */
    var listResult  = document.getElementsByClassName("result")[0].getElementsByTagName("p");
    for (let index = 0; index < listResult.length; index++) {
        listResult[index].innerHTML = "";
    }

    /* reset radio button */
    var listChecked = document.getElementsByClassName("radioButton")[0].getElementsByTagName("input");
    for (let index = 0; index < listChecked.length; index++) {
        listChecked[index].checked = false;
    }

}

/* Remove all input field when the client change the type of building */
function displayNone() {
    var list = ["residential","commercial","corporate","hybrid"];
    for (let index = 0; index < list.length; index++) {
        document.getElementsByClassName(list[index])[0].style.display = "none";
    }
}

/* Calculate and show all the result */
function getPrice() {

    if (document.getElementById("type").value == "residential") {
        var type = getType();
        getRensidentialAPIObject(document.getElementsByClassName("residential")[0].getElementsByTagName("input")[0].value,
                                 document.getElementsByClassName("residential")[0].getElementsByTagName("input")[1].value,
                                 type);
          
    } else if (document.getElementById("type").value == "commercial") {
        var type = getType();
        getCommercialAPIObject(document.getElementsByClassName("commercial")[0].getElementsByTagName("input")[4].value,
                               type);
        
    }else if (document.getElementById("type").value == "corporate") {
        var type = getType();
        getCorporateAPIObject(document.getElementsByClassName("corporate")[0].getElementsByTagName("input")[1].value,
                              document.getElementsByClassName("corporate")[0].getElementsByTagName("input")[2].value,
                              document.getElementsByClassName("corporate")[0].getElementsByTagName("input")[4].value,
                              type);
        
    }else if (document.getElementById("type").value == "hybrid") {
        var type = getType();
        getHybridAPIObject(document.getElementsByClassName("hybrid")[0].getElementsByTagName("input")[1].value,
                           document.getElementsByClassName("hybrid")[0].getElementsByTagName("input")[2].value,
                           document.getElementsByClassName("hybrid")[0].getElementsByTagName("input")[4].value,
                           type);
    }
    return numElevator;
}

// get the type and show the radio button price the client choose in the result p
function getType() {
    if (document.getElementById("standard").checked) {
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[1].innerHTML = dollarCAN.format(STANDARD_PRICE);
        return 'standard';
    }
    if (document.getElementById("premium").checked) {
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[1].innerHTML = dollarCAN.format(PREMIUM_PRICE);
        return 'premium';
    }
    if (document.getElementById("excelium").checked) {
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[1].innerHTML = dollarCAN.format(EXCELIUM_PRICE);
        return 'excelium';
    }
}

// get the object created by the api for Residential
function getRensidentialAPIObject(apartment,floor,type) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    if (apartment === '') {
        apartment = 0;
    }else if (floor === '') {
        floor = 0;
    }

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'http://localhost:3000/api/residential?apartment='+apartment+'&floor='+floor+'&type='+type+'', true)

    request.setRequestHeader('Content-Type', 'application/xml');
    var data = request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML = data.numElevator;
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[2].innerHTML = dollarCAN.format(data.totalPriceElevator);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[3].innerHTML = dollarCAN.format(data.fees);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[4].innerHTML = dollarCAN.format(data.fullPrice);
        console.log(data)
    }

    // Send request
    request.send()
}

// get the object created by the api for Commercial
function getCommercialAPIObject(numElevator,type) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'http://localhost:3000/api/commercial?elevator='+ numElevator +'&type='+type+'', true)


    request.setRequestHeader('Content-Type', 'application/xml');
    var data = request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML = data.numElevator;
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[2].innerHTML = dollarCAN.format(data.totalPriceElevator);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[3].innerHTML = dollarCAN.format(data.fees);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[4].innerHTML = dollarCAN.format(data.fullPrice);
        console.log(data)
    }

    // Send request
    request.send()
}

// get the object created by the api for Corporate
function getCorporateAPIObject(floor,basement,maxOccup,type) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    if (floor === '') {
        floor = 0;
    }if (basement === '') {
        basement = 0;
    }if (maxOccup === '') {
        maxOccup = 0;
    }
    
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'http://localhost:3000/api/corporate?floor='+floor+'&basement='+basement+'&maxOccup='+maxOccup+'&type='+type+'', true)

    request.setRequestHeader('Content-Type', 'application/xml');
    var data = request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML = data.numElevator;
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[2].innerHTML = dollarCAN.format(data.totalPriceElevator);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[3].innerHTML = dollarCAN.format(data.fees);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[4].innerHTML = dollarCAN.format(data.fullPrice);
        console.log(data)
    }

    // Send request
    request.send()
}

// get the object created by the api for Hybrid
function getHybridAPIObject(floor,basement,maxOccup,type) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()

    if (floor === '') {
        floor = 0;
    }if (basement === '') {
        basement = 0;
    }if (maxOccup === '') {
        maxOccup = 0;
    }
    
    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'http://localhost:3000/api/hybrid?floor='+floor+'&basement='+basement+'&maxOccup='+maxOccup+'&type='+type+'', true)

    console.log('http://localhost:3000/api/hybrid?floor='+floor+'&basement='+basement+'&maxOccup='+maxOccup+'&type='+type+'');
    request.setRequestHeader('Content-Type', 'application/xml');
    var data = request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML = data.numElevator;
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[2].innerHTML = dollarCAN.format(data.totalPriceElevator);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[3].innerHTML = dollarCAN.format(data.fees);
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[4].innerHTML = dollarCAN.format(data.fullPrice);
        console.log(data)
    }

    // Send request
    request.send()
}