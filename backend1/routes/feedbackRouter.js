const express = require('express');
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController');

const router = express.Router();

// Route to create feedback
router.post('/create', createFeedback);

// Route to get all feedback
router.get('/', getFeedbacks);

module.exports = router;
