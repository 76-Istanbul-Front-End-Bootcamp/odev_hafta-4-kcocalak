const data = {
  USD: {EUR: 0.82, GBP: 0.74, CHF: 0.88},
  EUR: {USD: 1.23, GBP: 0.91, CHF: 1.08},
  GBP: {USD: 1.35, EUR: 1.10, CHF: 1.19},
  CHF: {USD: 1.13, EUR: 0.92, GBP: 0.84},
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName){
  for(let i =0; i< elements.length; i++){
    const currencyKeyDiv   = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);


const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function(){

  // kimden ceviriyourz
  const fromTarget = document.querySelector("input[name='currency_from']:checked");
  // kime ceviriyoruz
  const toTarget   = document.querySelector("input[name='currency_to']:checked");
  // amountu alalim
  const amount     = document.querySelector("input[name='amount']").value;

  if(fromTarget !== null && toTarget !== null) { 

    const currentCurrencyObject = data[fromTarget.value];
    const resultForOne = currentCurrencyObject[toTarget.value];
    const result = amount * resultForOne;
    if (+amount === 0) {
      const currencyResult = document.querySelector("#currency-result");
      currencyResult.innerHTML = "lutfen amount giriniz"; 
    }
    else if (String(+amount) === "NaN"){
      const currencyResult = document.querySelector("#currency-result");
      currencyResult.innerHTML = "amout olarak sayi girmelisiniz";
    }
    else if (result+"" === "NaN") {
      const currencyResult = document.querySelector("#currency-result");
      currencyResult.innerHTML = "farkli secimler yapmalisiniz";
    }
    else{
      const currencyResult = document.querySelector("#currency-result");
      currencyResult.innerHTML = amount + " " + fromTarget.value + " = " + result + " " + toTarget.value;  
    }
  }
  
  else { 
    const currencyResult = document.querySelector("#currency-result");
    currencyResult.innerHTML 
        = "Secim yapmalisiniz"; 
  }
});