let currentEmail = '';
let currentPassword = '';

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    currentEmail = document.getElementById('email_login').value;
    currentPassword = document.getElementById('password_login').value;

    var data = {
        email: currentEmail,
        password: currentPassword
    };

    fetch(`https://${host}/api/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid username or password');
        }
        return response.json();
    })
    .then(data => {
        console.log('Initial Login Successful...');
        if (data.require_2fa) {
            showTwoFactorModal();
        } else {
            completeLoginProcess(data);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// function promptForTwoFactorCode(email, password) {
//     const twoFactorCode = prompt('Enter your two-factor authentication code:');
//     if (twoFactorCode) {
//         var data = {
//             email: email,
//             password: password,
//             '2fa_token': twoFactorCode
//         };
//         fetch('https://${host}/api/login/', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Invalid two-factor authentication code!');
//             }
//             return response.json();
//         })
//         .then(completeLoginProcess)
//         .catch((error) => {
//             console.log('Error Prompt2FA:', error);
//         });
//     }
// }

function showTwoFactorModal() {
    var modal = document.getElementById('twoFactorModal');
    var span = document.getElementsByClassName('close')[0];

    modal.style.display = 'block';

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = 'none';
        }
    }

    document.getElementById('submit2FACode').onclick = function() {
        const twoFactorCode = document.getElementById('twoFactorCode').value;
        if (twoFactorCode) {
            submitTwoFactorCode(twoFactorCode);
            modal.style.display = 'none';
        }
    }
}

function submitTwoFactorCode(twoFactorCode) {
    var data = {
        email: currentEmail,
        password: currentPassword,
        '2fa_token': twoFactorCode
    };
    fetch(`https://${host}/api/login/`, {
        method: 'POST',
        headers: {
            //'Authorization': 'Bearer ' + localStorage.getItem('access'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid two-factor authentication code!');
        }
        return response.json();
    })
    .then(completeLoginProcess)
    .catch((error) => {
        console.log('Error Prompt2FA:', error);
    });
}

function completeLoginProcess(data) {
    console.log('Login Completed!');
    document.getElementById('loginForm').reset();
    localStorage.setItem('access', data.access);

    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registrationForm').style.display = 'none';
    loadProfile();
}

// checkbox show password
document.getElementById('togglePasswordLogin').addEventListener('change', function(event) {
    const passwordInput = document.getElementById('password_login');
    if (event.target.checked) {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
});

function loadProfile() {
    const access = localStorage.getItem('access');
    fetch(`https://${host}/api/profile/`, {
        headers: {
            'Authorization': 'Bearer ' + access 
        }
    })
    .then(response => {
        if (!response.ok) {
            document.getElementById('loginForm').reset();
            throw new Error('Not authorized');
        }
        return response.json();
    })
    .then(profileData => {
        displayUserProfile(profileData);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}