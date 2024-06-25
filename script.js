const quoteContainer = document.querySelector('#quote-container')
const quoteText = document.querySelector("#quote")
const quoteAuthor = document.querySelector("#author")
const buttonTwitter = document.querySelector('#twitter')
const buttonNewQuote = document.querySelector('#new-quote')
const loader = document.querySelector('.loader')

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true
}

// Hide Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true
    }
}

// Get Quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://corsproxy.io/?'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl, { method: 'GET', redirect: 'follow' })
        const data = await response.json()

        // If Author is blank, add 'unknown'
        if (data.quoteAuthor === '') {
            quoteAuthor.innerText = 'Unknown.'
        } else {
            quoteAuthor.innerText = data.quoteAuthor
        }

        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote')
        } else {
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText

        // Stop Loader, Show Quote
        complete();
    } catch (error) {
        getQuote()
        console.log('Whoops, no quotes!', error)
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

// Event Listener
buttonTwitter.addEventListener('click', tweetQuote)
buttonNewQuote.addEventListener('click', getQuote)


// On Load
getQuote()