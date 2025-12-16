function launchOverlay() {
  const container = document.createElement("div");
  container.style = "position:fixed;top:0;left:0;width:100vw;height:100vh;background:#111;color:#0f0;z-index:9999;font-family:monospace;padding:20px;overflow:auto";
  container.innerHTML = `
    <h2>🖼️ QR Overlay Designer</h2>
    <p>Select a background image from <code>/images</code>:</p>
    <input type="file" id="imgPicker" accept="image/*"><br>
    <canvas id="overlayCanvas" width="900" height="500" style="background:#222;margin-top:10px;border:1px dashed #0f0;cursor:default"></canvas><br>
    <button id="saveBtn">💾 Save Wallet</button>
    <button id="closeBtn">❌ Close</button>
  `;
  document.body.appendChild(container);

  const canvas = container.querySelector("#overlayCanvas");
  const ctx = canvas.getContext("2d");

  let backgroundImage = null;
  const qrElements = [
    { label: "Public Key",  x: 50,  y: 50,  size: 120, img: null },
    { label: "Private Key", x: 200, y: 50,  size: 120, img: null }
  ];

  // Generate QR images once at startup
  function regenerateQRs() {
    qrElements.forEach(el => {
      const selector = el.label === "Public Key" ? "publicKey" : "privateKey";
      const text = document.getElementById(selector).value;
      const tmp = document.createElement("div");
      tmp.style.display = "none";
      document.body.appendChild(tmp);
      new QRCode(tmp, { text, width: el.size, height: el.size });
      el.img = tmp.querySelector("img") || tmp.querySelector("canvas");
      document.body.removeChild(tmp);
    });
  }
  regenerateQRs();

  // Draw overlay (background + QR codes)
  function drawOverlay() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (backgroundImage) ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "12px monospace";
    qrElements.forEach(el => {
      if (el.img) {
        ctx.drawImage(el.img, el.x, el.y, el.size, el.size);
      }
      ctx.fillStyle = "#0f0";
      ctx.fillText(el.label, el.x, el.y - 5);
    });
  }
  drawOverlay();

  // Drag / Resize state
  let dragType = null, dragEl = null, startX = 0, startY = 0, startSize = 0;

  canvas.addEventListener("mousedown", e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    dragEl = qrElements.find(el => mx >= el.x && mx <= el.x + el.size && my >= el.y && my <= el.y + el.size);
    if (!dragEl) return;
    startX = mx; startY = my; startSize = dragEl.size;
    // corner region for resize
    if (mx >= dragEl.x + dragEl.size - 10 && my >= dragEl.y + dragEl.size - 10) {
      dragType = 'resize';
    } else {
      dragType = 'move';
    }
  });

  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    // update cursor
    const hoverEl = qrElements.find(el => mx >= el.x && mx <= el.x + el.size && my >= el.y && my <= el.y + el.size);
    canvas.style.cursor = hoverEl
      ? (mx >= hoverEl.x + hoverEl.size - 10 && my >= hoverEl.y + hoverEl.size - 10 ? 'nwse-resize' : 'move')
      : 'default';

    if (!dragType || !dragEl) return;
    if (dragType === 'move') {
      dragEl.x += mx - startX;
      dragEl.y += my - startY;
      startX = mx; startY = my;
    } else if (dragType === 'resize') {
      // update size only; image scales in drawOverlay
      const newSize = Math.max(20, startSize + (mx - startX));
      dragEl.size = newSize;
      startSize = newSize;
      startX = mx;
    }
    drawOverlay();
  });
  canvas.addEventListener("mouseup", () => { dragType = null; dragEl = null; });
  canvas.addEventListener("mouseleave", () => { dragType = null; dragEl = null; });

  // Background image picker
  container.querySelector("#imgPicker").addEventListener("change", e => {
    const file = e.target.files[0];
    const img = new Image();
    img.onload = () => { backgroundImage = img; drawOverlay(); };
    img.src = URL.createObjectURL(file);
  });

  // Save & Close handlers
  container.querySelector("#saveBtn").addEventListener("click", () => saveComposite());
  container.querySelector("#closeBtn").addEventListener("click", () => document.body.removeChild(container));

  window.saveComposite = function() {
    const outCanvas = document.createElement("canvas");
    outCanvas.width = canvas.width; outCanvas.height = canvas.height;
    const outCtx = outCanvas.getContext("2d");
    if (backgroundImage) outCtx.drawImage(backgroundImage, 0, 0, outCanvas.width, outCanvas.height);
    qrElements.forEach(el => {
      outCtx.drawImage(el.img, el.x, el.y, el.size, el.size);
      outCtx.fillStyle = "#0f0";
      outCtx.font = "12px monospace";
      const text = document.getElementById(el.label === "Public Key" ? "publicKey" : "privateKey").value;
      outCtx.fillText(text, el.x, el.y + el.size + 20);
    });
    const link = document.createElement("a");
    link.download = "wallet.png";
    link.href = outCanvas.toDataURL();
    link.click();
  };
}
mo