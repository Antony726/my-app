const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://alexantony726:A48woNKMaDMGJU60@kira.24umo.mongodb.net/voting', {
  // Remove deprecated options
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Import routes
const resultsRoute = require('./results');
const Vote = require('./vote'); // Ensure this path is correct

app.use('/api', resultsRoute);

// Route to submit votes
app.post('/api/vote', async (req, res) => {
  try {
    const { voterId, votes } = req.body;

    // Check if the voter ID has already voted
    const existingVote = await Vote.findOne({ voterId });
    if (existingVote) {
      return res.status(400).send('You have already voted!');
    }

    const newVote = new Vote({ voterId, votes });
    await newVote.save();
    res.status(201).send('Vote recorded'); // Corrected the logging here
  } catch (error) {
    console.error('Error recording vote:', error.message, error.stack);
    res.status(400).send('Error recording vote');
  }
});

// Route to check if a voter ID has already voted
app.get('/api/vote/:voterId', async (req, res) => {
  const { voterId } = req.params;
  try {
    const existingVote = await Vote.findOne({ voterId });
    if (existingVote) {
      res.json({ hasVoted: true });
    } else {
      res.json({ hasVoted: false });
    }
  } catch (error) {
    console.error('Error checking voter ID:', error.message, error.stack);
    res.status(500).send('Error checking voter ID');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
