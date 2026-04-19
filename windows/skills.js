window.init_skills = function() {
  const content = document.getElementById('content-skills');
  content.innerHTML = `
    <div style="padding: 20px; font-family: 'Segoe UI', sans-serif;">
      <h2 style="color: #0078D7; border-bottom: 2px solid #0078D7; padding-bottom: 5px; margin-bottom: 15px;">
        <i class="fa fa-code"></i> Technical Skills
      </h2>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
        <div>
          <h3 style="color: #333; margin-bottom: 10px;">Programming Languages</h3>
          <ul style="list-style-type: square; padding-left: 20px; line-height: 1.8;">
            <li><strong>Python</strong> (Strong)</li>
            <li><strong>Java</strong> (Basics)</li>
            <li><strong>.NET</strong> (Basics)</li>
            <li><strong>JavaScript / TypeScript</strong></li>
            <li><strong>HTML5 / CSS3</strong></li>
          </ul>
        </div>
        
        <div>
          <h3 style="color: #333; margin-bottom: 10px;">AI & LLMs</h3>
          <ul style="list-style-type: square; padding-left: 20px; line-height: 1.8;">
            <li><strong>Gemini Pro</strong></li>
            <li><strong>ChatGPT / Claude</strong></li>
            <li><strong>NLP</strong></li>
            <li><strong>Prompt Engineering</strong></li>
          </ul>
        </div>
        
        <div>
          <h3 style="color: #333; margin-bottom: 10px;">AI Dev Tools</h3>
          <ul style="list-style-type: square; padding-left: 20px; line-height: 1.8;">
            <li><strong>GitHub Copilot</strong></li>
            <li><strong>Cursor</strong></li>
            <li><strong>Replit</strong></li>
            <li><strong>Lovable</strong></li>
          </ul>
        </div>

        <div>
          <h3 style="color: #333; margin-bottom: 10px;">Tools & Platforms</h3>
          <ul style="list-style-type: square; padding-left: 20px; line-height: 1.8;">
            <li><strong>Git / GitHub</strong></li>
            <li><strong>VS Code</strong></li>
            <li><strong>Jupyter Notebook</strong></li>
            <li><strong>MySQL</strong></li>
            <li><strong>Android Studio</strong></li>
          </ul>
        </div>
        
        <div style="grid-column: 1 / -1;">
          <h3 style="color: #333; margin-bottom: 10px;">Development Skills</h3>
          <p style="background: #f0f0f0; padding: 10px; border-left: 4px solid #0078D7; border-radius: 3px;">
            API Integration, Automation, Debugging, Code Refactoring, Fast API development, Full-stack Web Development, Machine Learning model implementation.
          </p>
        </div>
      </div>
    </div>
  `;
};
