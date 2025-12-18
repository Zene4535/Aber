// Function to toggle mobile menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const contactForm = document.getElementById('contactForm');
    const feedback = document.getElementById('contactFeedback');
    const langButtons = document.querySelectorAll('.lang-btn');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (feedback) {
                feedback.textContent = '';
                feedback.style.color = '';
            }

            const formData = Object.fromEntries(new FormData(contactForm));

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();
                if (data.ok) {
                    contactForm.reset();
                    if (feedback) {
                        feedback.textContent = 'Message envoyé. Merci de votre confiance !';
                        feedback.style.color = 'green';
                    }
                } else {
                    throw new Error('Validation error');
                }
            } catch (err) {
                if (feedback) {
                    feedback.textContent = 'Impossible d’envoyer le message. Réessayez plus tard.';
                    feedback.style.color = 'red';
                }
            }
        });
    }

    if (langButtons && langButtons.length) {
        langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                langButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
    }
});