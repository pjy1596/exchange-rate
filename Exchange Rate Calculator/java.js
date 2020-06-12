class Calculate {
  constructor() {
    this.fromThisCountry = document.querySelector("#select1").value;
  }
  async getCurrency() {
    const currency = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${this.fromThisCountry}`
    );
    const currencyData = await currency.json();
    return {
      currencyData,
    };
  }
}
const calculate = new Calculate();

const select1 = document.getElementById("select1");
const select2 = document.getElementById("select2");
const swap = document.querySelector(".btn-swap");
const input1 = document.getElementById("top-input");
const input2 = document.getElementById("bottom-input");
const swapComment = document.querySelector(".swap-comment");

function showCalculate() {
  const select_one = select1.value;
  const select_two = select2.value;
  calculate.getCurrency().then((currencyData) => {
    const rate = currencyData.rates[select_two];
    swapComment.innerText = `1${select_one} equals ${rate}${select_two}`;
    input2.value = input1.value * rate;
  });
}

input1.addEventListener("input", showCalculate);
input2.addEventListener("input", showCalculate);
select1.addEventListener("change", showCalculate);
select2.addEventListener("change", showCalculate);

swap.addEventListener("click", swapFunc);
function swapFunc() {
  const temp = select1.value;
  select1.value = select2.value;
  select2.value = temp;
  showCalculate();
}
showCalculate();
