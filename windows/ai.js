window.openAIAssistant = function() {
  openWindow('ai');
  document.getElementById('ai-assistant-widget').style.display = 'none';
};

window.init_ai = function() {
  const content = document.getElementById('content-ai');
  content.innerHTML = `
    <div class="ai-chat-container">
      <div class="ai-chat-messages" id="ai-messages">
        <div class="chat-msg chat-bot">Hello! I'm Guru Prasad's AI Assistant. You can ask me anything about his resume, projects, or skills!</div>
      </div>
      <div class="ai-chat-input">
        <input type="text" id="ai-input" placeholder="Ask a question..." onkeydown="if(event.key==='Enter') sendAIMessage()" />
        <button onclick="sendAIMessage()">Send</button>
      </div>
    </div>
  `;
};

window.sendAIMessage = async function() {
  const input = document.getElementById('ai-input');
  const text = input.value.trim();
  if (!text) return;
  
  const msgs = document.getElementById('ai-messages');
  msgs.innerHTML += `<div class="chat-msg chat-user">${text}</div>`;
  input.value = '';
  msgs.scrollTop = msgs.scrollHeight;
  
  const loaderId = 'loader-' + Date.now();
  msgs.innerHTML += `<div class="chat-msg chat-bot" id="${loaderId}"><i class="fa fa-spinner fa-spin"></i> Thinking...</div>`;
  msgs.scrollTop = msgs.scrollHeight;
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${window.GROQ_API_KEY}`,
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
            content: text
          }
        ]
      })
    });
    
    const data = await response.json();
    document.getElementById(loaderId).remove();
    
    if (data.choices && data.choices[0]) {
      msgs.innerHTML += `<div class="chat-msg chat-bot">${data.choices[0].message.content}</div>`;
    } else {
      const errMsg = data.error ? data.error.message : "Sorry, I couldn't process that right now.";
      msgs.innerHTML += `<div class="chat-msg chat-bot" style="color:red">${errMsg}</div>`;
      console.error("API Error:", data);
    }
  } catch (err) {
    document.getElementById(loaderId).remove();
    msgs.innerHTML += `<div class="chat-msg chat-bot" style="color:red">Error connecting to AI. Please try again later.</div>`;
    console.error(err);
  }
  
  msgs.scrollTop = msgs.scrollHeight;
};

// Also update the window map in app.js slightly for the title
if (!window.titleMap) window.titleMap = {};
window.titleMap['ai'] = 'AI Assistant';
window.iconMap = window.iconMap || {};
window.iconMap['ai'] = 'fa-robot';
