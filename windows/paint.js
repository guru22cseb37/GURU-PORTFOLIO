window.init_paint = function() {
  const content = document.getElementById('content-paint');
  content.innerHTML = `
    <div class="paint-container">
      <div class="paint-toolbar">
        <div class="paint-tools">
          <button class="paint-tool active" data-tool="pencil" title="Pencil"><i class="fa fa-pencil-alt"></i><span>Pencil</span></button>
          <button class="paint-tool" data-tool="eraser" title="Eraser"><i class="fa fa-eraser"></i><span>Eraser</span></button>
          <button class="paint-tool" id="paint-clear" title="Clear"><i class="fa fa-trash"></i><span>Clear</span></button>
        </div>
        <div class="paint-colors">
          <div class="color-swatch active" style="background: #000000" data-color="#000000"></div>
          <div class="color-swatch" style="background: #ffffff" data-color="#ffffff"></div>
          <div class="color-swatch" style="background: #ff0000" data-color="#ff0000"></div>
          <div class="color-swatch" style="background: #00ff00" data-color="#00ff00"></div>
          <div class="color-swatch" style="background: #0000ff" data-color="#0000ff"></div>
          <div class="color-swatch" style="background: #ffff00" data-color="#ffff00"></div>
          <div class="color-swatch" style="background: #ff00ff" data-color="#ff00ff"></div>
          <div class="color-swatch" style="background: #00ffff" data-color="#00ffff"></div>
        </div>
        <div class="paint-size">
          <label>Size:</label>
          <select id="paint-stroke-size">
            <option value="2">2px</option>
            <option value="5" selected>5px</option>
            <option value="10">10px</option>
            <option value="20">20px</option>
          </select>
        </div>
      </div>
      <canvas id="paint-canvas"></canvas>
    </div>
  `;

  const canvas = document.getElementById('paint-canvas');
  const ctx = canvas.getContext('2d');
  const container = content.querySelector('.paint-container');
  
  // Resize canvas to fit container
  function resizeCanvas() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight - 60; // Subtract toolbar height
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }
  
  setTimeout(resizeCanvas, 100);
  
  let drawing = false;
  let currentTool = 'pencil';
  let currentColor = '#000000';
  let currentSize = 5;

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);
  
  // Touch support
  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, {passive: false});
  
  canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  }, {passive: false});

  function startDrawing(e) {
    drawing = true;
    draw(e);
  }

  function draw(e) {
    if (!drawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = currentSize;
    ctx.strokeStyle = currentTool === 'eraser' ? '#ffffff' : currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  function stopDrawing() {
    drawing = false;
    ctx.beginPath();
  }

  // Toolbar actions
  content.querySelectorAll('.paint-tool').forEach(btn => {
    btn.onclick = () => {
      if (btn.id === 'paint-clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      content.querySelectorAll('.paint-tool').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTool = btn.dataset.tool;
    };
  });

  content.querySelectorAll('.color-swatch').forEach(swatch => {
    swatch.onclick = () => {
      content.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      currentColor = swatch.dataset.color;
    };
  });

  document.getElementById('paint-stroke-size').onchange = (e) => {
    currentSize = parseInt(e.target.value);
  };
};
