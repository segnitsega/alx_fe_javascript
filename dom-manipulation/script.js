// Initial array of quotes, loading from local storage if available
let quotes = JSON.parse(localStorage.getItem('quotes')) || [
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", category: "Inspirational" },
    { text: "The way to get started is to quit talking and begin doing.", category: "Motivational" },
    { text: "Your time is limited, so don't waste it living someone else's life.", category: "Life" },
];

// Load quotes and filter on page load
document.addEventListener('DOMContentLoaded', () => {
    populateCategories();
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    document.getElementById('categoryFilter').value = savedCategory;
    filterQuotes(); // Show quotes based on the saved category
});

// Function to populate the category filter dropdown
function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    const categories = new Set(quotes.map(q => q.category));
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

// Function to display quotes based on the selected category
function filterQuotes() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    localStorage.setItem('selectedCategory', selectedCategory); // Save selected category

    const filteredQuotes = selectedCategory === 'all'
        ? quotes
        : quotes.filter(q => q.category === selectedCategory);

    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const quote = filteredQuotes[randomIndex];
    const quoteDisplay = document.getElementById('quoteDisplay');
    
    if (quote) {
        quoteDisplay.innerHTML = `<p>"${quote.text}" - <em>${quote.category}</em></p>`;
    } else {
        quoteDisplay.innerHTML = 'No quotes available for this category.';
    }
}

// Function to create the form to add new quotes
function createAddQuoteForm() {
    const formDiv = document.createElement('div');
    formDiv.classList.add('quote-form');
    
    const quoteInput = document.createElement('input');
    quoteInput.id = 'newQuoteText';
    quoteInput.type = 'text';
    quoteInput.placeholder = 'Enter a new quote';
    
    const categoryInput = document.createElement('input');
    categoryInput.id = 'newQuoteCategory';
    categoryInput.type = 'text';
    categoryInput.placeholder = 'Enter quote category';
    
    const addButton = document.createElement('button');
    addButton.id = 'addQuoteButton';
    addButton.textContent = 'Add Quote';
    
    const exportButton = document.createElement('button');
    exportButton.id = 'exportQuotes';
    exportButton.textContent = 'Export Quotes';
    
    const importInput = document.createElement('input');
    importInput.id = 'importFile';
    importInput.type = 'file';
    importInput.accept = '.json';
    
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);
    formDiv.appendChild(exportButton);
    formDiv.appendChild(importInput);
    
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
        populateCategories(); // Update category dropdown
        filterQuotes(); // Show filtered quotes
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
        populateCategories(); // Update category dropdown
        filterQuotes(); // Show filtered quotes
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}

// Event listener for the 'Show New Quote' button
document.getElementById('newQuote').addEventListener('click', filterQuotes);

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
