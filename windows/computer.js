window.init_computer = function() {
  const content = document.getElementById('content-computer');
  content.innerHTML = `
    <div class="computer-container">
      <div class="computer-sidebar">
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 5px; cursor: pointer; color: #0078d7;"><i class="fa fa-star"></i> Favorites</li>
          <li style="padding: 5px; cursor: pointer; margin-left: 15px;"><i class="fa fa-download"></i> Downloads</li>
          <li style="padding: 5px; cursor: pointer; margin-left: 15px;"><i class="fa fa-desktop"></i> Desktop</li>
          <li style="padding: 5px; cursor: pointer; margin-left: 15px;"><i class="fa fa-clock"></i> Recent Places</li>
          <li style="padding: 5px; cursor: pointer; margin-top: 10px; font-weight: bold;"><i class="fa fa-desktop"></i> Computer</li>
          <li style="padding: 5px; cursor: pointer; margin-left: 15px;"><i class="fa fa-hdd"></i> Local Disk (C:)</li>
        </ul>
      </div>
      <div class="computer-content">
        <h3 style="color: #003399; font-weight: normal; border-bottom: 1px solid #cce8ff; padding-bottom: 5px; margin-bottom: 15px;">Hard Disk Drives (1)</h3>
        
        <div class="drive-item">
          <i class="fa fa-hdd drive-icon"></i>
          <div class="drive-info">
            <div class="drive-name">Local Disk (C:)</div>
            <div class="drive-bar-bg">
              <div class="drive-bar-fill warning" style="width: 85%;"></div>
            </div>
            <div class="drive-text">14.2 GB free of 100 GB</div>
          </div>
        </div>
        
        <h3 style="color: #003399; font-weight: normal; border-bottom: 1px solid #cce8ff; padding-bottom: 5px; margin-bottom: 15px; margin-top: 30px;">Devices with Removable Storage (1)</h3>
        
        <div class="drive-item">
          <i class="fa fa-compact-disc drive-icon" style="color: #999;"></i>
          <div class="drive-info">
            <div class="drive-name">DVD RW Drive (D:)</div>
            <div class="drive-text" style="margin-top: 10px;">0 bytes free of 0 bytes</div>
          </div>
        </div>
      </div>
    </div>
  `;
};
