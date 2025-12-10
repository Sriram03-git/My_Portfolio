document.addEventListener('DOMContentLoaded', () => {

    // --- 1. THEME TOGGLE LOGIC (Dark/Light Mode) ---
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const toggleIcon = document.getElementById('toggle-icon');
    const toggleIconMobile = document.getElementById('toggle-icon-mobile');

    /**
     * Toggles the theme between 'light' and 'dark'.
     * @param {string} theme - The theme to set ('light' or 'dark').
     */
    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            if (toggleIcon) toggleIcon.dataset.lucide = 'sun';
            if (toggleIconMobile) toggleIconMobile.dataset.lucide = 'sun';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            if (toggleIcon) toggleIcon.dataset.lucide = 'moon';
            if (toggleIconMobile) toggleIconMobile.dataset.lucide = 'moon';
        }
        // Re-render Lucide icons after changing data-lucide attribute
        lucide.createIcons();
    };

    /** Initializes the theme based on localStorage or OS preference. */
    const initTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // If a theme is stored, use it. Otherwise, use OS preference.
        if (storedTheme) {
            setTheme(storedTheme);
        } else {
            setTheme(prefersDark ? 'dark' : 'light');
        }
    };

    /** Handles the click event for the theme toggle buttons. */
    const handleThemeToggle = () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    // Attach event listeners
    if (themeToggle) themeToggle.addEventListener('click', handleThemeToggle);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', handleThemeToggle);

    // Initialize the theme on page load
    initTheme();


    // --- 2. MOBILE MENU LOGIC ---

    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

    /** Toggles the mobile menu visibility. */
    const toggleMobileMenu = () => {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    };

    if (menuButton) {
        menuButton.addEventListener('click', toggleMobileMenu);
    }
    
    // Close mobile menu when a link is clicked (for navigation)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });


    // --- 3. BUTTER SMOOTH ANIMATION FOR HERO SECTION ---
    
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        // Use a small delay for a cleaner effect after the page has started rendering
        setTimeout(() => {
            // Remove the initial hidden/off-screen classes
            heroContent.classList.remove('opacity-0', 'translate-y-8');
        }, 100); 
    }
    
    
    // --- 4. SCROLL ANIMATIONS (Intersection Observer) ---

    // Function to apply animation when element comes into view
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove the 'fade-out' class and add 'fade-in' class (defined in styles.css)
                entry.target.classList.add('animate-fadeInUp'); 
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of element must be visible
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Apply the initial 'fade-out' class to sections we want to animate
    document.querySelectorAll('#about, #skills, #projects, #contact, #education').forEach(section => {
        // Only apply if section is not the hero
        if (section.id !== 'hero') {
            section.classList.add('fade-out'); // Adds opacity: 0 and initial transform
            observer.observe(section);
        }
    });

    // --- 5. INITIAL ICON RENDERING ---
    // Ensure Lucide icons are correctly rendered on load
    lucide.createIcons();
});
