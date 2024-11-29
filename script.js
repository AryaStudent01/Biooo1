// Biography Page Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Interactive sections
    const sections = document.querySelectorAll('.biography section');
    
    // Section fade-in animation
    function fadeInSections() {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
                section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                // Trigger reflow
                section.offsetHeight;
                
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // Timeline interaction
    function setupTimelineInteraction() {
        const timelineItems = document.querySelectorAll('.timeline li');
        
        timelineItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.02)';
                this.style.backgroundColor = '#f0f0f0';
                this.style.transition = 'transform 0.3s ease, background-color 0.3s ease';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '#f9f9f9';
            });
        });
    }

    // Age calculator (if birth date is provided)
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    // Dynamic age display
    function updateAgeDisplay() {
        const birthDateElement = document.getElementById('birth-date');
        const ageElement = document.getElementById('current-age');
        
        if (birthDateElement && ageElement) {
            const birthDate = birthDateElement.getAttribute('data-birth-date');
            const age = calculateAge(birthDate);
            ageElement.textContent = age;
        }
    }

    // Modal for additional biography details
    function setupDetailsModal() {
        const modalTriggers = document.querySelectorAll('.modal-trigger');
        const modal = document.getElementById('biography-modal');
        const modalClose = document.querySelector('.modal-close');
        
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const content = trigger.getAttribute('data-modal-content');
                const modalContent = document.querySelector('.modal-content');
                modalContent.innerHTML = content;
                modal.style.display = 'block';
            });
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
        
        // Close modal if clicked outside
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Print biography functionality
    function setupPrintBiography() {
        const printButton = document.getElementById('print-biography');
        
        if (printButton) {
            printButton.addEventListener('click', () => {
                window.print();
            });
        }
    }

    // Theme toggle
    function setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const biography = document.querySelector('.biography');
        
        if (themeToggle && biography) {
            themeToggle.addEventListener('click', () => {
                biography.classList.toggle('dark-mode');
                
                // Toggle icon or text
                themeToggle.textContent = biography.classList.contains('dark-mode') 
                    ? '🌞 Light Mode' 
                    : '🌙 Dark Mode';
            });
        }
    }

    // Initialize all functions
    function init() {
        fadeInSections();
        setupTimelineInteraction();
        updateAgeDisplay();
        setupDetailsModal();
        setupPrintBiography();
        setupThemeToggle();
    }

    // Run initialization
    init();
});

// Error handling and logging
window.addEventListener('error', (event) => {
    console.error('An error occurred:', event.error);
});