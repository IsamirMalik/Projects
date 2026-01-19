# Expense Tracker

## Project Overview

The **Expense Tracker** is a simple yet powerful web application designed to help users manage their personal finances. It allows users to track income and expenses in real-time, calculate their current balance, and maintain a complete history of all transactions. The application uses local storage to persist data, ensuring that user transactions are saved even after the browser is closed.

---

## Features

### 1. **Balance Management**
- Displays the current balance in Indian Rupees (₹)
- Automatically calculates the total balance based on all transactions
- Updates in real-time as new transactions are added or removed

### 2. **Income and Expense Tracking**
- **Income**: Displays total positive transactions (deposits)
- **Expense**: Displays total negative transactions (expenses)
- Clear separation of income and expenses for better financial insights
- Visual indicators with + and - symbols

### 3. **Add New Transactions**
- User-friendly form to add new transactions
- Input field for transaction description (Text)
- Input field for transaction amount (Number)
- Simple usage instructions:
  - Use negative sign (-) for expenses
  - Use positive sign (+) for income/deposits
- Submit button to add transactions to the list

### 4. **Transaction History**
- Displays a complete list of all transactions
- Shows transaction description and amount
- Color-coded display:
  - **Green**: Income transactions (positive amounts)
  - **Red**: Expense transactions (negative amounts)

### 5. **Delete Transactions**
- Each transaction has a delete button (X)
- Remove any transaction from the list with a single click
- Automatically updates balance and totals after deletion

### 6. **Local Storage Integration**
- All transactions are saved to browser's local storage
- Data persists even after closing the browser
- Automatic save on every transaction addition or removal
- No data loss between sessions

### 7. **Responsive Design**
- Beautiful gradient background with overlay effect
- Professional blue color scheme (Primary: #2a2a72, Secondary: #009ffd)
- Modern typography with Poppins font family
- Smooth shadows and visual effects
- Responsive layout that works on different screen sizes

---

## Technologies Used

### Frontend
- **HTML5**: Structure and layout of the application
- **CSS3**: Styling and responsive design
- **JavaScript**: Core functionality and DOM manipulation

### Storage
- **Local Storage API**: For persistent data storage

### Design Elements
- **Google Fonts**: Poppins, ABeeZee, and Saira fonts
- **Unsplash**: Background image for visual appeal

---

## File Structure

```
expense-tracker/
├── index.html       # Main HTML structure
├── script.js        # JavaScript logic and functionality
├── styles.css       # CSS styling and layout
└── Readme.md        # Project documentation
```

---

## How to Use

### Getting Started
1. Open the `index.html` file in any modern web browser
2. The application will load with an initial balance of ₹0.00

### Adding a Transaction
1. Locate the "Add new transaction" form
2. Enter a description in the "Text" field (e.g., "Salary", "Groceries")
3. Enter an amount in the "Amount" field:
   - For income: Enter positive number (e.g., `5000`)
   - For expense: Enter negative number (e.g., `-500`)
4. Click the "Add transaction" button

### Viewing Transactions
- All transactions appear in the "History" section below the form
- Green items represent income (deposits)
- Red items represent expenses
- The balance updates automatically

### Deleting a Transaction
- Click the "X" button next to any transaction to delete it
- The balance and totals update immediately
- The transaction is removed from local storage

### Data Persistence
- All transactions are automatically saved to local storage
- Refresh the page - your data will remain
- Close and reopen the browser - your transactions will still be there
- Clear browser data/cache to reset all transactions

---

## Technical Details

### JavaScript Functions

#### `updateLocalStorage()`
- Saves all transactions to the browser's local storage
- Called after every transaction addition or deletion

#### `addTransactionsToDOM(transaction)`
- Creates a new list item for the transaction
- Applies color styling based on transaction type (income/expense)
- Adds delete button for removal

#### `updateValues()`
- Calculates the total balance
- Calculates total income
- Calculates total expenses
- Updates the display with these values

#### `initialize()`
- Loads all transactions from storage on page load
- Populates the transaction history list
- Updates balance and totals

#### `addTransaction(e)`
- Handles form submission
- Validates input fields
- Creates transaction object with unique ID (timestamp)
- Adds transaction to the list and storage

#### `removeTransaction(id)`
- Deletes transaction by ID
- Updates local storage
- Refreshes the display

---

## Color Scheme

- **Primary Background**: `#2a2a72` (Dark Blue)
- **Secondary Color**: `#009ffd` (Bright Blue)
- **Income (Plus)**: Green highlighting
- **Expense (Minus)**: Red highlighting
- **Text Color**: Whitesmoke
- **Overlay Opacity**: 70% (Dark overlay on background image)

