
const balance = document.querySelector('.balance');
const moneyDeposit = document.querySelector('#money-plus');
const moneySpent = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const text = document.querySelector('#text');
const amount = document.querySelector('#amount');
const remove = document.querySelectorAll('.item');


// const dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 },
// ];

let localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorageTransactions ?? [];
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
};

function addTransactionsToDOM(transactions) {

  let sign = transactions.amount > 0 ? '+' : '-';

  let item = document.createElement('li');

  item.classList.add(sign === '+' ? 'plus' : 'minus', 'item');

  item.innerHTML = `
  ${transactions.text}<span>${sign}${Math.abs(transactions.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${transactions.id})">X</button>
  `;
  list.appendChild(item);
  // console.log(item)
};

function updateValues() {

  let amount = transactions.map(transaction => transaction.amount);

  let total = amount.reduce((acc, item) => acc += item, 0).toFixed(2);

  let income = amount
    .filter((item) => item > 0)
    .reduce((acc, item) => acc += item, 0).toFixed(2);


  let expense = amount
    .filter((item) => item < 0)
    .reduce((acc, item) => acc += item, 0).toFixed(2);

  balance.innerText = `₹${total}`;
  moneyDeposit.innerText = `₹${income}`;
  moneySpent.innerText = `₹${expense}`;

  // console.log(total, income, expense)
};

function initialize() {
  list.innerHTML = '';

  transactions.forEach(addTransactionsToDOM);
  updateValues(transactions);
};

function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
    return
  };

  let transaction = {
    id: Date.now(),
    text: text.value,
    amount: +amount.value
  };

  transactions.push(transaction);

  addTransactionsToDOM(transaction);
  updateValues();

  updateLocalStorage();

  text.value = '';
  amount.value = '';

  initialize()
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  initialize();

}
console.log(remove);

// remove.addEventListener('click', removeTransaction);

form.addEventListener('submit', addTransaction);



initialize();