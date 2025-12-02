const form = document.getElementById('form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const messageContainer = document.querySelector('.message-container');
const message = document.querySelector('.message');
const inputs = document.querySelectorAll('.input');

let isValid = false;
let passwordsMatch = false;

function validateForm() {

  // using Constraint API
  isValid = form.checkValidity();

  // console.log(inputs)

  if (!isValid) {
    message.textContent = 'Invalid input';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
  }

  if (passwordInput.value === confirmPasswordInput.value) {
    passwordsMatch = true;
    passwordInput.style.borderColor = 'green';
    confirmPasswordInput.style.borderColor = 'green';
  } else {
    passwordsMatch = false;
    message.textContent = 'Passwords do not match';
    message.style.color = 'red';
    messageContainer.style.borderColor = 'red';
    passwordInput.style.borderColor = 'red';
    confirmPasswordInput.style.borderColor = 'red';
  }

  if(isValid && passwordsMatch) {
    message.textContent = 'Successfully Registered';
    message.style.color = 'green';
    messageContainer.style.borderColor = 'green';
    inputs.forEach(input => {
      input.style.borderColor = 'green' ;
    })
  }
}


function processFormData(e) {
  e.preventDefault();
  validateForm();
}

// Event Listener

form.addEventListener('submit', processFormData)

