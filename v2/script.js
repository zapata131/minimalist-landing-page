const toggleButton = document.getElementById('theme-toggle');
const body = document.body;
const icon = toggleButton.querySelector('i');

// Check for saved user preference, if any, on load of the website
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Default to dark if no preference or if system prefers dark
if (savedTheme === 'light') {
    enableLightMode();
} else {
    enableDarkMode();
}

toggleButton.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        enableDarkMode();
        localStorage.setItem('theme', 'dark');
    } else {
        enableLightMode();
        localStorage.setItem('theme', 'light');
    }
});

function enableLightMode() {
    body.classList.add('light-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

function enableDarkMode() {
    body.classList.remove('light-mode');
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
}
