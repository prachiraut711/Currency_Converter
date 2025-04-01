const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    };
    select.addEventListener("change", (evt) =>{
        updateFlag(evt.target);                    //target is basically whenever we make changes , kaha pe chage aya waha that will pass to updateFlag function
    });
};

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;        //used toLowerCase() bcz value gives in capital letters ex:USD,etc. but in api it is in small letters so thays why use this.
    let response = await fetch(URL);
    let data = await response.json();
    // Assuming base currency rates are inside the response in a specific structure
    // Check if the rates object exists
    if (data && data[fromCurr.value.toLowerCase()]) {
        let rates = data[fromCurr.value.toLowerCase()];  // Get the exchange rates for the base currency
        let rate = rates[toCurr.value.toLowerCase()];  // Get the exchange rate for the selected target currency
        if (rate) {
            let convertedAmount = (amtVal * rate).toFixed(4);
            msg.innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount} ${toCurr.value}`;
        }
    }
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;    //in this link i add countryCode    variable instead of indivisual counrty flag image.so when countrylist[currcode] will give its value it will go in newSrc link of image and that country's imag wil be displayed
    let img = element.parentElement.querySelector("img");       //parentElement for img is select-continer
    img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});


