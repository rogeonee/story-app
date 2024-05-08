const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(bodyParser.json());

// Story storage
let lastSentence = "";
let fullStory = [];

// Send a new sentence
app.post('/api/submit-sentence', (req, res) => {
  const { sentence } = req.body;
  if (sentence.length > 25) {
    return res.status(400).json({ message: "Sentence must be 25 characters or less." });
  }
  
  lastSentence = sentence;
  fullStory.push(sentence);
  
  res.json({ lastSentence, fullStory });
});

// Get an existing story and the last sentence
app.get('/api/last-sentence', (req, res) => {
    console.log('Last Sentence:', lastSentence);
    console.log('Full Story:', fullStory);
    res.json({ lastSentence, fullStory });
});

// Delete history and start over
app.post('/api/reset-story', (req, res) => {
    lastSentence = "";
    fullStory = [];
    res.status(200).send({ message: "Story has been reset." });
});  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
