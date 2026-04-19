// Boot Sequence
setTimeout(() => {
  document.getElementById('bios-post').classList.add('hidden');
  document.getElementById('win-starting').classList.remove('hidden');
  setTimeout(() => {
    const boot = document.getElementById('boot-screen');
    boot.style.transition = 'opacity 1s';
    boot.style.opacity = '0';
    setTimeout(() => boot.style.display = 'none', 1000);
  }, 4000);
}, 3000);

// Audio setup
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playStartupSound() {
  const startupAudio = new Audio('assets/AUD-20260419-WA0072_');
  startupAudio.volume = 1.0;
  startupAudio.play().catch(err => {
    console.log("Audio play failed, fallback to synth.", err);
    // Fallback simple beep if audio file fails
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    osc.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.5);
  });
}

// Time update
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  const shortDateStr = now.toLocaleDateString();
  
  document.getElementById('login-time').textContent = timeStr;
  document.getElementById('login-date').textContent = dateStr;
  document.getElementById('tray-time').textContent = timeStr;
  document.getElementById('tray-date').textContent = shortDateStr;
}
setInterval(updateTime, 1000);
updateTime();

// Login Logic
let currentUser = 'admin';
function switchUser(user) {
  currentUser = user;
  document.querySelectorAll('.user-pill').forEach(p => p.classList.remove('active'));
  document.getElementById(`pill-${user}`).classList.add('active');
  
  const name = user === 'admin' ? 'Administrator' : 'Guru Prasadh';
  document.getElementById('login-username').textContent = name;
  document.getElementById('login-avatar').src = `https://api.dicebear.com/7.x/bottts/svg?seed=${user}`;
  
  document.querySelector('.sm-avatar').src = `https://api.dicebear.com/7.x/bottts/svg?seed=${user}`;
  document.querySelector('.sm-username').textContent = name;
}

function doLogin() {
  playStartupSound();
  const loginScreen = document.getElementById('login-screen');
  loginScreen.style.transform = 'scale(1.1)';
  loginScreen.style.opacity = '0';
  setTimeout(() => {
    loginScreen.style.display = 'none';
    document.getElementById('desktop').classList.remove('hidden');
  }, 1000);
}

// Window Management
let zIndexCounter = 100;
const windows = {};

function openWindow(appId) {
  if (windows[appId]) {
    // Restore if minimized, else focus
    const win = document.getElementById(`win-${appId}`);
    if (win.style.display === 'none') {
      win.style.display = 'flex';
      updateTaskbarButton(appId, false);
    }
    focusWindow(appId);
    return;
  }
  
  createWindow(appId);
}

function createWindow(appId) {
  const container = document.getElementById('windows-container');
  const win = document.createElement('div');
  win.className = 'win7-window';
  win.id = `win-${appId}`;
  win.style.width = '600px';
  win.style.height = '400px';
  win.style.top = `${50 + Math.random() * 50}px`;
  win.style.left = `${150 + Math.random() * 50}px`;
  
  const titleMap = {
    'resume': 'Resume.pdf - Adobe Reader',
    'projects': 'Projects',
    'contact': 'Contact Me',
    'github': 'GitHub Browser',
    'skills': 'Technical Skills',
    'terminal': 'Command Prompt',
    'computer': 'My Computer',
    'recycle': 'Recycle Bin',
    'ai': 'AI Assistant'
  };
  
  const iconMap = {
    'resume': 'fa-file-pdf', 'projects': 'fa-folder-open', 'contact': 'fa-address-card',
    'github': 'fab fa-github', 'skills': 'fa-code', 'terminal': 'fa-terminal',
    'computer': 'fa-desktop', 'recycle': 'fa-trash', 'ai': 'fa-robot'
  };

  win.innerHTML = `
    <div class="win-titlebar" onmousedown="focusWindow('${appId}')">
      <div class="win-title"><i class="${iconMap[appId] || 'fa-window-maximize'}"></i> ${titleMap[appId] || appId}</div>
      <div class="win-controls">
        <button class="win-btn win-btn-min" onclick="minimizeWindow('${appId}')">_</button>
        <button class="win-btn win-btn-max" onclick="maximizeWindow('${appId}')">□</button>
        <button class="win-btn win-btn-close" onclick="closeWindow('${appId}')">✕</button>
      </div>
    </div>
    <div class="win-content" id="content-${appId}"></div>
  `;
  
  container.appendChild(win);
  
  // Load content from template
  const template = document.getElementById(`tpl-${appId}`);
  if (template) {
    document.getElementById(`content-${appId}`).appendChild(template.content.cloneNode(true));
  }
  
  // Initialize specific app logic
  if (window[`init_${appId}`]) {
    window[`init_${appId}`]();
  }

  makeDraggable(win, win.querySelector('.win-titlebar'));
  
  windows[appId] = { isMaximized: false, prevRect: null };
  addTaskbarButton(appId, titleMap[appId], iconMap[appId]);
  
  // Auto maximize on mobile
  if (window.innerWidth <= 768) {
    maximizeWindow(appId);
  }
  
  focusWindow(appId);
}

function focusWindow(appId) {
  document.querySelectorAll('.win7-window').forEach(w => w.classList.remove('active'));
  document.querySelectorAll('.taskbar-window-btn').forEach(b => b.classList.remove('active'));
  
  const win = document.getElementById(`win-${appId}`);
  if (win) {
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
    win.classList.add('active');
    
    const btn = document.getElementById(`tb-btn-${appId}`);
    if (btn) btn.classList.add('active');
  }
}

function minimizeWindow(appId) {
  document.getElementById(`win-${appId}`).style.display = 'none';
  updateTaskbarButton(appId, true);
}

function maximizeWindow(appId) {
  const win = document.getElementById(`win-${appId}`);
  const state = windows[appId];
  
  if (!state.isMaximized) {
    state.prevRect = { top: win.style.top, left: win.style.left, width: win.style.width, height: win.style.height };
    win.style.top = '0';
    win.style.left = '0';
    win.style.width = '100vw';
    win.style.height = 'calc(100vh - 40px)';
    state.isMaximized = true;
  } else {
    win.style.top = state.prevRect.top;
    win.style.left = state.prevRect.left;
    win.style.width = state.prevRect.width;
    win.style.height = state.prevRect.height;
    state.isMaximized = false;
  }
}

function closeWindow(appId) {
  document.getElementById(`win-${appId}`).remove();
  document.getElementById(`tb-btn-${appId}`).remove();
  delete windows[appId];
}

function minimizeAllWindows() {
  Object.keys(windows).forEach(appId => minimizeWindow(appId));
}

// Taskbar
function addTaskbarButton(appId, title, iconClass) {
  const tb = document.getElementById('taskbar-windows');
  const btn = document.createElement('button');
  btn.className = 'taskbar-window-btn';
  btn.id = `tb-btn-${appId}`;
  btn.innerHTML = `<i class="${iconClass}"></i> ${title}`;
  btn.onclick = () => {
    const win = document.getElementById(`win-${appId}`);
    if (win.style.display === 'none') {
      win.style.display = 'flex';
      focusWindow(appId);
      updateTaskbarButton(appId, false);
    } else if (win.classList.contains('active')) {
      minimizeWindow(appId);
    } else {
      focusWindow(appId);
    }
  };
  tb.appendChild(btn);
}

function updateTaskbarButton(appId, isMinimized) {
  const btn = document.getElementById(`tb-btn-${appId}`);
  if (btn) {
    if (isMinimized) btn.classList.remove('active');
  }
}

// Drag functionality
function makeDraggable(elmnt, header) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  header.onmousedown = dragMouseDown;
  header.addEventListener('touchstart', dragTouchStart, { passive: false });

  function dragMouseDown(e) {
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
    focusWindow(elmnt.id.replace('win-', ''));
  }

  function dragTouchStart(e) {
    const appId = elmnt.id.replace('win-', '');
    if (windows[appId] && windows[appId].isMaximized) return; // Don't drag maximized windows
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    document.addEventListener('touchend', closeDragElement, { once: true });
    document.addEventListener('touchmove', elementDragTouch, { passive: false });
    focusWindow(appId);
  }

  function elementDrag(e) {
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function elementDragTouch(e) {
    e.preventDefault();
    pos1 = pos3 - e.touches[0].clientX;
    pos2 = pos4 - e.touches[0].clientY;
    pos3 = e.touches[0].clientX;
    pos4 = e.touches[0].clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement(e) {
    document.onmouseup = null;
    document.onmousemove = null;
    document.removeEventListener('touchmove', elementDragTouch);
    
    // Aero Snap feature
    let clientY = -1;
    if (e && e.clientY !== undefined) clientY = e.clientY;
    else if (e && e.changedTouches && e.changedTouches.length > 0) clientY = e.changedTouches[0].clientY;

    if (clientY >= 0 && clientY <= 10) {
      const appId = elmnt.id.replace('win-', '');
      const state = windows[appId];
      if (state && !state.isMaximized) maximizeWindow(appId);
    }
  }
}

// Start Menu
function toggleStartMenu() {
  const sm = document.getElementById('start-menu');
  if (sm.classList.contains('hidden')) {
    sm.classList.remove('hidden');
    sm.style.display = 'flex';
  } else {
    sm.classList.add('hidden');
  }
}

document.addEventListener('mousedown', (e) => {
  const sm = document.getElementById('start-menu');
  const startBtn = document.getElementById('start-btn');
  if (!sm.classList.contains('hidden') && !sm.contains(e.target) && !startBtn.contains(e.target)) {
    sm.classList.add('hidden');
  }
  
  const ctx = document.getElementById('context-menu');
  if (!ctx.classList.contains('hidden') && !ctx.contains(e.target)) {
    ctx.classList.add('hidden');
  }
});

// Context Menu
document.getElementById('desktop').addEventListener('contextmenu', (e) => {
  if (e.target.id === 'desktop' || e.target.classList.contains('desktop-icons')) {
    e.preventDefault();
    const ctx = document.getElementById('context-menu');
    ctx.style.top = `${e.clientY}px`;
    ctx.style.left = `${e.clientX}px`;
    ctx.classList.remove('hidden');
  }
});

function ctxAction(action) {
  document.getElementById('context-menu').classList.add('hidden');
  if (action === 'refresh') {
    location.reload();
  }
}

// Links
function openLinkedIn() {
  window.open('https://www.linkedin.com/in/guru-prasad-81ba992ab', '_blank');
}

function shutdownEffect() {
  const dt = document.getElementById('desktop');
  dt.style.transition = 'opacity 2s';
  dt.style.opacity = '0';
  setTimeout(() => {
    location.reload();
  }, 2500);
}

// BSOD Easter Egg
function triggerBSOD() {
  // Play error sound using web audio api
  try {
    const errOsc = audioCtx.createOscillator();
    const errGain = audioCtx.createGain();
    errOsc.type = 'sawtooth';
    errOsc.frequency.setValueAtTime(150, audioCtx.currentTime);
    errOsc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.5);
    errGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    errGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1);
    errOsc.connect(errGain);
    errGain.connect(audioCtx.destination);
    errOsc.start();
    errOsc.stop(audioCtx.currentTime + 1);
  } catch(e){}

  const bsod = document.getElementById('bsod-screen');
  bsod.classList.remove('hidden');
  bsod.style.display = 'block';
  document.documentElement.requestFullscreen().catch(()=>{});
  
  setTimeout(() => {
    location.reload();
  }, 6000);
}
