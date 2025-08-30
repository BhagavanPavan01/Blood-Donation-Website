// Simple animations and interactivity
        document.addEventListener('DOMContentLoaded', function() {
            // Tab switching functionality
            const tabButtons = document.querySelectorAll('.tab-btn');
            const formTitle = document.querySelector('#registration-form button');
            
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    // Update form title based on selected tab
                    if (this.textContent === 'Hospital') {
                        formTitle.textContent = 'Register as Hospital';
                    } else if (this.textContent === 'Patient') {
                        formTitle.textContent = 'Register as Patient';
                    } else {
                        formTitle.textContent = 'Register as Donor';
                    }
                });
            });
            
            // Animate elements on scroll
            const animateOnScroll = function() {
                const elements = document.querySelectorAll('.feature-card, .blood-type');
                
                elements.forEach(element => {
                    const position = element.getBoundingClientRect();
                    
                    // If element is in viewport
                    if(position.top < window.innerHeight && position.bottom >= 0) {
                        element.style.opacity = 1;
                        element.style.transform = 'translateY(0)';
                    }
                });
            };
            
            // Initially set elements to be transparent
            document.querySelectorAll('.feature-card, .blood-type').forEach(element => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            // Check on scroll and load
            window.addEventListener('scroll', animateOnScroll);
            window.addEventListener('load', animateOnScroll);
            
            // Form submission
            document.getElementById('registration-form').addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for registering! We will contact you soon.');
                this.reset();
            });
        });