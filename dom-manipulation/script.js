// Initial array of quotes, loading from local storage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivational" },
    { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" },
];

const serverUrl = 'https://jsonplaceholder.typicode.com/posts'; // Simulated server endpoint

document.addEventListener('DOMContentLoaded', () => {
    showRandomQuote(); // Show a random quote on page load
    populateCategoryFilter(); // Populate category filter on page load
    syncWithServer(); // Start periodic syncing with server
});

// Function to display a random quote
function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    quoteDisplay.innerHTML = `<p>"${quote.text}" - <em>${quote.category}</em></p>`;
    saveQuotes(); // Save quotes to local storage whenever a new quote is displayed
}

// Function to populate the category filter
function populateCategoryFilter() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(quote => quote.category));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to filter quotes based on selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    if (selectedCategory === 'all') {
        showRandomQuote();
    } else {
        const filteredQuotes = quotes.filter(quote => quote.category === selectedCategory);
        if (filteredQuotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            const quote = filteredQuotes[randomIndex];
            const quoteDisplay = document.getElementById('quoteDisplay');
            quoteDisplay.innerHTML = `<p>"${quote.text}" - <em>${quote.category}</em></p>`;
        } else {
            document.getElementById('quoteDisplay').innerHTML = 'No quotes available for this category.';
        }
    }
}

// Function to add a new quote
function addQuote() {
    const newQuoteText = document.getElementById('newQuoteText').value;
    const newQuoteCategory = document.getElementById('newQuoteCategory').value;

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes(); // Save to local storage
        updateCategoryFilter(newQuoteCategory); // Update category filter
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
        populateCategoryFilter(); // Update category filter with imported categories
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Function to sync with server
function syncWithServer() {
    setInterval(async () => {
        try {
            const response = await fetch(serverUrl);
            const serverData = await response.json();

            // Assume serverData is in the format [{text: ..., category: ...}]
            const serverQuotes = serverData.map(item => ({ text: item.title, category: item.body }));
            
            // Simple conflict resolution: server data takes precedence
            if (JSON.stringify(quotes) !== JSON.stringify(serverQuotes)) {
                quotes = serverQuotes;
                saveQuotes();
                showRandomQuote();
                updateCategoryFilter(); // Update category filter with server data
                displaySyncStatus('Data updated from server.');
            }
        } catch (error) {
            displaySyncStatus('Error syncing with server.', true);
        }
    }, 60000); // Sync every minute
}

// Function to display sync status
function displaySyncStatus(message, isError = false) {
    const syncStatus = document.getElementById('syncStatus');
    syncStatus.textContent = message;
    syncStatus.className = isError ? 'error' : '';
}

// Function to update category filter with new categories
function updateCategoryFilter(newCategory = null) {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(quote => quote.category));

    // Add new categories to filter
    categories.forEach(category => {
        if (![...categoryFilter.options].some(option => option.value === category)) {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        }
    });

    // Set selected category to newCategory if provided
    if (newCategory) {
        categoryFilter.value = newCategory;
    }
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

// Event listener for category filter
document.getElementById('categoryFilter').addEventListener('change', filterQuotes);

// Create the add quote form and initialize category filter
createAddQuoteForm();
populateCategoryFilter();
