// routes/emailRoutes.js
const express = require('express');
const { fetchReceivedEmails, fetchSentEmails, sendEmail } = require('../controllers/emailController');

const router = express.Router();

router.get('/received', async (req, res) => {
    try {
        const receivedEmails = await fetchReceivedEmails();
        res.json(receivedEmails);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching received emails', error });
    }
});

router.get('/sent', async (req, res) => {
    try {
        const sentEmails = await fetchSentEmails();
        res.json(sentEmails);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sent emails', error });
    }
});

router.post('/send', async (req, res) => {
    try {
        await sendEmail(req, res);
    } catch (error) {
        res.status(500).json({ message: 'Error sending email', error });
    }
});

module.exports = router;