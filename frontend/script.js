// if (registerForm) {
//     registerForm.addEventListener('submit', function(event) {
//         event.preventDefault();
//         const username = document.getElementById('registerUsername').value;
//         const email = document.getElementById('registerEmail').value;
      
//         const phone = document.getElementById('registerPhone').value; // Get the phone number value
//         const password = document.getElementById('registerPassword').value;

//         localStorage.setItem('admin', JSON.stringify({ username, email, phone, password }));
//                    console.log(localStorage.getItem('admin'))})
//     }

    // const formData = (document.getElementById('registerForm'));
    // if (formData) {
    //     formData.addEventListener('submit', function(event) {
    //         event.preventDefault();
    //         const username = document.getElementById('registerUsername').value;
    //         const email = document.getElementById('registerEmail').value;
          
    //         const phone = document.getElementById('registerPhone').value; // Get the phone number value
    //         const password = document.getElementById('registerPassword').value;
    
    //         localStorage.setItem('admin', JSON.stringify({ username, email, phone, password }));
    //                    console.log(localStorage.getItem('admin'))})
    //     }
    // fetch('http://localhost:3000/api/users/register', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json())
    // .then(data => {
    //     if (data.success) {
    //         alert('Registration successful! Please check your email for verification.');
    //         window.location.href = 'finance.html'; // Redirect to finance records page
    //     } else {
    //         alert('Registration failed. Please try again.');
    //     }
    // })
    // .catch(error => {
    //     console.error('Registration failed:', error);
    //     alert('Registration failed. Please try again.');
    // });

        // Generate OTP and send to the provided phone number
//         generateOTP(phone)
//             .then(otp => {
//                 const enteredOTP = prompt('Please enter the OTP sent to your phone number:');

//                 if (enteredOTP === otp) {
//                     // Save user data after OTP verification is successful
//                     localStorage.setItem('admin', JSON.stringify({ username, email, phone, password }));
//                     console.log(localStorage.getItem('admin'))

//                     // Generate a token and save it
//                     const token = 'admin-token'; // Simplified token generation
//                     localStorage.setItem('token', token);

//                     alert('Registration successful! Please check your email for verification.');
//                     window.location.href = 'finance.html'; // Redirect to finance records page
//                 } else {
//                     alert('Invalid OTP. Please try again.');
//                 }
//             })
//             .catch(error => {
//                 console.error('OTP generation failed:', error);
//                 alert('OTP generation failed. Please try again.');
//             });
//     });
// }


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
console.log(userData)

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