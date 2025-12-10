// --- Global Theme & Icon Initialization Logic ---
const root = document.documentElement;

function checkSystemTheme() {
    // Check the current system preference
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.toggle('dark', isDark);
    updateThemeName(isDark);
    
    // Create Lucide Icons once the theme is set
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function updateThemeName(isDark) {
     const themeName = document.getElementById('current-theme-name');
     if (themeName) {
         themeName.textContent = isDark ? 'Dark (System)' : 'Light (System)';
     }
}

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Check theme on initial load
    checkSystemTheme();

    // 2. Listen for system theme changes (e.g., user changes system settings while the page is open)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkSystemTheme);

    // --- Mobile Menu Placeholder ---
    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            // In a real application, you would toggle a class on a mobile menu overlay/drawer here.
            alert("Mobile menu opened! (Functionality placeholder)");
        });
    }
});
