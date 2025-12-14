// *** REPLACE THIS WITH YOUR ACTUAL PROJECT LINK ***
const projectLink = "https://trip-project-0ufy.onrender.com/"; 

document.addEventListener('DOMContentLoaded', function() {
    const viewProjectButton = document.getElementById('viewProjectButton');
    
    viewProjectButton.addEventListener('click', function() {
        // Immediately open the link in a new tab
        window.open(projectLink, '_blank');
        
        // Optionally: You can close this page after the click
        // window.close(); 
    });
});