
// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    
    const icon = document.getElementById('theme-icon');
    icon.textContent = newTheme === 'light' ? '🌙' : '☀️';
    
    localStorage.setItem('theme', newTheme);
    
    showToast('success', 'Thème changé', `Mode ${newTheme === 'light' ? 'clair' : 'sombre'} activé`);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);
document.getElementById('theme-icon').textContent = savedTheme === 'light' ? '🌙' : '☀️';

// Toast Notification System
let toastTimeout;

function showToast(type, title, message) {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = toast.querySelector('.toast-icon');

    if (toastTimeout) {
        clearTimeout(toastTimeout);
    }

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ'
    };
    toastIcon.textContent = icons[type] || icons.info;

    toast.classList.remove('success', 'error', 'info');
    toast.classList.add(type);
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
        hideToast();
    }, 4000);
}

function hideToast() {
    const toast = document.getElementById('toast');
    toast.classList.remove('show');
}

// Projects Filter
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    cards.forEach(card => {
        if (category === 'all') {
            card.classList.add('show');
        } else {
            if (card.classList.contains(category)) {
                card.classList.add('show');
            } else {
                card.classList.remove('show');
            }
        }
    });
    
    showToast('info', 'Filtrage', `Affichage: ${category === 'all' ? 'Tous les projets' : category.toUpperCase()}`);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// document.addEventListener('DOMContentLoaded', () => {
//     const fadeElements = document.querySelectorAll('.fade-in');
//     fadeElements.forEach(el => observer.observe(el));

//     setTimeout(() => {
//         showToast('success', 'Bienvenue !', '39 projets à découvrir - Expert .NET, Java & DevOps');
//     }, 1000);
// });

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
