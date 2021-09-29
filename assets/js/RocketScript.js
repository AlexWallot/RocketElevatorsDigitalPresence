/** ********************************************** **
	@Author			Alex Wallot
	@Last Update	Friday, September 24, 2021

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

/* Caculate the number of recommanded elevators the client need */
function numberOfElevator() {
    var numElevator = 0;

    if (document.getElementById("type").value == "residential") {
        numberElevatorResidential();
        
    } else if (document.getElementById("type").value == "commercial") {
        numberElevatorCommercial();
        
    }else if (document.getElementById("type").value == "corporate") {
        numberElevatorCorporate();
        
    }else if (document.getElementById("type").value == "hybrid") {
        numberElevatorHybrid();
    }
    return numElevator;
}

/* Caculate the number of recommanded elevators for residential */
function numberElevatorResidential() {
    var apartment = document.getElementsByClassName("residential")[0].getElementsByTagName("input")[0].value;
    var stage = document.getElementsByClassName("residential")[0].getElementsByTagName("input")[1].value;
    var moy = Math.ceil(apartment/stage);
    numElevator = Math.ceil(moy/6);

    if (numElevator == 0) {
        numElevator++;
    }
    if (stage > 20 == true) {
        var column = Math.ceil(stage / 20);
        numElevator *= column;
    }

    document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML=numElevator;
    return numElevator;
}

/* Caculate the number of recommanded elevators for commercial */
function numberElevatorCommercial() {
    var numElevator = document.getElementsByClassName("commercial")[0].getElementsByTagName("input")[4].value;
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML=numElevator;
    return numElevator;
}

/* Caculate the number of recommanded elevators for corporate */
function numberElevatorCorporate() {
    var maxOccup = document.getElementsByClassName("corporate")[0].getElementsByTagName("input")[4].value;
    var floors = document.getElementsByClassName("corporate")[0].getElementsByTagName("input")[1].value;
    var basement = document.getElementsByClassName("corporate")[0].getElementsByTagName("input")[2].value;

    var totalFloors = parseInt(floors) + parseInt(basement);

    var totalOccup = maxOccup*totalFloors;

    numElevator = Math.round(totalOccup/1000);
        if (numElevator == 0) {
            numElevator++;
        }

    elevatorColumns = Math.ceil(totalFloors/20);
    if (elevatorColumns == 0) {
        elevatorColumns++;
    }

    var averageElCol = Math.ceil(numElevator/elevatorColumns);
    
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML=averageElCol*elevatorColumns;

    return averageElCol*elevatorColumns;
}

/* Caculate the number of recommanded elevators for hybrid */
function numberElevatorHybrid() {
    var maxOccup = document.getElementsByClassName("corporate")[0].getElementsByTagName("input")[4].value;
    var floors = document.getElementsByClassName("corporate")[0].getElementsByTagName("input")[1].value;
    var basement = document.getElementsByClassName("corporate")[0].getElementsByTagName("input")[2].value;

    var totalFloors = parseInt(floors) + parseInt(basement);

    var totalOccup = maxOccup*totalFloors;

    numElevator = Math.round(totalOccup/1000);
        if (numElevator == 0) {
            numElevator++;
        }

    elevatorColumns = Math.ceil(totalFloors/20);
    if (elevatorColumns == 0) {
        elevatorColumns++;
    }

    var averageElCol = Math.ceil(numElevator/elevatorColumns);
    
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML=averageElCol*elevatorColumns;

    return averageElCol*elevatorColumns;
}

function getPrice() {
    if (document.getElementById("standard").checked) {
        getStandardPrice();
    } else if (document.getElementById("premium").checked) {
        getPremiumPrice();
    } else if (document.getElementById("excelium").checked) {
        getExceliumPrice();
    }
}

function getStandardPrice() {
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[1].innerHTML=dollarCAN.format(STANDARD_PRICE);
    var total = getTotalElevatorPrice();
    var totalFees = getStandardFees(total);
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[4].innerHTML=dollarCAN.format(total+totalFees);
}

function getPremiumPrice() {
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[1].innerHTML=dollarCAN.format(PREMIUM_PRICE);
    var total = getTotalElevatorPrice();
    var totalFees = getPremiumFees(total);
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[4].innerHTML=dollarCAN.format(total+totalFees);
}

function getExceliumPrice() {
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[1].innerHTML=dollarCAN.format(EXCELIUM_PRICE);
    var total = getTotalElevatorPrice();
    var totalFees = getExceliumFees(total);
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[4].innerHTML=dollarCAN.format(total+totalFees);
}

function getTotalElevatorPrice() {
    var total = 0;
    if (document.getElementById("standard").checked) {
        total = parseInt(document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML) * STANDARD_PRICE;
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[2].innerHTML=dollarCAN.format(total);
        return total;
    }else if (document.getElementById("premium").checked) {
        total = parseInt(document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML) * PREMIUM_PRICE;
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[2].innerHTML=dollarCAN.format(total);
        return total;
    }else if (document.getElementById("excelium").checked) {
        total = parseInt(document.getElementsByClassName("result")[0].getElementsByTagName("p")[0].innerHTML) * EXCELIUM_PRICE;
        document.getElementsByClassName("result")[0].getElementsByTagName("p")[2].innerHTML=dollarCAN.format(total);
        return total;
    }
    return total;
}

function getStandardFees(total) {
    var totalFees = total * STANDARD_FEES;
    console.log(totalFees.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[3].innerHTML=dollarCAN.format(totalFees);
    return totalFees;
}

function getPremiumFees(total) {
    var totalFees = total * PREMIUM_FEES;
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[3].innerHTML=dollarCAN.format(totalFees);
    return totalFees;
}

function getExceliumFees(total) {
    var totalFees = total * EXCELIUM_FEES;
    document.getElementsByClassName("result")[0].getElementsByTagName("p")[3].innerHTML=dollarCAN.format(totalFees);
    return totalFees;
}