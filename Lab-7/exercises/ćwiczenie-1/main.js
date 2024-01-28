let nbpRates;
const inputCode = document.getElementById("input-currency-code");
const outputCode = document.getElementById("output-currency-code");
const inputAmount = document.getElementById("input-amount");
const outputAmount = document.getElementById("output-amount");
const inputLabel = document.getElementById("input-amount-label");
const outputLabel = document.getElementById("output-amount-label");
const selectDate = document.getElementById("effective-date");
const error = document.getElementById("error");
const calculateBtn = document.getElementById("calculateBtn");

function switchTypeOfDeal(current) {
    if(current === "BUY") return "SELL";
    return "BUY";
}

async function getMoneyCodes() {
    const response = await fetch("https://api.nbp.pl/api/exchangerates/tables/C/");
    const json = await response.json();

    const currencies = json[0].rates.map(rate => rate.code);

    return currencies;
  }

  function populateMoneyCodes(moneyCodes) {

    moneyCodes.forEach(code => {
        let option = document.createElement("option");
        option.text = code;
        option.value = code;
        inputCode.add(option);
    })
    let option = document.createElement("option");
    option.text = "PLN";
    option.value = "PLN";
    inputCode.add(option);

    moneyCodes.forEach(code => {
        let option = document.createElement("option");
        option.text = code;
        option.value = code;
        outputCode.add(option);
    })

    let option2 = document.createElement("option");
    option2.text = "PLN";
    option2.value = "PLN";
    outputCode.add(option);
  }
function getUrl(input, date) {
    return `http://api.nbp.pl/api/exchangerates/rates/C/${input}/${date}`
}
  async function  run() {

    error.innerText = "";

    let date = selectDate.value;
    let url = getUrl(inputCode.value, date);
    let response = await fetch(url);
    if(response.status !== 200)
    {
        error.innerText = "NO DATA FOR THIS DATE!";
        return;
    }
    let json = await response.json();
    let baseConvertsion = isSell() ? json.rates[0].bid : json.rates[0].ask;


    
    let closeConversion;
    if(outputCode.value === 'PLN') {
        closeConversion = 1;
    } else {
        url = getUrl(outputCode.value, date);
        response = await fetch(url);
        if(response.status !== 200)
        {
            error.innerText = "NO DATA FOR THIS DATE!";
            return;
        }
        json = await response.json();

        closeConversion = isSell() ? json.rates[0].bid : json.rates[0].ask;
    }

    let final = (inputAmount.value * baseConvertsion) / closeConversion;
    
    outputAmount.innerText = `${final.toFixed(2)} ${outputCode.value}`;
}

async function main() {

    let possbileMoneyCodes = await getMoneyCodes();
    populateMoneyCodes(possbileMoneyCodes);
    calculateBtn.onclick = run;
    
}
function isSell() { return document.getElementById('bid').checked; };

main();

// populateMoneyCodes(possbileMoneyCodes);


/**
 * Zaimplementuj kalkulator walutowy, który pobiera dane kursów z API NBP.
 * Adres:
 * https://api.nbp.pl/api/exchangerates/tables/C/<data>,
 * w miejscu <data> należy wstawić datę z elementu HTML o id `effectiveDate`
 * np.
 * https://api.nbp.pl/api/exchangerates/tables/C/2023-01-19
 * Serwer zwróci kursy walut o poniższej strukturze jeśli w żądaniu nagłówek `Accept` ma wartość `application/json`:
 * [
 *   {
 *     "table": "C",
 *     "no": "014/C/NBP/2023",
 *     "tradingDate": "2023-01-19",
 *     "effectiveDate": "2023-01-20",
 *     "rates": [
 *       {
 *         "currency": "dolar amerykański",
 *         "code": "USD",
 *         "bid": 4.3183,
 *         "ask": 4.4055
 *       },
 *       {
 *         "currency": "dolar australijski",
 *         "code": "AUD",
 *         "bid": 2.9852,
 *         "ask": 3.0456
 *       },
 *       ...
 *    }
 *  ]
 *  Wypełnij elementy `inputCode` i `outputCode` listą opcji o wartości kodów walut: USD, EUR itd.
 *  Na podstawie trybu odczytanego z pól typu radio określ tryb: sprzedaż lub kupna
 *  Na podstawie trybu kodów walut wejsciowej (inputCode) i wyjściowej (outputCode) oraz kwoty wejściowej (inputAmount) wylicz jej wartość
 *  w walucie wyjściowej (outputAmount).
 *  Jeśli wystąpi błąd podczas pobierania lub nie istnieje tabela dla wybranej daty wyświetl komunikat błedu w elemencie error
 *  Zmiana trybu (z kupna na sprzedaź lub ze sprzedaży na kupno) powinna:
 *  - zmienić wynik w polu kwoty obliczonej `outputAmount`
 *  - zmienić treść elementów `inputLabel` i `outputLabel`
 *  przykłady wyglądu kalkulatora po pobraniu danych:
 *  - dla trybu `Kurs kupna` - img1.png
 *  - dla trybu 'Kurs sprzedaży - img2.png
 *
 */