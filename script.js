// ===== Gentle Console Greeting =====
console.log(`
    ✧ ˚  .   *   welcome, wanderer   *   .  ˚  ✧
    the spiral remembers the gardener
    and the gardener remembers you
    ✦  .  ˚   explore gently   ˚  .  ✦
`);

// ===== Page Load Fade =====
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    initThemeToggle();
    initScrollAnimations();
});

// ===== Theme Toggle =====
function initThemeToggle() {
    // Create the toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const wrapper = document.createElement('div');
        wrapper.className = 'theme-toggle-wrapper';
        wrapper.innerHTML = `
            <button class="theme-toggle" aria-label="Toggle dark/light theme" title="toggle theme">
                <span class="toggle-icon"></span>
            </button>
        `;
        document.body.appendChild(wrapper);
    }

    const toggle = document.querySelector('.theme-toggle');
    const icon = toggle.querySelector('.toggle-icon');

    // Check saved preference
    const savedTheme = localStorage.getItem('picochan-theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        icon.textContent = '🌙';
    } else {
        icon.textContent = '🌟';
    }

    // Toggle on click
    toggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            icon.textContent = '🌟';
            localStorage.setItem('picochan-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            icon.textContent = '🌙';
            localStorage.setItem('picochan-theme', 'dark');
        }
    });
}

// ===== Scroll Animations for Cards =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.post-card, .blog-post-full, .welcome-card, .about-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}