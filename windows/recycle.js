window.init_recycle = function() {
  const content = document.getElementById('content-recycle');
  content.innerHTML = `
    <div style="padding: 20px; text-align: center; color: #666; font-family: 'Segoe UI', sans-serif;">
      <i class="fa fa-folder-open fa-4x" style="color: #ccc; margin-bottom: 20px; margin-top: 50px;"></i>
      <h3>This folder is empty.</h3>
    </div>
  `;
};
