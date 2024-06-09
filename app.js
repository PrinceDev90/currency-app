const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const msg = document.querySelector("#msg");
let fromcurrncy = document.querySelector(".from select");
let tocurrncy = document.querySelector(".to select");
for (let select of dropdowns) {
  for (country in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = country;
    newOption.value = country;
    if (select.name === "from" && country === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && country === "INR") {
      newOption.selected = "selected";
    }
    select.appendChild(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateFlag = (element) => {
  let countryName = element.value;
  let countryCode = countryList[countryName];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};


btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeValue();
});

const updateExchangeValue = async () => {
  let amount = document.querySelector(".amount input");
  let amountValue = amount.value;
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = 1;
  }
  let fromcountrymainname = fromcurrncy.value.toLowerCase();
  let tocountrymainname = tocurrncy.value.toLowerCase();
  const URL = `${BASE_URL}/${fromcountrymainname}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  // console.log(data);
  const rate = data[fromcountrymainname][tocountrymainname];
  let finalAmount = rate * amountValue;
  msg.innerText = `${amountValue} ${fromcountrymainname.toUpperCase()} = ${finalAmount} ${tocountrymainname.toUpperCase()}`;
};
window.addEventListener("load", () => {
  updateExchangeValue();
});