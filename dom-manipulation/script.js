// Initial array of quotes
const quotes = [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivational" },
    { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" },
];

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${quote.text}" - <em>${quote.category}</em></p>`;
}

// Function to add a new quote and update the DOM
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        // Add the new quote to the quotes array
        quotes.push({ text: newQuoteText, category: newQuoteCategory });

        // Clear the input fields
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';

        // Create new DOM elements for the new quote
        const newQuoteElement = document.createElement('p');
        newQuoteElement.innerHTML = `"${newQuoteText}" - <em>${newQuoteCategory}</em>`;

        // Append the new quote to the quote display
        document.getElementById('quoteDisplay').appendChild(newQuoteElement);

        alert('Quote added successfully!');
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Event listener for the 'Show New Quote' button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for the 'Add Quote' button
document.getElementById('addQuoteButton').addEventListener('click', addQuote);
