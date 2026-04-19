window.init_projects = async function() {
  const content = document.getElementById('content-projects');
  content.innerHTML = `
    <div style="padding: 20px;">
      <h2><i class="fa fa-folder-open"></i> Portfolio Projects</h2>
      <p style="color: #666; margin-bottom: 20px;">Fetching live data from GitHub (@guru22cseb37)...</p>
      <div id="github-projects-grid" class="projects-grid">
        <!-- Loader -->
        <div style="text-align:center; grid-column: 1 / -1; padding: 20px;">
           <i class="fa fa-spinner fa-spin fa-3x" style="color: #0078D7;"></i>
        </div>
      </div>
    </div>
  `;

  // Static highlight projects (from prompt)
  const highlightedProjects = [
    {
      name: "VIBE-OPS",
      description: "AI-Powered Bug Triage & Legacy Code Recovery System. Built a production-grade AI backend to analyze legacy logs, stack traces, and source code to identify root causes and generate safe fixes.",
      language: "Python",
      stargazers_count: 5,
      forks_count: 1,
      html_url: "https://github.com/guru22cseb37"
    },
    {
      name: "HireSight",
      description: "AI Recruitment Platform. Built AI-powered recruitment system with 80% candidate-job matching accuracy using NLP. Implemented blockchain-based credential verification.",
      language: "TypeScript",
      stargazers_count: 3,
      forks_count: 0,
      html_url: "https://github.com/guru22cseb37"
    },
    {
      name: "CRM System",
      description: "Full-Stack CRM System. Developed customer relationship management system using AI-assisted coding tools. Designed features similar to ERP modules.",
      language: "JavaScript",
      stargazers_count: 2,
      forks_count: 0,
      html_url: "https://github.com/guru22cseb37"
    }
  ];

  try {
    const res = await fetch('https://api.github.com/users/guru22cseb37/repos?sort=updated&per_page=6');
    if (res.ok) {
      const repos = await res.json();
      renderProjects(repos);
    } else {
      renderProjects(highlightedProjects);
    }
  } catch (err) {
    console.error("Failed to fetch github repos", err);
    renderProjects(highlightedProjects); // Fallback
  }

  function renderProjects(projects) {
    const grid = document.getElementById('github-projects-grid');
    grid.innerHTML = '';
    
    projects.forEach(repo => {
      grid.innerHTML += `
        <div class="project-card" onclick="window.open('${repo.html_url}', '_blank')">
          <div class="project-title"><i class="fa fa-book"></i> ${repo.name}</div>
          <div class="project-desc">${repo.description || 'No description available.'}</div>
          <div class="project-meta">
            ${repo.language ? `<span><i class="fa fa-circle" style="color:#0078D7"></i> ${repo.language}</span>` : ''}
            <span><i class="fa fa-star"></i> ${repo.stargazers_count || 0}</span>
            <span><i class="fa fa-code-branch"></i> ${repo.forks_count || 0}</span>
          </div>
        </div>
      `;
    });
  }
};
