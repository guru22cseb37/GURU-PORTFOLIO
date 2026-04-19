window.init_github = async function() {
  const content = document.getElementById('content-github');
  content.innerHTML = `
    <div class="github-container" id="gh-wrapper">
      <div style="text-align:center; padding: 50px;">
        <i class="fa fa-spinner fa-spin fa-3x" style="color: #0078D7;"></i>
        <p>Loading GitHub Profile...</p>
      </div>
    </div>
  `;

  try {
    const res = await fetch('https://api.github.com/users/guru22cseb37');
    if (res.ok) {
      const data = await res.json();
      document.getElementById('gh-wrapper').innerHTML = `
        <div class="github-profile">
          <img src="${data.avatar_url}" alt="Avatar" class="github-avatar" />
          <div>
            <h2>${data.name || data.login}</h2>
            <p><a href="${data.html_url}" target="_blank">@${data.login}</a></p>
            <p>${data.bio || 'AI Developer & Full Stack Engineer'}</p>
          </div>
        </div>
        <div class="github-stats">
          <div class="stat-box">
            <div class="stat-value">${data.public_repos}</div>
            <div>Repositories</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${data.followers}</div>
            <div>Followers</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${data.following}</div>
            <div>Following</div>
          </div>
        </div>
        <h3 style="margin-top: 20px;">GitHub Activity</h3>
        <p style="color: #666; margin-top: 10px;">Check out my repositories in the Projects folder or click my handle above to view my full GitHub profile.</p>
      `;
    }
  } catch(e) {
    document.getElementById('gh-wrapper').innerHTML = `<p style="color:red">Failed to load GitHub data.</p>`;
  }
};
