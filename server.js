const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sgMail = require('@sendgrid/mail');
const path = require('path');
const cors = require('cors');



// Load environment variables from .env file
dotenv.config();

// Set up SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS with specific origin
app.use(cors({
    origin: 'https://otpui.vercel.app', // Replace with your frontend URL
    methods: 'GET,POST',
    credentials: true
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to send OTP
app.post('/send-otp', (req, res) => {
    const { email, name } = req.body;
    const otp = generateOTP();

    const msg = {
        to: email,
        from: 'cyatharva@gmail.com', // Replace with your verified sender email
        subject: 'Your OTP for Login',
        text: `Hi Dr. ${name}, Here's your Security code for access to Tumour Detection System: ${otp}`,
    };

    sgMail.send(msg)
        .then(() => {
            res.json({ success: true, otp });
        })
        .catch((error) => {
            console.error('Error sending OTP:', error);
            if (error.response) {
                console.error('Response details:', error.response.body);
            }
            res.status(500).json({ success: false, error: 'Failed to send OTP' });
        });
});

// Function to generate OTP
function generateOTP() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
