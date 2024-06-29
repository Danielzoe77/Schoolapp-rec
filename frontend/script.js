


const form = document.getElementById('registerForm');


if (form) {
form.addEventListener('submit', handleFormSubmit);
function handleFormSubmit(event) {
event.preventDefault();
const formData = new FormData(form);
const userData = {
username: formData.get('registerUsername'),

email: formData.get('registerEmail'),
phone: formData.get('registerPhone'),
password: formData.get('registerPassword'),
};


// localStorage.setItem('admin', JSON.stringify(userData));
// console.log(localStorage.getItem('admin'))

fetch('https://skulrecbackendcod.onrender.com/api/users/register', {
method: 'POST',
body: JSON.stringify(userData),
headers: {
'Content-Type': 'application/json',
},
})
.then(response => response.json())
.then(data => {
  console.log(data);
if (data) {
alert('Registration successful! Please check your email for verification.');
window.location.href = 'login.html'; // Redirect to finance records page
} else {
alert('Registration failed. Please try again.');
}
})
.catch(error => {
console.error('Registration failed:', error);
alert('Registration failed. Please try again.');
});
}
}


const loginForm = document.getElementById('loginForm');

if (loginForm) {
loginForm.addEventListener('submit', handleLoginSubmit);

function handleLoginSubmit(event) {
event.preventDefault();

const email = document.getElementById('loginEmail').value;
const password = document.getElementById('loginPassword').value;

// Validate user input
if (!email || !password) {
alert('Please enter both email and password');
return;
}

const userData = { email, password };

fetch('https://skulrecbackendcod.onrender.com/api/users/login', {
method: 'POST',
body: JSON.stringify(userData),
headers: { 'Content-Type': 'application/json' },
})
.then(response => {
if (!response.ok) {
throw new Error('Network response was not ok');
}
return response.json();
})
.then(data => {
console.log(data);
if (data) {
  const token = data.token; // Assuming the backend returns the token in the response
        localStorage.setItem('token', token); // Store the token in local storage
alert('Login successful!');
window.location.href = 'financialrecords.html';
} else {
alert('Login failed. Please try again.');
}
})
.catch(error => {
console.error('Login failed:', error);
alert('Login failed. Please try again.');
});
}
}