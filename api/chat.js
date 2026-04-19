module.exports = async (req, res) => {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const GROQ_API_KEY = process.env.GROQ_API_KEY;

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'Groq API Key not configured in Vercel environment' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are the AI assistant for Guru Prasad C, a Computer Science Engineer specializing in AI-assisted software development, debugging, and rapid delivery. Answer questions concisely and professionally based on his resume: Studies at Velammal College, CGPA 7.21, skills in Python, FastAPI, React, Node, AI tools (Copilot, Cursor). Projects: VIBE-OPS (AI bug triage), HireSight (AI recruitment), CRM. Be polite, enthusiastic, and try to convince recruiters to hire him. Limit answers to 2-3 short sentences."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
