// Smooth scroll behavior for CTA buttons
document.addEventListener('DOMContentLoaded', function () {
    // Add fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all feature cards and sections
    const animatedElements = document.querySelectorAll('.feature-card, .social-proof, .contact-form-section, .final-cta');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form submission handler
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = contactForm.querySelector('.form-submit-btn');

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get form data
        const formData = {
            businessName: document.getElementById('businessName').value.trim(),
            yourName: document.getElementById('yourName').value.trim(),
            email: document.getElementById('email').value.trim(),
            phoneNumber: document.getElementById('phoneNumber').value.trim(),
            websiteUrl: document.getElementById('websiteUrl').value.trim()
        };

        // Basic validation
        if (!formData.businessName || !formData.yourName || !formData.email || !formData.phoneNumber) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        formMessage.style.display = 'none';

        try {
            // Submit form to serverless function
            const response = await fetch('/api/submit-lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Success!
                showMessage('Thank you! We\'ll be in touch within 24 hours.', 'success');
                contactForm.reset();

                // Optional: Track conversion (Google Analytics, etc.)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        'event_category': 'engagement',
                        'event_label': 'contact_form'
                    });
                }
            } else {
                // Server returned an error
                showMessage(data.error || 'Something went wrong. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Unable to submit form. Please email us directly at info@216launch.com', 'error');
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });

    // Helper function to show messages
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }

    // Scroll to form when "See What's Possible" is clicked
    const heroCtaBtn = document.querySelector('.hero .cta-button');
    if (heroCtaBtn) {
        heroCtaBtn.addEventListener('click', function () {
            const formSection = document.querySelector('.contact-form-section');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }

    // Scroll to form when "Book a Demo" is clicked
    const finalCtaBtn = document.querySelector('.final-cta .cta-button');
    if (finalCtaBtn) {
        finalCtaBtn.addEventListener('click', function () {
            const formSection = document.querySelector('.contact-form-section');
            if (formSection) {
                formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    }
});
