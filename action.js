// --- Global Theme Logic with Manual Toggle ---
const root = document.documentElement;
const THEME_STORAGE_KEY = 'user-theme';

// --- Theme Utility Functions ---

/**
 * Applies the 'dark' class to the root element, updates the icon, and saves the preference.
 * @param {boolean} isDark - true for dark theme, false for light theme.
 */
function applyTheme(isDark) {
    // 1. Apply or remove the 'dark' class
    root.classList.toggle('dark', isDark);

    // 2. Update the toggle icon and theme name display
    updateToggleIcon(isDark);
    updateThemeName(isDark);

    // 3. Re-create Lucide Icons to ensure correct colors are applied
    if (typeof lucide !== 'undefined') {
        // Delay this slightly to ensure the class is applied before icons are drawn
        setTimeout(() => {
            lucide.createIcons();
        }, 50);
    }
}

/**
 * Updates the icon (sun/moon) based on the current theme state.
 * @param {boolean} isDark 
 */
function updateToggleIcon(isDark) {
    const iconData = isDark ? 'sun' : 'moon';
    
    // Update Desktop Icon
    const iconElement = document.getElementById('toggle-icon');
    if (iconElement) {
        iconElement.setAttribute('data-lucide', iconData);
    }

    // Update Mobile Icon
    const iconMobileElement = document.getElementById('toggle-icon-mobile');
    if (iconMobileElement) {
        iconMobileElement.setAttribute('data-lucide', iconData);
    }
}

/**
 * Updates the theme name in the footer.
 * @param {boolean} isDark 
 */
function updateThemeName(isDark) {
     const themeName = document.getElementById('current-theme-name');
     if (themeName) {
         // Displaying '(Manual)' to show the user's choice is overriding the system.
         themeName.textContent = isDark ? 'Dark (Manual)' : 'Light (Manual)';
     }
}

/**
 * Checks localStorage or system preference to set the initial theme.
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    let isDark;

    if (savedTheme) {
        // 1. Use saved preference if available
        isDark = savedTheme === 'dark';
    } else {
        // 2. Fall back to system preference
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // Save system preference on first load so we know what to toggle from
        localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
    }

    // Apply the determined theme state
    applyTheme(isDark);
}

/**
 * Toggles the theme state when the button is clicked.
 */
function toggleTheme() {
    // Determine the current state based on the class
    const isCurrentlyDark = root.classList.contains('dark');
    
    // Determine the new state
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    const isNewDark = newTheme === 'dark';

    // Apply the new state
    applyTheme(isNewDark);
    
    // Save the user's manual choice
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
}

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Load the theme based on storage/system
    initializeTheme();

    // 2. Attach toggle event listeners to both buttons
    const toggleButton = document.getElementById('theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', toggleTheme);
    }
    
    const toggleButtonMobile = document.getElementById('theme-toggle-mobile');
    if (toggleButtonMobile) {
        toggleButtonMobile.addEventListener('click', toggleTheme);
    }

    // 3. Mobile Menu Placeholder
    const menuButton = document.getElementById('menu-button');
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            console.log("Mobile menu toggled.");
        });
    }
});
