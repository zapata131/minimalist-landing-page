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

  // Return to Normal Mode redirection
  const exitAction = () => {
    window.location.href = '../index.html';
  };

  document.getElementById('exit-os')?.addEventListener('click', exitAction);

  // Return icon on desktop (Double click to trigger portal)
  const returnIcon = document.getElementById('return-icon');
  returnIcon?.addEventListener('dblclick', exitAction);

  // Single click to select
  returnIcon?.addEventListener('mousedown', (e) => {
    e.stopPropagation();
    icons.forEach(i => i.classList.remove('selected'));
    returnIcon.classList.add('selected');
  });

  // Ensure all links in bio open in new tab
  document.querySelectorAll('.bio .text-link, .bio .social-links a').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });

  // Update dblclick for external icons if they exist
  // (Currently B-Sides and Network open windows, but we can make them open URLs if needed)
  // For now, let's ensure any future external links added through icons open in new tabs.

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

  const terminal = document.getElementById('terminal-window');
  document.getElementById('open-terminal')?.addEventListener('click', () => {
    terminal.style.display = 'flex';
    bringToFront(terminal);
    document.getElementById('terminal-input').focus();
  });

  // Terminal Logic
  const terminalInput = document.getElementById('terminal-input');
  const terminalOutput = document.getElementById('terminal-output');

  terminalInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const cmd = terminalInput.value.trim().toLowerCase();
      terminalInput.value = '';

      const line = document.createElement('p');
      line.innerHTML = `z:\\> ${cmd}`;
      terminalOutput.insertBefore(line, terminalInput.parentElement);

      let response = '';
      if (cmd === 'help') response = 'Available commands: help, whoami, ls, clear, hack, date';
      else if (cmd === 'whoami') response = 'User: Zapata | Permissions: Superuser | Role: Technical Writer';
      else if (cmd === 'ls') response = 'identity.exe  b-sides.log  network.sh  hidden-secrets.txt';
      else if (cmd === 'clear') {
        const pTags = terminalOutput.querySelectorAll('p');
        pTags.forEach(p => p.remove());
        return;
      }
      else if (cmd === 'hack') {
        response = 'Bypassing firewalls... Accessing mainframe... [SUCCESS]';
        line.style.color = '#fff';
      }
      else if (cmd === 'date') response = new Date().toString();
      else if (cmd !== '') response = `Error: '${cmd}' is not recognized as an internal command.`;

      if (response) {
        const resLine = document.createElement('p');
        resLine.innerText = response;
        terminalOutput.insertBefore(resLine, terminalInput.parentElement);
      }
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  });

  // Dice Roller
  document.getElementById('roll-dice')?.addEventListener('click', () => {
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const total = d1 + d2;

    showModal('Rolling dice...');
    const modalBody = document.getElementById('modal-text');
    modalBody.innerHTML = '<div class="dice-animation">🎲 🎲</div>';

    setTimeout(() => {
      modalBody.innerHTML = `You rolled a <strong>${d1}</strong> and a <strong>${d2}</strong>.<br>Total: <strong>${total}</strong>`;
    }, 1000);
  });

  // Pattern Switcher
  const patternControllers = document.querySelectorAll('.pattern-ctrl');
  document.body.classList.add('pattern-dither'); // Default

  patternControllers.forEach(ctrl => {
    ctrl.addEventListener('click', () => {
      document.body.className = ''; // Reset
      document.body.classList.add(`pattern-${ctrl.getAttribute('data-pattern')}`);
    });
  });

  // Trash Icon Logic
  document.getElementById('trash-icon')?.addEventListener('click', () => {
    showModal("Trash is empty. You're a very organized user.");
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
    // Increment even if active to ensure it stays on top of newly opened windows
    highestZIndex++;
    win.style.zIndex = highestZIndex;

    if (win.classList.contains('active')) return;

    windows.forEach(w => {
      w.classList.remove('active');
    });

    win.classList.add('active');
  }
});
