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

// Function to create the form to add new quotes
function createAddQuoteForm() {
    // Create a container div
    const formDiv = document.createElement('div');
    formDiv.classList.add('quote-form');
    
    // Create the quote text input
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';
    
    // Create the quote category input
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    
    // Create the add quote button
    const addButton = document.createElement('button');
    addButton.id = 'addQuoteButton';
    addButton.textContent = 'Add Quote';
    
    // Append inputs and button to the form div
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);
    
    // Append the form div to the body
    document.body.appendChild(formDiv);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        showRandomQuote(); // Optionally show the new quote immediately
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Event listener for the 'Show New Quote' button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for the 'Add Quote' button
document.body.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'addQuoteButton') {
        addQuote();
    }
});

// Create the add quote form
createAddQuoteForm();
