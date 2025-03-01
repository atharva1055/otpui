let generatedOTP = '';

function validateCredentials() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (password === 'admin' && validateEmail(email)) {
        // Make an API call to send OTP
        fetch('http://localhost:3000/send-otp', { // Use the correct URL of your backend server
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, name }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                generatedOTP = data.otp;
                document.getElementById('loginContainer').style.display = 'none';
                document.getElementById('otpContainer').style.display = 'block';
            } else {
                alert('Failed to send OTP. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to send OTP. Please try again.');
        });
    } else {
        alert('Invalid credentials or email format. Please try again.');
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateOTP() {
    const otp = document.getElementById('otp').value;
    if (otp === generatedOTP) {
        document.getElementById('otpContainer').style.display = 'none';
        document.getElementById('adminPanel').style.display = 'block';
    } else {
        alert('Invalid OTP. Please try again.');
    }
}

function addUser() {
    alert('User added');
}

function deleteUser() {
    alert('User deleted');
}

function updateUser() {
    alert('User updated');
}

function logout() {
    document.getElementById('loginContainer').style.display = 'block';
    document.getElementById('otpContainer').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'none';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    document.getElementById('otp').value = '';
    document.getElementById('name').value = '';
}
