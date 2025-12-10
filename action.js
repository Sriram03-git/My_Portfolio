// --- Global Theme Logic with Manual Toggle ---
const root = document.documentElement;
const THEME_STORAGE_KEY = 'user-theme';

function applyTheme(isDark) {
    root.classList.toggle('dark', isDark);
    updateToggleIcon(isDark);
    updateThemeName(isDark);
    // Re-create Lucide Icons to ensure correct colors are applied (if needed)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function updateToggleIcon(isDark) {
    // Desktop Icon
    const iconElement = document.getElementById('toggle-icon');
    if (iconElement) {
        iconElement.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    }
    // Mobile Icon
    const iconMobileElement = document.getElementById('toggle-icon-mobile');
    if (iconMobileElement) {
        iconMobileElement.setAttribute('data-lucide', isDark ? 'sun' : 'moon');
    }
}

function updateThemeName(isDark) {
     const themeName = document.getElementById('current-theme-name');
     if (themeName) {
         themeName.textContent = isDark ? 'Dark (Manual)' : 'Light (Manual)';
     }
}

function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    let isDark = false;

    if (savedTheme) {
        // 1. Use saved preference if available
        isDark = savedTheme === 'dark';
    } else {
        // 2. Fall back to system preference
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // Optionally save system preference on first load:
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    }

    applyTheme(isDark);
}

function toggleTheme() {
    // 1. Determine the current state based on the class
    const isCurrentlyDark = root.classList.contains('dark');
    
    // 2. Determine the new state
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    const isNewDark = newTheme === 'dark';

    // 3. Apply the new state
    applyTheme(isNewDark);
    
    // 4. Save the user's manual choice
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
}

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Load the theme based on storage/system
    initializeTheme();

    // 2. Attach toggle event listeners
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }
    
    const toggleButtonMobile = document.getElementById('theme-toggle-mobile');
    if (toggleButtonMobile) {
        toggleButtonMobile.addEventListener('click', toggleTheme);
    }

    // --- Mobile Menu Placeholder ---
    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            alert("Mobile menu opened! (Functionality placeholder)");
        });
    }
});
