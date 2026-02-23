document.addEventListener('DOMContentLoaded', () => {
  const icons = document.querySelectorAll('.icon');
  const windows = document.querySelectorAll('.window');
  let highestZIndex = 100;

  // Set the default z-indexing and positions for better readability
  const bio = document.getElementById('bio-window');
  const projects = document.getElementById('projects-window');
  const socials = document.getElementById('socials-window');

  // Stagger positions: top-left, center, bottom-right-ish
  if (bio) {
    bio.style.top = '60px';
    bio.style.left = '40px';
    bringToFront(bio);
  }
  if (projects) {
    projects.style.top = '140px';
    projects.style.left = '420px';
    bringToFront(projects);
  }
  if (socials) {
    socials.style.top = '440px';
    socials.style.left = '100px';
    bringToFront(socials);
  }

  // Menu Bar Interactivity
  const menuItems = document.querySelectorAll('.menubar-item');
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = item.classList.contains('open');
      menuItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  document.addEventListener('click', () => {
    menuItems.forEach(i => i.classList.remove('open'));
  });

  // Modal logic
  const modal = document.getElementById('system-modal');
  const modalText = document.getElementById('modal-text');
  const modalBtn = document.getElementById('modal-ok');

  function showModal(text) {
    modalText.innerText = text;
    modal.style.display = 'flex';
  }

  modalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Menu Item Actions
  document.getElementById('about-os').addEventListener('click', () => {
    showModal('ZapataOS Kernel v1.0.4\n[Network Architecture Edition]\n\nLoaded: identity.exe, b-sides.log, network.sh\nStatus: STABLE');
  });

  document.getElementById('reboot-os').addEventListener('click', () => {
    showModal('System signal: SIGREBOOT\nEntering maintenance mode...');
    setTimeout(() => location.reload(), 2000);
  });

  // App shortcuts in menu
  document.getElementById('open-id')?.addEventListener('click', () => {
    bio.style.display = 'flex';
    bringToFront(bio);
  });
  document.getElementById('open-bsides')?.addEventListener('click', () => {
    projects.style.display = 'flex';
    bringToFront(projects);
  });
  document.getElementById('open-network')?.addEventListener('click', () => {
    socials.style.display = 'flex';
    bringToFront(socials);
  });

  // Clock Update
  function updateClock() {
    const clock = document.getElementById('system-clock');
    if (!clock) return;
    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
  setInterval(updateClock, 1000);
  updateClock();

  // Icon clicking logic
  icons.forEach(icon => {
    // Single click selects
    icon.addEventListener('mousedown', (e) => {
      e.stopPropagation(); // Prevents desktop from un-selecting immediately
      icons.forEach(i => i.classList.remove('selected'));
      icon.classList.add('selected');
    });

    // Double click opens
    icon.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      const windowId = icon.getAttribute('data-window');
      const win = document.getElementById(windowId);
      if (win) {
        win.style.display = 'flex';
        bringToFront(win);
      }
    });
  });

  // Deselect icons when clicking on desktop
  document.getElementById('desktop').addEventListener('mousedown', (e) => {
    if (e.target.id === 'desktop') {
      icons.forEach(i => i.classList.remove('selected'));
    }
  });

  // Window interaction logic
  windows.forEach(win => {
    // Bring to front on any click inside window
    win.addEventListener('mousedown', () => {
      bringToFront(win);
    });

    // Close button
    const closeBtn = win.querySelector('.close-btn');
    closeBtn.addEventListener('mousedown', (e) => {
      e.stopPropagation(); // Avoid dragging
      win.style.display = 'none';
      win.classList.remove('active');
    });

    // Make window draggable
    const titleBar = win.querySelector('.title-bar');
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    titleBar.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('close-btn')) return;
      isDragging = true;
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      bringToFront(win);

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
      if (!isDragging) return;
      // Also ensuring windows do not go beyond the top menu bar (24px)
      let currentTop = e.clientY - offsetY;
      if (currentTop < 24) currentTop = 24;

      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top = `${currentTop}px`;
    }

    function onMouseUp() {
      if (isDragging) {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
  });

  function bringToFront(win) {
    if (win.classList.contains('active')) return;

    windows.forEach(w => {
      w.classList.remove('active');
    });

    highestZIndex++;
    win.style.zIndex = highestZIndex;
    win.classList.add('active');
  }
});
