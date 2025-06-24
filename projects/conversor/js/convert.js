const selectors = {
    fromAmount: document.getElementById('fromAmount'),
    toAmount: document.getElementById('toAmount'),
    fromCurrency: document.getElementById('fromCurrency'),
    toCurrency: document.getElementById('toCurrency')
}

const rates = {
    BRL: { USD: 0.18, EUR: 0.16, BRL: 1 },
    USD: { USD: 1, EUR: 0.87, BRL: 5.54 },
    EUR: { USD: 1.16, EUR: 1, BRL: 6.41 }
}

async function convert() {
    const from = selectors.fromCurrency.value
    const to = selectors.toCurrency.value
    const amount = parseFloat(selectors.fromAmount.value)

    if (!amount || isNaN(amount)) return

    try {
        let rate, data, rateKey

        if (from != to) {
            const pair = `${from}-${to}`
            const res = await fetch(`https://economia.awesomeapi.com.br/json/last/${pair}`)
            data = await res.json()
            rateKey = `${from + to}`
            // console.log(data[rateKey])
            rate = parseFloat(data[rateKey].bid)
        } else {
            rate = 1
        }

        const converted = (amount * rate).toFixed(2)
        const fromText = selectors.fromCurrency.selectedOptions[0].textContent
        const toText = selectors.toCurrency.selectedOptions[0].textContent

        selectors.toAmount.value = converted

        document.querySelector('.currency').innerHTML = `
            <p>1 ${fromText} igual a</p>
            <p>${rate.toFixed(2).replace(".", ",")} ${toText}</p>`

        const updateTime = dateFormat(data[rateKey].create_date)
        document.querySelector('.fonts p').textContent = `${updateTime} UTC - De AwesomeAPI`

    } catch (err) {
        console.error("Erro ao buscar a taxa de câmbio: ", err)
        document.querySelector('.currency').innerHTML = "<p>Erro ao buscar a taxa de câmbio</p>"
    }
}

function setupListeners() {
    selectors.fromAmount.addEventListener('input', convert)
    selectors.fromCurrency.addEventListener('change', convert)
    selectors.toCurrency.addEventListener('change', convert)
}

async function loadCurrencies() {
    try {
        const res = await fetch('https://economia.awesomeapi.com.br/json/available/uniq')
        const currencies = await res.json()

        let list = Object.entries(currencies)
        list.sort((a, b) => {
            if (a[1] < b[1]) return -1
            if (a[1] > b[1]) return 1
            return 0
        })

        const fromSelect = selectors.fromCurrency
        const toSelect = selectors.toCurrency

        fromSelect.innerHTML = ''
        toSelect.innerHTML = ''

        for (const code in list) {
            const name = list[code][1]

            const option1 = document.createElement('option')
            option1.value = list[code][0]
            option1.textContent = `${name}`

            const option2 = option1.cloneNode(true)

            fromSelect.appendChild(option1)
            toSelect.appendChild(option2)

        }

        fromSelect.value = 'USD'
        toSelect.value = 'BRL'
        fromAmount.value = 1

        convert()
    } catch (err) {
        console.error("Erro ao carregar as moedas: ", err)
    }
}

function dateFormat(datetime) {
    const [date, time] = datetime.split(' ')
    const [year, month, day] = date.split('-')

    const d = new Date(datetime)
    const nameMonth = d.toLocaleDateString('pt-BR', {month: 'long'})

    console.log(nameMonth)

    return `${day} de ${nameMonth}, ${time}`
}

export { convert, setupListeners, loadCurrencies }