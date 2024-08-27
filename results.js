const express = require('express');
const router = express.Router();
const Vote = require('./vote'); // Ensure this path is correct

router.get('/results', async (req, res) => {
  try {
    const results = await Vote.aggregate([
      { $project: { _id: 0, votes: { $objectToArray: '$votes' } } },
      { $unwind: '$votes' },
      { $group: { _id: '$votes.v', count: { $sum: 1 } } }
    ]);
    res.json(results);
  } catch (error) {
    console.error('Error fetching results:', error.message, error.stack);
    res.status(500).send('Error fetching results');
  }
});

module.exports = router;
