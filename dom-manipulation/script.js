// Initial array of quotes
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
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
    saveQuotes(); // Save quotes to local storage whenever a new quote is displayed
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
    
    // Create export button
    const exportButton = document.createElement('button');
    exportButton.id = 'exportQuotes';
    exportButton.textContent = 'Export Quotes';

    // Create import file input
    const importInput = document.createElement('input');
    importInput.id = 'importFile';
    importInput.type = 'file';
    importInput.accept = '.json';

    // Append inputs and button to the form div
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);
    formDiv.appendChild(exportButton);
    formDiv.appendChild(importInput);
    
    // Append the form div to the body
    document.body.appendChild(formDiv);
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes(); // Save to local storage
        document.getElementById('newQuoteText').value = '';
        document.getElementById('newQuoteCategory').value = '';
        showRandomQuote(); // Optionally show the new quote immediately
    } else {
        alert('Please enter both quote text and category.');
    }
}

// Function to save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Function to export quotes to JSON
function exportQuotes() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
}

// Function to import quotes from JSON
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes = importedQuotes;
        saveQuotes(); // Save to local storage
        showRandomQuote(); // Show the first quote after import
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for the 'Show New Quote' button
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Event listener for the 'Add Quote' button
document.body.addEventListener('click', function(event) {
    if (event.target && event.target.id === 'addQuoteButton') {
        addQuote();
    }
    if (event.target && event.target.id === 'exportQuotes') {
        exportQuotes();
    }
});

// Event listener for the 'Import File' input
document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Create the add quote form
createAddQuoteForm();
