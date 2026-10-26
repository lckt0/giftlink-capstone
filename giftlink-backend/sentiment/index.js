const natural = require('natural');
const express = require('express');

const router = express.Router();
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');
const tokenizer = new natural.WordTokenizer();

function analyze(sentence) {
  const score = analyzer.getSentiment(tokenizer.tokenize(sentence));
  let sentiment = 'neutral';
  if (score < 0) sentiment = 'negative';
  else if (score > 0.33) sentiment = 'positive';
  return { score, sentiment };
}

router.post('/', (req, res) => {
  const { sentence } = req.body || {};
  if (!sentence) return res.status(400).json({ error: 'No sentence provided' });
  const result = analyze(sentence);
  res.json({ sentimentScore: result.score, sentiment: result.sentiment });
});

module.exports = router;
module.exports.analyze = analyze;
