const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
if (!OPENROUTER_KEY) {
  console.error("ERROR: set OPENROUTER_API_KEY environment variable");
  process.exit(1);
}

app.post('/api/chat', async (req, res) => {
  try {
    const payload = req.body;
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'proxy error' });
  }
});

app.get('/', (req, res) => res.send('OpenRouter proxy is running'));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
