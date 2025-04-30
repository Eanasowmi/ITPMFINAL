const express = require('express');
const router = express.Router();
const Vote = require('../models/votes');

// Get all votes
router.get('/g', async (req, res) => {
  try {
    const votes = await Vote.find();
    res.json(votes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Vote for a design
router.post('/v', async (req, res) => {
  const { imageURL } = req.body;
  try {
    let vote = await Vote.findOne({ imageURL });
    if (!vote) {
      vote = new Vote({ imageURL, votes: 1 });
    } else {
      vote.votes += 1;
    }
    await vote.save();
    res.json(vote);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
