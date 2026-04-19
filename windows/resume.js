window.init_resume = function() {
  const content = document.getElementById('content-resume');
  content.innerHTML = `
    <div class="resume-container">
      <div class="resume-header">
        <h1>GURU PRASAD C</h1>
        <p>Madurai, Tamil Nadu, India | +91 9345090158 | cguru2005@gmail.com</p>
        <p>
          <a href="https://github.com/guru22cseb37" target="_blank">GitHub</a> | 
          <a href="https://www.linkedin.com/in/guru-prasad-81ba992ab" target="_blank">LinkedIn</a>
        </p>
      </div>
      
      <div class="resume-section">
        <h2>SUMMARY</h2>
        <p>Computer Science Engineer specializing in AI-assisted software development, debugging, and rapid delivery across enterprise applications. Experienced in using AI tools (ChatGPT, Claude, Cursor, GitHub Copilot) to analyze bugs, optimize performance, and adapt quickly to new and legacy codebases. Strong in Python and capable of working across Java and full-stack systems using AI-driven workflows.</p>
      </div>

      <div class="resume-section">
        <h2>EDUCATION</h2>
        <div class="resume-item">
          <div class="resume-item-header">
            <span>Bachelor of Engineering in Computer Science and Engineering</span>
            <span>2022 – 2026</span>
          </div>
          <div>Velammal College of Engineering and Technology, Madurai, Tamil Nadu</div>
          <div>CGPA: 7.21/10.0 (7 Semesters Completed)</div>
          <div><em>Relevant Coursework: Data Structures, Machine Learning, AI, DBMS, Computer Networks, Cryptography</em></div>
        </div>
      </div>

      <div class="resume-section">
        <h2>EXPERIENCE</h2>
        
        <div class="resume-item">
          <div class="resume-item-header">
            <span>AI Developer | PaperX (Startup Project)</span>
            <span>2025 – Present</span>
          </div>
          <ul>
            <li>Engineered AI-driven workflows using ChatGPT and Claude to automate generation of complex research papers and precision LaTeX code</li>
            <li>Utilized AI workflows to synthesize raw data into formatted LaTeX documents, reducing manual drafting time by 70%</li>
            <li>Delivered 7+ technical research projects by orchestrating AI tools for content synthesis, code validation, and document compilation</li>
            <li>Developed full-stack CRM system with AI-assisted development for client operations</li>
          </ul>
        </div>

        <div class="resume-item">
          <div class="resume-item-header">
            <span>Full Stack Developer Intern | Futurik Technologies, Madurai</span>
            <span>June 2024 – July 2024</span>
          </div>
          <ul>
            <li>Developed responsive e-commerce application using HTML5, CSS3, JavaScript, and Bootstrap</li>
            <li>Optimized performance achieving 25% faster load times through code refactoring</li>
            <li>Used Git and GitHub for version control and team collaboration</li>
          </ul>
        </div>

        <div class="resume-item">
          <div class="resume-item-header">
            <span>Data Science Intern | Exposys Data Labs, Bangalore (Remote)</span>
            <span>Dec 2023 – Jan 2024</span>
          </div>
          <ul>
            <li>Applied ML algorithms for predictive analytics on 10,000+ record datasets achieving 85% accuracy</li>
            <li>Developed data preprocessing pipelines using Scikit-learn, Pandas, and NumPy</li>
          </ul>
        </div>
      </div>

      <div class="resume-section">
        <h2>TECHNICAL SKILLS</h2>
        <ul>
          <li><strong>Programming Languages:</strong> Python (Strong), FastAPI; Java, .NET (Basics)</li>
          <li><strong>AI & LLMs:</strong> Gemini Pro, ChatGPT, Claude, NLP, Prompt Engineering</li>
          <li><strong>AI Dev Tools:</strong> GitHub Copilot, Cursor, Replit</li>
          <li><strong>Tools & Platforms:</strong> Git, GitHub, VS Code, Jupyter Notebook, MySQL, Android Studio</li>
          <li><strong>Development:</strong> API Integration, Automation, Debugging, Code Refactoring</li>
        </ul>
      </div>

      <div class="resume-section">
        <h2>CERTIFICATIONS</h2>
        <p>IBM Python101 (Coursera) | Python & MySQL (GUVI IIT Madras) | Cisco Networking | Social Networks (NPTEL)</p>
      </div>
    </div>
  `;
};
