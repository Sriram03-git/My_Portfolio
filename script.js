document.addEventListener('DOMContentLoaded', () => {
    
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // --- 1. Theme Switching (Light/Dark/System Mode) ---
    const themes = ['light-mode', 'dark-mode', 'system-mode'];
    
    // Get saved theme or default to 'system-mode'
    let currentTheme = localStorage.getItem('theme') || 'system-mode';
    body.className = currentTheme;
    
    // Function to apply system preference
    function applySystemTheme() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            body.setAttribute('data-theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
        }
    }

    // Initialize theme
    if (currentTheme === 'system-mode') {
        applySystemTheme();
    }
    updateThemeIcon(currentTheme);

    // Listener for OS preference change (only matters for system-mode)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (body.classList.contains('system-mode')) {
            applySystemTheme();
        }
    });

    themeToggle.addEventListener('click', () => {
        let index = themes.indexOf(currentTheme);
        // Cycle to the next theme (0 -> 1 -> 2 -> 0)
        index = (index + 1) % themes.length; 
        currentTheme = themes[index];

        // Update body class and localStorage
        body.className = currentTheme;
        localStorage.setItem('theme', currentTheme);
        
        // Handle system mode specific logic
        if (currentTheme === 'system-mode') {
            applySystemTheme();
        } else {
            body.removeAttribute('data-theme'); // Remove data attribute if not system mode
        }
        
        updateThemeIcon(currentTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.classList.remove('fa-sun', 'fa-moon', 'fa-desktop');
        
        if (theme === 'dark-mode') {
            icon.classList.add('fa-sun');
            themeToggle.title = "Switch to System Mode";
        } else if (theme === 'light-mode') {
            icon.classList.add('fa-moon');
            themeToggle.title = "Switch to Dark Mode";
        } else { // system-mode
            icon.classList.add('fa-desktop');
            themeToggle.title = "Switch to Light Mode";
        }
    }


    // --- 2. Smooth Scroll for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- 3. Scroll-Triggered Animations (Butter Smooth) ---
    
    // Use Intersection Observer for modern, performant scroll animations
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the section is in view, add the 'visible' class
                entry.target.classList.add('visible');
                // Stop observing this element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1 // Trigger when 10% of the element is visible
    }); 

    // Target all sections except the hero/about section
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
});