const base_currency = document.getElementById("base_currency");
const base_currency_quantity = document.getElementById("base_currency_quantity");
const target_currency = document.getElementById("target_currency");
const target_currency_quantity = document.getElementById("target_currency_quantity");
const firstRow = document.getElementById("first_row");
const thirdRow = document.getElementById("third_row");
const result = document.getElementById("result");
const currencies = [
  "USD",
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "AOA",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "FOK",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KID",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TVD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];
//https://v6.exchangerate-api.com/v6/YOUR-API-KEY/pair/EUR/GBP
makeSelectionMenueOptions(currencies);

const url = `https://v6.exchangerate-api.com/v6/b9ffce6b13208d09c9d8195d/pair/${base_currency.value}/${target_currency.value}`;
function showResult(conversion_rate, quantity) {
  const calculated = (Number(quantity) * Number(conversion_rate)).toFixed(2);
  result.innerText = `1 ${base_currency.value} = ${conversion_rate} ${target_currency.value}`;
  target_currency_quantity.innerText = calculated;
  if (target_currency_quantity.scrollWidth > target_currency_quantity.clientWidth) {
    let mySize = target_currency_quantity.scrollWidth;

    console.log(mySize, target_currency_quantity.style.width);
  }
}

async function getData(url) {
  const response = await fetch(url);
  if (response.ok) {
    const jsonValue = await response.json();
    return jsonValue.conversion_rate; // Get JSON
  } else {
    return Promise.reject("ERROR");
  }
}
base_currency.addEventListener("input", (event) => {
  const url = `https://v6.exchangerate-api.com/v6/b9ffce6b13208d09c9d8195d/pair/${event.target.value}/${target_currency.value}`;
  getData(url).then((response) => {
    showResult(response, base_currency_quantity.value);
  });
});
target_currency.addEventListener("input", (event) => {
  const url = `https://v6.exchangerate-api.com/v6/b9ffce6b13208d09c9d8195d/pair/${base_currency.value}/${event.target.value}`;
  getData(url).then((response) => {
    showResult(response, base_currency_quantity.value);
  });
});
base_currency_quantity.addEventListener("input", (event) => {
  const url = `https://v6.exchangerate-api.com/v6/b9ffce6b13208d09c9d8195d/pair/${base_currency.value}/${target_currency.value}`;
  getData(url).then((response) => {
    showResult(response, event.target.value);
  });
});

function makeSelectionMenueOptions(currencies) {
  for (i = 0; i < currencies.length; i++) {
    const option = document.createElement("option");
    option.value = currencies[i];
    option.innerText = currencies[i];
    base_currency.appendChild(option);
  }
  for (i = 0; i < currencies.length; i++) {
    const option = document.createElement("option");
    option.value = currencies[i];
    option.innerText = currencies[i];
    target_currency.appendChild(option);
  }
}

function swap() {
  const temp1 = base_currency.selectedIndex;
  const temp2 = target_currency.selectedIndex;
  base_currency.selectedIndex = temp2;
  target_currency.selectedIndex = temp1;
  const url = `https://v6.exchangerate-api.com/v6/b9ffce6b13208d09c9d8195d/pair/${base_currency.value}/${target_currency.value}`;
  getData(url).then((response) => {
    showResult(response, base_currency_quantity.value);
  });
}
