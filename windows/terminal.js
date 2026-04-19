window.init_terminal = function() {
  const content = document.getElementById('content-terminal');
  content.innerHTML = `
    <div class="terminal-container" id="term-container" onclick="document.getElementById('term-input').focus()">
      <div id="term-output" class="terminal-output">Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

Type 'help' for a list of available commands.
      </div>
      <div class="terminal-input-line">
        <span class="terminal-prompt">C:\\Users\\Guru&gt;</span>
        <input type="text" id="term-input" class="terminal-input" autocomplete="off" spellcheck="false" />
      </div>
    </div>
  `;

  const input = document.getElementById('term-input');
  const output = document.getElementById('term-output');
  const container = document.getElementById('term-container');

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const cmd = this.value.trim();
      this.value = '';
      
      let res = '';
      const cCmd = cmd.toLowerCase();
      
      if (cCmd === 'help') {
        res = "Available commands:\n  whoami   - Display user information\n  skills   - List technical skills\n  projects - Show top projects\n  clear    - Clear terminal\n  echo     - Print text\n  date     - Show current date";
      } else if (cCmd === 'whoami') {
        res = "Guru Prasad C\nAI Developer & Full Stack Engineer\nLocation: Madurai, India";
      } else if (cCmd === 'skills') {
        res = "Python, FastAPI, Java, Gemini Pro, ChatGPT, Cursor, Copilot, SQL, Git.";
      } else if (cCmd === 'projects') {
        res = "1. VIBE-OPS: AI-Powered Bug Triage\n2. HireSight: AI Recruitment Platform\n3. CRM System";
      } else if (cCmd === 'clear' || cCmd === 'cls') {
        output.innerHTML = '';
        return;
      } else if (cCmd === 'rm -rf /' || cCmd === 'crash' || cCmd === 'sudo halt') {
        triggerBSOD();
        return;
      } else if (cCmd.startsWith('echo ')) {
        res = cmd.substring(5);
      } else if (cCmd === 'date') {
        res = new Date().toString();
      } else if (cmd !== '') {
        res = `'${cmd}' is not recognized as an internal or external command,\noperable program or batch file.`;
      }
      
      if (cmd !== '') {
        output.innerHTML += `\n<span style="color:#0f0">C:\\Users\\Guru&gt;</span> ${cmd}\n${res}\n`;
      } else {
        output.innerHTML += `\n<span style="color:#0f0">C:\\Users\\Guru&gt;</span>\n`;
      }
      
      container.scrollTop = container.scrollHeight;
    }
  });
  
  // Make terminal background black explicitly in inline styles for safety
  container.style.backgroundColor = 'black';
  container.style.color = 'white';
};
