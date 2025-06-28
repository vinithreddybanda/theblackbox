const express = require('express');
const app = express();
app.use(express.json());

// POST /data
app.post('/data', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'string') {
    const encoded = Buffer.from(value).toString('base64');
    res.json({ result: encoded });
  } else {
    res.status(400).json({ error: 'value must be a string' });
  }
});

// GET /time
const START_VALUE = 8169767;
const REFERENCE_TIMESTAMP = 1751100000; // Set this to the Unix timestamp when you first saw 8169767
app.get('/time', (req, res) => {
  const now = Math.floor(Date.now() / 1000);
  const elapsed = now - REFERENCE_TIMESTAMP;
  const result = Math.max(0, START_VALUE - elapsed);
  res.json({ result });
});

// POST /fizzbuzz
app.post('/fizzbuzz', (req, res) => {
  res.json({ result: false });
});

// POST /zap
app.post('/zap', (req, res) => {
  const { value } = req.body;
  res.json({ result: value });
});

// POST /alpha
app.post('/alpha', (req, res) => {
  const { value } = req.body;
  // Only true if value is a string, contains at least one letter, and contains no digits
  if (typeof value === 'string' && /[a-zA-Z]/.test(value) && !/\d/.test(value)) {
    res.json({ result: true });
  } else {
    res.json({ result: false });
  }
});

// POST /glitch
app.post('/glitch', (req, res) => {
  const { value } = req.body;
  if (typeof value === 'string') {
    res.json({ result: value.split('').reverse().join('') });
  } else {
    res.json({ result: value });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Black Box Challenge API listening on port ${PORT}`);
});
