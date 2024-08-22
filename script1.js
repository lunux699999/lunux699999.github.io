// Array of specific quotes
const quotes = [
    "You died LOL!",
    "Imagine searching up this website",
    "Why would you click the skull?",
    "You went out of your way to search this up!",
    "You died to nervy and elky"
];

// Variable to keep track of the last quote
let lastQuote = '';

function getRandomQuote() {
    let randomIndex;
    let newQuote;

    // Ensure the new quote is different from the last one
    do {
        randomIndex = Math.floor(Math.random() * quotes.length);
        newQuote = quotes[randomIndex];
    } while (newQuote === lastQuote);

    lastQuote = newQuote;
    return newQuote;
}

// Function to apply the random quote to the #quote element with animations
function applyRandomQuote() {
    const quoteElement = document.getElementById('quote');
    const randomQuote = getRandomQuote();

    // Set the text content and apply typing animation
    quoteElement.textContent = randomQuote;
    quoteElement.classList.remove('erasing');
    quoteElement.classList.add('typing');

    // After typing animation ends, start erasing animation
    const typingDuration = 4000; // Duration of typing animation (4s)
    const erasingDuration = 2000; // Duration of erasing animation (2s)

    setTimeout(() => {
        quoteElement.classList.remove('typing');
        quoteElement.classList.add('erasing');
    }, typingDuration); // Wait until typing animation completes

    // After erasing animation ends, apply a new quote
    setTimeout(() => {
        quoteElement.textContent = ''; // Clear the current text content
        applyRandomQuote(); // Recursively call to get the next quote
    }, typingDuration + erasingDuration); // Wait until both typing and erasing complete
}

// Start with an initial quote
window.onload = applyRandomQuote;
