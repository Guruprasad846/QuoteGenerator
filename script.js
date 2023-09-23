// Get quotes from  API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
let apiQuotes = [];
// Show New Quote
function newQuote() {
  // Pick a random quote from apiQuotes array
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quotes");
  } else {
    quoteText.classList.remove("long-quote");
  }
  //set quote hide loader
  quoteText.textContent = ` "${quote.text}"`;
  complete();
}
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // catch error here
  }
}
// on load
//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
//Event Listener
newQuoteButton.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);
// show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

getQuotes();
